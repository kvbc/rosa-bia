import { Request, Response, Router } from "express";
import { z, ZodDiscriminatedUnionOption } from "zod";
import * as DB from "@shared/db";
import {
    resError,
    resErrorMessage,
    resGetAuthEmployee,
    resVerifyTableName,
} from "@http/common";
import { stringToInteger } from "@/util";
import { db } from "@";
import * as HTTP from "@http/types";

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
    const rowMeta = DB.getRowMeta(tableName);
    const keyRelations = rowMeta.keyTableRelations;

    const [firstKey, ...otherKeys] = keyRelations
        ? rowMeta.keys.filter((key) => !Object.keys(keyRelations).includes(key))
        : rowMeta.keys;

    let rowOptions: ZodDiscriminatedUnionOption<"key">[] = [];
    if (keyRelations) {
        rowOptions = Object.keys(keyRelations).map(
            (rowKey): ZodDiscriminatedUnionOption<"key"> =>
                z.strictObject({
                    key: z.literal(rowKey),
                    filters: createFiltersShape(keyRelations[rowKey]!),
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

export type RequestBody =
    | {
          filters?: Filter[];
      }
    | undefined;

// example "id" ">=" "10"
// export type Filter = NonNullable<NonNullable<RequestBody>["filters"]>[number];
export type Filter =
    | {
          key: string;
          operator: FilterOperator;
          value: string;
          filters?: Filter[];
      }
    | {
          key: string;
          filters: Filter[];
      };

const router = Router();

//
// Fetch rows from index [startIndex: inclusive] to [endIndex: exclusive]
// or all if indices not specificed from the given table
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
        const startIndex: number = stringToInteger(req.params.startIndex) ?? 0 // prettier-ignore
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
        if (startIndex < 0) {
            resErrorMessage(res, 400, "Start index cannot be negative");
            return;
        }
        if (typeof endIndex === "number") {
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
        const body = ret.data as RequestBody;

        let sqlQuery = `select ${tableName}.* from ${tableName}`;

        const sqlFilterValues: any[] = [];
        let sqlInnerJoins = "";
        let sqlWhere = "";
        const processFilters = (tableName: DB.TableName, filters: Filter[]) => {
            const rowMeta = DB.getRowMeta(tableName);
            filters.forEach((filter, index) => {
                if (
                    filter.filters &&
                    rowMeta.keyTableRelations &&
                    Object.keys(rowMeta.keyTableRelations).includes(filter.key)
                ) {
                    const subTableName = rowMeta.keyTableRelations[filter.key]!;
                    sqlInnerJoins += ` inner join ${subTableName} on ${tableName}.${filter.key} = ${subTableName}.id`;
                    processFilters(subTableName, filter.filters);
                }
                if ("operator" in filter) {
                    sqlWhere += ` ${sqlWhere.length === 0 ? "where" : "and"} `;
                    sqlWhere += `${tableName}.${filter.key} ${filter.operator} ?`;
                    sqlFilterValues.push(filter.value);
                }
            });
        };
        if (body && body.filters) {
            processFilters(tableName, body.filters);
        }
        const sqlFilterQuery = sqlInnerJoins + sqlWhere;

        sqlQuery += sqlFilterQuery;

        sqlQuery += " limit " + startIndex + ", ";
        if (typeof endIndex === "number") {
            sqlQuery += endIndex - startIndex;
        } else {
            sqlQuery += "-1";
        }

        console.log(
            `[POST /table_rows/get/${tableName}/${startIndex}/${
                endIndex ?? "-"
            }]\n| Query: "${sqlQuery}"\n| Values: ${sqlFilterValues}`
        );
        // console.dir(body, { depth: Infinity });

        db.all<DB.Row>(sqlQuery, sqlFilterValues, (error, rows) => {
            if (error) {
                resError(res, 500, error);
                return;
            }
            db.get<{ "count(*)": number; max_id: number }>(
                `select count(*), max(${tableName}.id) as max_id from ${tableName}` +
                    sqlFilterQuery,
                sqlFilterValues,
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
                            const rowMeta = DB.getRowMeta(tableName);
                            if (
                                rowMeta.adminKeys &&
                                rowMeta.adminKeys.has(key) &&
                                !isEmployeeAdmin
                            ) {
                                row[key] = undefined;
                            }
                        });
                    });

                    const totalCount = row["count(*)"];
                    const topRowID = row["max_id"];
                    const response: HTTP.Response = {
                        type: "fetch table rows",
                        totalCount,
                        rows,
                        topRowID,
                    };
                    res.status(200).json(response);
                }
            );
        });
    }
);

export default router;
