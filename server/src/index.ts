//
// index.ts
// HTML and WebSocket server entry point
//

import express, { Express, Request, Response } from "express";
import {
    HTTPResponseFetchTableRows,
    HTTPResponseError,
    WSMessage,
    DB_TABLES_WITH_ADMIN_ACCESS,
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
    DB_TABLE_NAMES,
    DB_TABLE_ROW_ZOBJECTS,
    DBRow,
    DBTableName,
} from "./dbTypes";

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

//

const resErrorMessage = (
    res: Response,
    statusCode: number,
    errorMessage: string
) => {
    const errorResponse: HTTPResponseError = {
        message: errorMessage,
    };
    res.status(statusCode).json(errorResponse);
};

const resError = (res: Response, statusCode: number, error: Error) => {
    resErrorMessage(res, statusCode, `[${error.name}]: ${error.message}`);
};

const resVerifyTableName = (res: Response, tableName: string): boolean => {
    const admin: boolean = true;
    if (!DB_TABLE_NAMES.includes(tableName as DBTableName)) {
        resErrorMessage(res, 401, `Invalid table name "${tableName}"`);
        return false;
    }
    if (tableName in DB_TABLES_WITH_ADMIN_ACCESS && !admin) {
        resErrorMessage(res, 402, `Insufficient permissions for table "${tableName}"`) // prettier-ignore
        return false;
    }
    return true;
};

const resVerifyTableRow = (
    res: Response,
    tableName: DBTableName,
    row: any
): boolean => {
    const ret = DB_TABLE_ROW_ZOBJECTS[tableName].safeParse(row);
    if (!ret.success) resErrorMessage(res, 401, ret.error.message);
    return ret.success;
};

const stringToInteger = (str: string | undefined): number | undefined => {
    if (str === undefined) return undefined;
    const f = parseFloat(str.trim());
    if (Number.isNaN(f)) return undefined;
    if (Number.isInteger(f)) return f;
    return undefined;
};

//
// Fetch rows from index [startIndex: inclusive] to [endIndex: exclusive]
// or all if indices not specificed from the given table
//
app.get(
    "/table/:tableName/:startIndex?/:endIndex?",
    (
        req: Request<{
            tableName: string;
            startIndex?: string;
            endIndex?: string;
        }>,
        res: Response
    ) => {
        // get params
        const tableName: string = req.params.tableName;
        const startIndex: number | undefined = stringToInteger(req.params.startIndex) // prettier-ignore
        const endIndex: number | undefined = stringToInteger(req.params.endIndex); // prettier-ignore
        const admin: boolean = true;

        // verify params
        if (!resVerifyTableName(res, tableName)) {
            return;
        }
        if (typeof startIndex === "number" && startIndex < 0) {
            return resErrorMessage(res, 401, "Start index cannot be negative");
        }
        if (typeof endIndex === "number") {
            if (endIndex < 0) {
                return resErrorMessage(
                    res,
                    401,
                    "End index cannot be negative"
                );
            }
            if (endIndex <= startIndex!) {
                return resErrorMessage(res, 401, 'End index must be higher than start index') // prettier-ignore
            }
        }

        let sqlQuery = `select * from ${tableName}`;
        if (typeof startIndex === "number") sqlQuery += " limit " + startIndex;
        if (typeof endIndex === "number") sqlQuery += ", " + (endIndex - startIndex!); // prettier-ignore

        console.log(`[GET /table/${tableName}]`);

        db.all(sqlQuery, (error, rows) => {
            if (error) {
                return resError(res, 500, error);
            }
            db.get<{ "count(*)": number }>(
                `select count(*) from ${tableName}`,
                (error, row) => {
                    if (error) {
                        return resError(res, 500, error);
                    }
                    const totalCount = row["count(*)"];
                    const response: HTTPResponseFetchTableRows<any> = {
                        totalCount,
                        rows,
                    };
                    res.status(200).json(response);
                }
            );
        });
    }
);

//
// Insert a new row into the specified table
//
app.post(
    "/table/:tableName",
    (req: Request<{ tableName: string }>, res: Response) => {
        // verify params
        if (!resVerifyTableName(res, req.params.tableName)) {
            return;
        }
        const tableName = req.params.tableName as DBTableName;

        // verify body
        if (!resVerifyTableRow(res, tableName, req.body)) {
            return;
        }
        const row: DBRow = req.body;

        console.log(`[POST /table/${tableName}] ${row}`);

        // TODO: continue ...

        let keys = "id";
        let values = "null";
        const params: any[] = [];
        for (const key in req.body) {
            if (key !== "id" && key[0] !== "_") {
                keys += `, \`${key}\``;
                values += ", ?";
                params.push(req.body[key]);
            }
        }

        db.run(
            `insert into ${tableName}(${keys}) values(${values})`,
            params,
            (err) => {
                if (err) throw err;
                db.get<{ "last_insert_rowid()": number }>(
                    "select last_insert_rowid()",
                    (err, row) => {
                        if (err) throw err;
                        const insert_id = row["last_insert_rowid()"];
                        wsBroadcastMessage({
                            type: "entry added",
                            entry: { ...req.body, id: insert_id },
                            endpoint: tableName,
                        });
                    }
                );
            }
        );
    }
);

app.delete("/table/:table/:id", (req: Request, res: Response) => {
    const table = req.params.table;
    const entryID = Number(req.params.id);

    db.run(`delete from ${table} where id = ?`, [entryID]);

    wsBroadcastMessage({
        type: "entry deleted",
        entry: {
            id: entryID,
            nazwa: "",
            adres: "",
        },
        endpoint: table,
    });
});

app.put("/table/:table", (req: Request, res: Response) => {
    const table = req.params.table;

    let query = `update ${table} set `;
    const params = [];
    for (const key in req.body) {
        if (key != "id" && key[0] !== "_") {
            if (params.length > 0) query += ", ";
            query += `\`${key}\`=?`;
            params.push(req.body[key]);
        }
    }
    query += "where id=?";
    params.push(req.body.id);

    db.run(query, params);

    wsBroadcastMessage({
        type: "entry updated",
        entry: req.body,
        endpoint: table,
    });
});

app.listen(HTTP_SERVER_PORT, () => {
    console.log(`Server is running at ${HTTP_SERVER_URL}`);
});
