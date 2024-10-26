import { Request, Response, Router } from "express";
import { z, ZodObject } from "zod";
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

// Example: "id" ">=" "10"
export type Filter<TRow extends DB.Row = DB.Row> = {
    key: keyof TRow;
    operator: FilterOperator;
    value: string;
};

const createRequestBodyZodObject = (zodRowObject: ZodObject<any>) =>
    z
        .object({
            filters: z
                .array(
                    z.object({
                        key: zodRowObject.keyof(),
                        operator: z.enum(FILTER_OPERATORS),
                        value: z.string(),
                    })
                )
                .optional(),
        })
        .optional();

// export type RequestBody = z.infer<
//     ReturnType<typeof createRequestBodyZodObject>
// >;

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
        const ret = createRequestBodyZodObject(DB.Rows.INFOS[tableName].zod).safeParse(req.body); // prettier-ignore
        if (!ret.success) {
            resErrorMessage(res, 400, ret.error.message);
            return;
        }
        const body = ret.data;

        let sqlQuery = `select * from ${tableName}`;
        const sqlValues: string[] = [];

        let sqlWhereQuery = "";
        const sqlWhereValues: any[] = [];
        if (body && body.filters) {
            body.filters.forEach((filter, index) => {
                sqlWhereQuery += ` ${index === 0 ? "where" : "and"} `;
                sqlWhereQuery += filter.key + " " + filter.operator + " ?";
                sqlValues.push(filter.value);
                sqlWhereValues.push(filter.value);
            });
        }
        sqlQuery += sqlWhereQuery;

        if (typeof startIndex === "number") {
            sqlQuery += " limit " + startIndex + ", " + (endIndex! - startIndex); // prettier-ignore
        }

        console.log(
            `[POST /table_rows/get/${tableName}/${startIndex}/${endIndex}]\n| Query: "${sqlQuery}"\n| Values: ${sqlValues}`
        );

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
                            const adminProps =
                                DB.Rows.INFOS[tableName].adminProps;
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
