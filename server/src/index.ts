/*
 *
 * TODO: Work on the backend when done with the frontend
 *
 */

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { HTTPFetchResponse, WSSBCMessage, WSSBCMessageType } from "./types";
import { Database } from "sqlite3";
import cors from "cors";
import WebSocket from "ws";

dotenv.config();

/*
 *
 * WebSocket Server
 *
 */

const wss = new WebSocket.Server({ port: Number(process.env.WS_PORT!) });

const wsBroadcast = (message: WSSBCMessage): void => {
    wss.clients.forEach((ws) => ws.send(JSON.stringify(message)));
};

/*
 *
 * HTTP Server
 *
 */

const app: Express = express();
const port = process.env.HTTP_PORT!;
const db = new Database("db/db.db");

app.use(express.json());
app.use(cors());

app.get("/:table/:startIndex-:endIndex", (req: Request, res: Response) => {
    const table: string = req.params.table;
    const startIndex: number = Number(req.params.startIndex);
    const endIndex: number = Number(req.params.endIndex);
    const length = endIndex - startIndex;

    console.log(`GET ${table}`);

    db.all(
        `select * from ${table} limit ?, ?`,
        [startIndex, length],
        (err, results) => {
            if (err) throw err;
            db.get<{ "count(*)": number }>(
                `select count(*) from ${table}`,
                (err, row) => {
                    if (err) throw err;
                    const liczba = row["count(*)"];
                    const odp: HTTPFetchResponse<any> = {
                        liczba,
                        results,
                    };
                    res.json(odp);
                }
            );
        }
    );
});

app.post("/:table", (req: Request, res: Response) => {
    const table = req.params.table;

    let keys = "id";
    let values = "null";
    const params: any[] = [];
    for (const key in req.body) {
        if (key !== "id" && key[0] !== "_") {
            keys += ", " + key;
            values += ", ?";
            params.push(req.body[key]);
        }
    }

    db.run(`insert into ${table}(${keys}) values(${values})`, params, (err) => {
        if (err) throw err;
        db.get<{ "last_insert_rowid()": number }>(
            "select last_insert_rowid()",
            (err, row) => {
                if (err) throw err;
                const insert_id = row["last_insert_rowid()"];
                var bcastMsg: WSSBCMessage = {
                    type: WSSBCMessageType.EntryAdded,
                    entry: { ...req.body, id: insert_id },
                    endpoint: table,
                };
                wsBroadcast(bcastMsg);
            }
        );
    });
});

app.delete("/:table/:id", (req: Request, res: Response) => {
    const table = req.params.table;
    const entryID = Number(req.params.id);

    db.run(`delete from ${table} where id = ?`, [entryID]);

    var bcastMsg: WSSBCMessage = {
        type: WSSBCMessageType.EntryDeleted,
        entry: {
            id: entryID,
            nazwa: "",
            adres: "",
        },
        endpoint: table,
    };
    wsBroadcast(bcastMsg);
});

app.put("/:table", (req: Request, res: Response) => {
    const table = req.params.table;

    let query = `update ${table} set `;
    const params = [];
    for (const key in req.body) {
        if (key != "id" && key[0] !== "_") {
            if (params.length > 0) query += ", ";
            query += `${key}=?`;
            params.push(req.body[key]);
        }
    }
    query += "where id=?";
    params.push(req.body.id);

    db.run(query, params);

    var bcastMsg: WSSBCMessage = {
        type: WSSBCMessageType.EntryUpdated,
        entry: req.body,
        endpoint: table,
    };
    wsBroadcast(bcastMsg);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
