import { Request, Response, Router } from "express";
import { z, ZodDiscriminatedUnionOption } from "zod";
import { DB } from "../../../db";
import {
    resError,
    resErrorMessage,
    resGetAuthEmployee,
    resVerifyTableName,
} from "../../common";
import { stringToInteger } from "../../../util";
import { db } from "../../..";
import { HTTP } from "../..";

export const FILTER_OPERATORS = [
    "=",
    ">",
    ">=",
    "<",
    "<=",
    "<>",
    "like",
] as const;
export type FilterOperator = (typeof FILTER_OPERATORS)[number];

const createFiltersShape = (tableName: DB.TableName) => {
    const meta = DB.Rows.getMeta(tableName);

    const [firstKey, ...otherKeys] =
        "rowKeys" in meta
            ? meta.keys.filter((key) => !meta.rowKeys.includes(key))
            : meta.keys;

    let rowOptions: ZodDiscriminatedUnionOption<"key">[] = [];
    if ("rowKeys" in meta && "keyTableNames" in meta) {
        rowOptions = meta.rowKeys.map(
            (rowKey): ZodDiscriminatedUnionOption<"key"> =>
                z.strictObject({
                    key: z.literal(rowKey),
                    filters: createFiltersShape(meta.keyTableNames![rowKey]!),
                })
        );
    }

    return z.array(
        z.discriminatedUnion("key", [
            z.strictObject({
                key: z.enum([firstKey!, ...otherKeys]),
                operator: z.enum(FILTER_OPERATORS),
                value: z.string(),
            }),
            ...rowOptions,
        ])
    );
};

const createRequestBodyShape = (tableName: DB.TableName) =>
    z
        .object({
            filters: createFiltersShape(tableName).optional(),
        })
        .optional();

export type RequestBody = z.infer<ReturnType<typeof createRequestBodyShape>>;

// example "id" ">=" "10"
export type Filter = NonNullable<NonNullable<RequestBody>["filters"]>[number];

const router = Router();

//
// Fetch rows from index [startIndex: inclusive] to [endIndex: exclusive]
// or all if indices not specificed from the given table
//
// TODO: select registers.* from registers inner join investors on registers.app_investor_id = investors.id where investors.name like '%Stec%';
//
router.post(
    "/table_rows/get/:tableName/:startIndex?/:endIndex?",
    async (
        req: Request<{
            tableName: string;
            startIndex?: string;
            endIndex?: string;
        }>,
        res: Response
    ) => {
        const { employee } = await resGetAuthEmployee(req, res, true).catch();
        const isEmployeeAdmin = Boolean(employee?.admin);

        // get params
        const startIndex: number | undefined = stringToInteger(req.params.startIndex) // prettier-ignore
        const endIndex: number | undefined = stringToInteger(req.params.endIndex); // prettier-ignore

        // verify params
        const tableName = resVerifyTableName(
            "fetch",
            res,
            req.params.tableName,
            isEmployeeAdmin
        );
        if (!tableName) {
            return;
        }
        //
        if (typeof startIndex === "number") {
            if (startIndex < 0) {
                resErrorMessage(res, 400, "Start index cannot be negative");
                return;
            }
            if (endIndex === undefined) {
                resErrorMessage(res, 400, "End index must be specified");
                return;
            }
            if (endIndex < 0) {
                resErrorMessage(res, 400, "End index cannot be negative");
                return;
            }
            if (endIndex <= startIndex) {
                resErrorMessage(res, 400, 'End index must be higher than start index') // prettier-ignore
                return;
            }
        }

        // verify body
        const ret = createRequestBodyShape(tableName).safeParse(req.body); // prettier-ignore
        if (!ret.success) {
            resErrorMessage(res, 400, ret.error.message);
            return;
        }
        const body = ret.data;

        let sqlQuery = `select ${tableName}.* from ${tableName}`;
        const sqlValues: string[] = [];

        let sqlWhereQuery = "";
        const sqlWhereValues: any[] = [];
        if (body && body.filters) {
            body.filters.forEach((filter, index) => {
                sqlWhereQuery += ` ${index === 0 ? "where" : "and"} `;
                sqlWhereQuery +=
                    tableName + "." + filter.key + " " + filter.operator + " ?";
                sqlValues.push(filter.value);
                sqlWhereValues.push(filter.value);
            });
        }
        sqlQuery += sqlWhereQuery;

        if (typeof startIndex === "number") {
            sqlQuery += " limit " + startIndex + ", " + (endIndex! - startIndex); // prettier-ignore
        }

        console.log(
            `[POST /table_rows/get/${tableName}/${startIndex ?? "-"}/${
                endIndex ?? "-"
            }]\n| Query: "${sqlQuery}"\n| Values: ${sqlValues}`
        );
        console.dir(body, { depth: Infinity });

        db.all<DB.Row>(sqlQuery, sqlValues, (error, rows) => {
            if (error) {
                resError(res, 500, error);
                return;
            }
            db.get<{ "count(*)": number }>(
                `select count(*) from ${tableName}` + sqlWhereQuery,
                sqlWhereValues,
                (error, row) => {
                    if (error) {
                        resError(res, 500, error);
                        return;
                    }

                    rows.forEach((row) => {
                        if (tableName === "employees") {
                            const employeeRow = row as DB.Rows.Employee;
                            employeeRow.has_password =
                                typeof employeeRow.password === "string" &&
                                employeeRow.password.length > 0;
                        }

                        Object.keys(row).forEach((key) => {
                            const meta = DB.Rows.getMeta(tableName);
                            const adminProps: readonly string[] | undefined =
                                "adminProps" in meta
                                    ? meta.adminProps
                                    : undefined;
                            if (
                                adminProps &&
                                adminProps.includes(key) &&
                                !isEmployeeAdmin
                            ) {
                                row[key] = undefined;
                            }
                        });
                    });

                    const totalCount = row["count(*)"];
                    const response: HTTP.Response = {
                        type: "fetch table rows",
                        totalCount,
                        rows,
                    };
                    res.status(200).json(response);
                }
            );
        });
    }
);

export default router;
