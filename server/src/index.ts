import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {
    HTTPFetchResponse,
    Inwestor,
    InwestorRequestPost,
    InwestorRequestPut,
    WSSBCMessage,
    WSSBCMessageInvestor,
    WSSBCMessageType,
} from "./types";
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

app.post(
    "/inwestorzy",
    (req: Request<{}, {}, InwestorRequestPost>, res: Response) => {
        console.log("POST inwestorzy");
        console.log(req.body);

        db.run("insert into inwestorzy(id, nazwa, adres) values(null, ?, ?)", [
            req.body.nazwa,
            req.body.adres,
        ]);

        var bcastMsg: WSSBCMessageInvestor = {
            type: WSSBCMessageType.InvestorAdded,
            investor: req.body,
        };
        wsBroadcast(bcastMsg);
    }
);

app.delete("/inwestorzy/:id", (req: Request, res: Response) => {
    const investorID = Number(req.params.id);

    db.run("delete from inwestorzy where id = ?", [investorID]);

    var bcastMsg: WSSBCMessageInvestor = {
        type: WSSBCMessageType.InvestorDeleted,
        investor: {
            id: investorID,
            nazwa: "",
            adres: "",
        },
    };
    wsBroadcast(bcastMsg);
});

app.put(
    "/inwestorzy",
    (req: Request<{}, {}, InwestorRequestPut>, res: Response) => {
        db.run("update inwestorzy set nazwa=?, adres=? where id=?", [
            req.body.nazwa,
            req.body.adres,
            req.body.id,
        ]);

        var bcastMsg: WSSBCMessageInvestor = {
            type: WSSBCMessageType.InvestorUpdated,
            investor: req.body,
        };
        wsBroadcast(bcastMsg);
    }
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
