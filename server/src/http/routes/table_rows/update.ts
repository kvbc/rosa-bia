import { Request, Response, Router } from "express";
import {
    resError,
    resGetAuthEmployee,
    resVerifyTableName,
    resVerifyTableRow,
} from "@http/common";
import { db, wsServer } from "@";
import * as DB from "@shared/db";

const router = Router();

//
// Update the given entry with a new specified entry
//
router.post(
    "/table_rows/update/:tableName",
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

        let sqlQuery = `update ${tableName} set `;
        const sqlParams: any[] = [];
        for (const key in newRow) {
            if (key !== "id" && DB.getRowMeta(tableName).keys.includes(key)) {
                if (sqlParams.length > 0) {
                    sqlQuery += ", ";
                }
                sqlQuery += `\`${key}\`=?`;
                sqlParams.push(newRow[key]);
            }
        }
        sqlQuery += " where id=?";
        sqlParams.push(newRow.id);

        console.log(
            `[POST /table_rows/update/${tableName}] \n| Query: "${sqlQuery}"`
        );

        db.run(sqlQuery, sqlParams, (error) => {
            if (error) {
                resError(res, 500, error);
                return;
            }
            wsServer.broadcastMessage({
                type: "table row updated",
                tableRow: newRow,
                tableName,
            });
            res.sendStatus(200);
        });
    }
);

export default router;
