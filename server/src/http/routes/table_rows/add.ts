import { Request, Response, Router } from "express";
import {
    resError,
    resGetAuthEmployee,
    resVerifyTableName,
    resVerifyTableRow,
} from "@http/common";
import * as DB from "@shared/db";
import { db, wsServer } from "@";

const router = Router();

//
// Insert a new row into the specified table
//
router.post(
    "/table_rows/add/:tableName",
    async (req: Request<{ tableName: string }>, res: Response) => {
        const { employee } = await resGetAuthEmployee(req, res).catch();

        if (!employee) {
            return;
        }

        // verify params
        const tableName = resVerifyTableName(
            "modify",
            res,
            req.params.tableName,
            Boolean(employee.admin)
        );
        if (!tableName) {
            return;
        }

        // verify body
        const newRow = resVerifyTableRow(res, tableName, req.body);
        if (!newRow) {
            return;
        }

        const keys = Object.keys(newRow).filter((key) =>
            DB.getRowMeta(tableName).keys.includes(key)
        );
        const sqlKeys = keys.map((key) => "`" + key + "`").join(", ");
        const sqlParams = keys.map((_) => "?").join(", ");
        const sqlValues = keys.map((key) => key === "id" ? null : newRow[key]); // prettier-ignore
        const sqlQuery = `insert into ${tableName}(${sqlKeys}) values(${sqlParams})`;

        console.log(
            `[POST /table_rows/add/${tableName}] \n| Query: "${sqlQuery}" \n| Values: ${sqlValues.join(
                ", "
            )}`
        );

        db.run(sqlQuery, sqlValues, (error) => {
            if (error) {
                resError(res, 500, error);
                return;
            }
            db.get<{ "last_insert_rowid()": number }>(
                "select last_insert_rowid()",
                (error, row) => {
                    if (error) {
                        resError(res, 500, error);
                        return;
                    }
                    const insertID = row["last_insert_rowid()"];
                    wsServer.broadcastMessage({
                        type: "table row added",
                        tableRow: { ...newRow, id: insertID },
                        tableName,
                    });
                    res.sendStatus(200);
                }
            );
        });
    }
);

export default router;
