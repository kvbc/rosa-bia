//
// index.ts
// HTML and WebSocket server entry point
//

import express, { Express, Request, Response } from "express";
import {
    HTTPResponse,
    WSMessage,
    DB_ADMIN_MODIFY_TABLES,
    HTTPRequestLogin,
    ZHTTPRequestLogin,
    HTTPRequestBodyGetTableRows,
    createHTTPRequestBodyGetTableRowsZodObject,
} from "./types";
import { Database } from "sqlite3";
import cors from "cors";
import WebSocket from "ws";
import {
    HTTP_SERVER_PORT,
    HTTP_SERVER_URL,
    WS_SERVER_PORT,
} from "../../config";
import {
    DBRows,
    DB_TABLE_NAMES,
    DB_TABLE_ROW_INFOS,
    DBRow,
    DBTableName,
} from "./dbTypes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY: string = process.env.JWT_SECRET!;

/*
 *
 * WebSocket Server
 *
 */

const wss = new WebSocket.Server({ port: WS_SERVER_PORT });

const wsBroadcastMessage = (message: WSMessage): void => {
    wss.clients.forEach((ws) => ws.send(JSON.stringify(message)));
};

/*
 *
 * HTTP Server
 *
 */

const app: Express = express();
const db = new Database("db/db.db");

app.use(express.json());
app.use(cors());

app.listen(HTTP_SERVER_PORT, () => {
    console.log(`Server is running at ${HTTP_SERVER_URL}`);
});

//
// Response
//

const resErrorMessage = (
    res: Response,
    statusCode: number,
    errorMessage: string
) => {
    const errorResponse: HTTPResponse = {
        responseType: "error",
        message: errorMessage,
    };
    console.error(errorMessage);
    res.status(statusCode).json(errorResponse);
};

const resError = (res: Response, statusCode: number, error: any) => {
    if (error instanceof Error) {
        resErrorMessage(res, statusCode, `[${error.name}]: ${error.message}`);
    } else {
        resErrorMessage(res, statusCode, String(error));
    }
};

const resVerifyTableName = (
    method: Request["method"],
    res: Response,
    tableName: string,
    isAdmin: boolean
): boolean => {
    if (!DB_TABLE_NAMES.includes(tableName as DBTableName)) {
        resErrorMessage(res, 400, `Invalid table name "${tableName}"`);
        return false;
    }
    const modifyMethods = ["POST", "PUT", "DELETE"];
    if (
        DB_ADMIN_MODIFY_TABLES.includes(tableName as DBTableName) &&
        !isAdmin &&
        modifyMethods.includes(method)
    ) {
        resErrorMessage(res, 401, `Insufficient permissions for table "${tableName}"`) // prettier-ignore
        return false;
    }
    return true;
};

const resVerifyTableRow = (
    res: Response,
    tableName: DBTableName,
    row: any
): boolean => {
    const ret = DB_TABLE_ROW_INFOS[tableName].zod.safeParse(row);
    if (!ret.success) resErrorMessage(res, 400, ret.error.message);
    return ret.success;
};

const getAuthorizedEmployee = async (
    req: Request,
    res: Response,
    optional?: boolean
): Promise<{ employee?: DBRows.Employee; jwtToken?: string }> => {
    return new Promise((resolve, reject) => {
        const authorization = req.headers["authorization"];
        if (authorization && authorization.startsWith("Bearer ")) {
            const jwtToken = authorization.replace("Bearer ", "");
            try {
                const employeeName = jwt.verify(jwtToken, JWT_SECRET_KEY);
                console.log(">>>", employeeName);
                db.get<DBRows.Employee | undefined>(
                    "select * from employees where name = ?",
                    [employeeName],
                    (error, row) => {
                        if (error) {
                            if (!optional) {
                                resError(res, 500, error);
                            }
                            resolve({ jwtToken });
                            // reject();
                            return;
                        }
                        if (row === undefined) {
                            if (!optional) {
                                resErrorMessage(res, 500, "Employee not found");
                            }
                            resolve({ jwtToken });
                            // reject();
                            return;
                        }
                        resolve({ employee: row, jwtToken });
                    }
                );
                return;
            } catch (error) {
                if (!optional) {
                    resError(res, 401, error);
                }
                resolve({ jwtToken });
                // reject();
                return;
            }
        }
        if (!optional) {
            resError(res, 401, "Authorization required");
            // reject();
        }
        resolve({});
    });
};

//
// Helpers
//

const stringToInteger = (str: string | undefined): number | undefined => {
    if (str === undefined) return undefined;
    const f = parseFloat(str.trim());
    if (Number.isNaN(f)) return undefined;
    if (Number.isInteger(f)) return f;
    return undefined;
};

/*
 *
 * HTTP Server :: Tables
 *
 */

//
// Fetch rows from index [startIndex: inclusive] to [endIndex: exclusive]
// or all if indices not specificed from the given table
//
app.post(
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
                const tableName = req.params.tableName as DBTableName;
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
                const ret = createHTTPRequestBodyGetTableRowsZodObject(
                    DB_TABLE_ROW_INFOS[tableName].zod
                ).safeParse(req.body);
                if (!ret.success) {
                    return console.error(ret.error.message);
                    // return resErrorMessage(res, 400, ret.error.message);
                }
                const body: HTTPRequestBodyGetTableRows = req.body;

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

                db.all<DBRow>(sqlQuery, sqlValues, (error, rows) => {
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
                                    const employeeRow = row as DBRows.Employee;
                                    employeeRow.hasPassword =
                                        typeof employeeRow.password ===
                                            "string" &&
                                        employeeRow.password.length > 0;
                                }

                                Object.keys(row).forEach((key) => {
                                    const adminProps =
                                        DB_TABLE_ROW_INFOS[tableName]
                                            .adminProps;
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
                            const response: HTTPResponse<any> = {
                                responseType: "fetch table rows",
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

//
// Insert a new row into the specified table
//
app.post(
    "/table/:tableName",
    (req: Request<{ tableName: string }>, res: Response) => {
        getAuthorizedEmployee(req, res)
            .then(({ employee }) => {
                if (!employee) {
                    return;
                }

                // verify params
                if (
                    !resVerifyTableName(
                        req.method,
                        res,
                        req.params.tableName,
                        Boolean(employee.admin)
                    )
                ) {
                    return;
                }
                const tableName = req.params.tableName as DBTableName;

                // verify body
                if (!resVerifyTableRow(res, tableName, req.body)) {
                    return;
                }
                const newRow: DBRow = req.body;

                let sqlKeys = "id";
                let sqlValues = "null";
                const sqlParams: any[] = [];
                for (const key in newRow) {
                    if (key !== "id") {
                        sqlKeys += `, \`${key}\``;
                        sqlValues += ", ?";
                        sqlParams.push(newRow[key]);
                    }
                }
                const sqlQuery = `insert into ${tableName}(${sqlKeys}) values(${sqlValues})`;

                console.log(
                    `[POST /table/${tableName}] ${sqlQuery} ${sqlParams}`
                );

                db.run(sqlQuery, sqlParams, (err) => {
                    if (err) {
                        return resError(res, 500, err);
                    }
                    db.get<{ "last_insert_rowid()": number }>(
                        "select last_insert_rowid()",
                        (err, row) => {
                            if (err) {
                                return resError(res, 500, err);
                            }
                            const insertID = row["last_insert_rowid()"];
                            wsBroadcastMessage({
                                type: "table row added",
                                tableRow: { ...newRow, id: insertID },
                                tableName,
                            });
                            res.sendStatus(200);
                        }
                    );
                });
            })
            .catch(console.error);
    }
);

//
// Delete an entry of the specified id from the given table
//
app.delete(
    "/table/:tableName/:entryID",
    (req: Request<{ tableName: string; entryID: string }>, res: Response) => {
        getAuthorizedEmployee(req, res)
            .then(({ employee }) => {
                if (!employee) {
                    return;
                }

                // verify params
                if (
                    !resVerifyTableName(
                        req.method,
                        res,
                        req.params.tableName,
                        Boolean(employee.admin)
                    )
                ) {
                    return;
                }
                const tableName = req.params.tableName as DBTableName;
                const entryID: number | undefined = stringToInteger(req.params.entryID) // prettier-ignore
                if (entryID === undefined) {
                    return resErrorMessage(res, 400, "Invalid entry id");
                } else if (entryID < 0) {
                    return resErrorMessage(
                        res,
                        400,
                        "Start index cannot be negative"
                    );
                }

                const sqlQuery = `delete from ${tableName} where id = ?`;
                const sqlParams = [entryID];

                console.log(
                    `[DELETE /table/${tableName}] ${sqlQuery} ${sqlParams}`
                );

                db.run(sqlQuery, sqlParams, (err) => {
                    if (err) {
                        return resError(res, 500, err);
                    }
                    wsBroadcastMessage({
                        type: "table row deleted",
                        tableRow: { id: entryID },
                        tableName,
                    });
                    res.sendStatus(200);
                });
            })
            .catch(console.error);
    }
);

//
// Update the given entry with a new specified entry
//
app.put(
    "/table/:tableName",
    (req: Request<{ tableName: string }>, res: Response) => {
        getAuthorizedEmployee(req, res)
            .then(({ employee }) => {
                if (!employee) {
                    return;
                }

                // verify params
                if (
                    !resVerifyTableName(
                        req.method,
                        res,
                        req.params.tableName,
                        Boolean(employee.admin)
                    )
                ) {
                    return;
                }
                const tableName = req.params.tableName as DBTableName;

                // verify body
                if (!resVerifyTableRow(res, tableName, req.body)) {
                    return;
                }
                const newRow: DBRow = req.body;

                let sqlQuery = `update ${tableName} set `;
                const sqlParams = [];
                for (const key in newRow) {
                    if (key !== "id") {
                        if (sqlParams.length > 0) sqlQuery += ", ";
                        sqlQuery += `\`${key}\`=?`;
                        sqlParams.push(newRow[key]);
                    }
                }
                sqlQuery += "where id=?";
                sqlParams.push(newRow.id);

                console.log(
                    `[PUT /table/${tableName}] ${sqlParams} ${sqlParams}`
                );

                db.run(sqlQuery, sqlParams, (error) => {
                    if (error) {
                        return resError(res, 500, error);
                    }
                    wsBroadcastMessage({
                        type: "table row updated",
                        tableRow: newRow,
                        tableName,
                    });
                    res.sendStatus(200);
                });
            })
            .catch(console.error);
    }
);

/*
 *
 * HTTP Server :: Login
 *
 */

app.post("/login", (req: Request<HTTPRequestLogin>, res: Response) => {
    getAuthorizedEmployee(req, res, true)
        .then(({ employee, jwtToken }) => {
            const noBody =
                !req.body ||
                (typeof req.body === "object" &&
                    Object.keys(req.body).length === 0);
            if (employee && noBody) {
                const response: HTTPResponse = {
                    responseType: "login",
                    jwtToken: jwtToken!,
                    employee,
                };
                res.status(200).json(response);
                return;
            }

            // verify body
            const ret = ZHTTPRequestLogin.safeParse(req.body);
            if (!ret.success) {
                return console.error(ret.error.message);
                // return resErrorMessage(res, 400, ret.error.message);
            }
            const body = ret.data;

            const sqlQuery =
                "select * from employees where name = ? and password = ?";
            const sqlParams = [body.employeeName, body.employeePassword];

            console.log(`[POST /login] ${sqlQuery} ${sqlParams}`);

            db.get<DBRows.Employee | undefined>(
                sqlQuery,
                sqlParams,
                (error, row) => {
                    if (error) {
                        // return resError(res, 500, error);
                        return console.error(error.message);
                    }
                    if (row === undefined) {
                        return console.error("Invalid username or password");
                        // return resErrorMessage(
                        //     res,
                        //     400,
                        //     "Invalid username or password"
                        // );
                    }
                    const jwtToken = jwt.sign(row.name, JWT_SECRET_KEY);
                    const response: HTTPResponse = {
                        responseType: "login",
                        jwtToken,
                        employee: row,
                    };
                    res.status(200).json(response);
                }
            );
        })
        .catch(console.error);
});
