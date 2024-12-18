import { Request, Response, Router } from "express";
import {
    resError,
    resErrorMessage,
    resGetAuthEmployee,
    resVerifyTableName,
} from "@http/common";
import { stringToInteger } from "@/util";
import { db, wsServer } from "@";

const router = Router();

//
// Delete an entry of the specified id from the given table
//
router.post(
    "/table_rows/delete/:tableName/:rowID",
    async (
        req: Request<{ tableName: string; rowID: string }>,
        res: Response
    ) => {
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
        //
        const rowID: number | undefined = stringToInteger(req.params.rowID) // prettier-ignore
        if (rowID === undefined) {
            return resErrorMessage(res, 400, "Invalid row ID");
        } else if (rowID < 0) {
            return resErrorMessage(res, 400, "Row ID cannot be negative");
        }

        const sqlQuery = `delete from ${tableName} where id = ?`;
        const sqlParams = [rowID];

        // console.log(`[POST /table_rows/delete/${tableName}/${rowID}]`);

        db.run(sqlQuery, sqlParams, (error) => {
            if (error) {
                resError(res, 500, error);
                return;
            }
            wsServer.broadcastMessage({
                type: "table row deleted",
                tableRow: { id: rowID },
                tableName,
            });
            res.sendStatus(200);
        });
    }
);

export default router;
