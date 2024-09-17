import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {
    GetInwestorzyOdpowiedz,
    GetInwestorzyZadanie,
    Inwestor,
} from "./types";
import { Database } from "sqlite3";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT!;
const db = new Database("db/db.db");

app.use(express.json());
app.use(cors());

app.post(
    "/inwestorzy",
    (
        req: Request<{}, {}, GetInwestorzyZadanie>,
        res: Response<GetInwestorzyOdpowiedz>
    ) => {
        console.log("POST inwestorzy");
        console.log(req.body);

        const length = req.body.endIndex - req.body.startIndex;

        db.all<Inwestor>(
            "select * from inwestorzy limit ?, ?",
            [req.body.startIndex, length],
            (err, inwestorzy) => {
                if (err) throw err;
                db.get<{ "count(*)": number }>(
                    "select count(*) from inwestorzy",
                    (err, row) => {
                        if (err) throw err;
                        const liczba = row["count(*)"];
                        const odp: GetInwestorzyOdpowiedz = {
                            inwestorzy,
                            liczba,
                        };
                        res.json(odp);
                    }
                );
            }
        );
    }
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
