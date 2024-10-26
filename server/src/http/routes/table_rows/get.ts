//
// Fetch rows from index [startIndex: inclusive] to [endIndex: exclusive]
// or all if indices not specificed from the given table

import { Request, Response, Router } from "express";

const router = Router();

export type RequestBodyGetTableRows =
    | {
          filters?: DBFilter[];
      }
    | undefined;

export const DB_FILTER_OPERATORS = [
    "=",
    ">",
    ">=",
    "<",
    "<=",
    "<>",
    "like",
] as const;
export type DBFilterOperator = (typeof DB_FILTER_OPERATORS)[number];

export const createRequestBodyGetTableRowsZodObject = (
    zodRowObject: ZodObject<any>
) =>
    z
        .object({
            filters: z
                .array(
                    z.object({
                        key: zodRowObject.keyof(),
                        operator: z.enum(DB_FILTER_OPERATORS),
                        value: z.string(),
                    })
                )
                .optional(),
        })
        .optional();

// Example: "id" ">=" "10"
export type DBFilter<TRow extends DB.Row = DB.Row> = {
    key: keyof TRow;
    operator: DBFilterOperator;
    value: string;
};

//
router.post(
    "/table/:tableName/fetch/:startIndex?/:endIndex?",
    (
        req: Request<{
            tableName: string;
            startIndex?: string;
            endIndex?: string;
        }>,
        res: Response
    ) => {
        getAuthorizedEmployee(req, res, true)
            .then(({ employee }) => {
                const isEmployeeAdmin = Boolean(employee?.admin);

                // get params
                const startIndex: number | undefined = stringToInteger(req.params.startIndex) // prettier-ignore
                const endIndex: number | undefined = stringToInteger(req.params.endIndex); // prettier-ignore

                // verify params
                if (
                    !resVerifyTableName(
                        "GET",
                        res,
                        req.params.tableName,
                        isEmployeeAdmin
                    )
                ) {
                    return;
                }
                const tableName = req.params.tableName as DB.TableName;
                if (typeof startIndex === "number") {
                    if (startIndex < 0) {
                        return resErrorMessage(
                            res,
                            400,
                            "Start index cannot be negative"
                        );
                    }
                    if (endIndex === undefined) {
                        return resErrorMessage(
                            res,
                            400,
                            "End index must be specified"
                        );
                    }
                    if (endIndex < 0) {
                        return resErrorMessage(
                            res,
                            400,
                            "End index cannot be negative"
                        );
                    }
                    if (endIndex <= startIndex) {
                        return resErrorMessage(res, 400, 'End index must be higher than start index') // prettier-ignore
                    }
                }

                // verify body
                const ret = HTTP.createRequestBodyGetTableRowsZodObject(
                    DB.Rows.INFOS[tableName].zod
                ).safeParse(req.body);
                if (!ret.success) {
                    return console.error(ret.error.message);
                    // return resErrorMessage(res, 400, ret.error.message);
                }
                const body: HTTP.RequestBodyGetTableRows = req.body;

                // const sqlKeys: string[] = [
                //     ...DB_TABLE_ROW_INFOS[tableName].zod.keyof().options,
                // ]
                //     .map((key) => "`" + key + "`")
                //     .filter((key) => {
                //         const adminProps = DB_TABLE_ROW_INFOS[tableName].adminProps;
                //         if (
                //             adminProps &&
                //             !isEmployeeAdmin &&
                //             adminProps.includes(key)
                //         )
                //             return false;
                //         return true;
                //     });
                const sqlKeys: string[] = ["*"];
                const sqlValues: string[] = [];

                let sqlQuery = `select ${sqlKeys.join(", ")} from ${tableName}`;

                let sqlWhereQuery = "";
                const sqlWhereValues: string[] = [];
                if (body && body.filters) {
                    body.filters.forEach((filter, index) => {
                        sqlWhereQuery += ` ${index === 0 ? "where" : "and"} `;
                        sqlWhereQuery +=
                            filter.key + " " + filter.operator + " ?";
                        sqlWhereValues.push(filter.value);
                        sqlValues.push(filter.value);
                    });
                }
                sqlQuery += sqlWhereQuery;

                if (typeof startIndex === "number") {
                    sqlQuery += " limit " + startIndex + ", " + (endIndex! - startIndex); // prettier-ignore
                }

                // console.log(`[GET /table/${tableName}] ${sqlQuery}`);

                db.all<DB.Row>(sqlQuery, sqlValues, (error, rows) => {
                    if (error) {
                        return resError(res, 500, error);
                    }
                    db.get<{ "count(*)": number }>(
                        `select count(*) from ${tableName}` + sqlWhereQuery,
                        sqlWhereValues,
                        (error, row) => {
                            if (error) {
                                return resError(res, 500, error);
                            }

                            rows.forEach((row) => {
                                if (tableName === "employees") {
                                    const employeeRow = row as DB.Rows.Employee;
                                    employeeRow.has_password =
                                        typeof employeeRow.password ===
                                            "string" &&
                                        employeeRow.password.length > 0;
                                }

                                Object.keys(row).forEach((key) => {
                                    const adminProps =
                                        DB.Rows.INFOS[tableName].adminProps;
                                    if (
                                        adminProps &&
                                        !isEmployeeAdmin &&
                                        adminProps.includes(key)
                                    ) {
                                        row[key] = undefined;
                                    }
                                });
                            });

                            const totalCount = row["count(*)"];
                            const response: HTTP.Response<any> = {
                                type: "fetch table rows",
                                totalCount,
                                rows,
                            };
                            res.status(200).json(response);
                        }
                    );
                });
            })
            .catch(console.error);
    }
);

export default router;
