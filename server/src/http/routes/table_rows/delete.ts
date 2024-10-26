import { Request, Response, Router } from "express";
import {
    resError,
    resErrorMessage,
    resGetAuthEmployee,
    resVerifyTableName,
} from "../../common";
import { stringToInteger } from "../../../util";
import { db, wsServer } from "../../..";

const router = Router();

//
// Delete an entry of the specified id from the given table
//
router.delete(
    "/table/:tableName/:entryID",
    (req: Request<{ tableName: string; entryID: string }>, res: Response) => {
        resGetAuthEmployee(req, res)
            .then((employee) => {
                if (!employee) {
                    return;
                }

                // verify params
                if (
                    !resVerifyTableName(
                        req.method,
                        res,
                        req.params.tableName,
                        Boolean(employee.row?.admin)
                    )
                ) {
                    return;
                }
                const tableName = req.params.tableName as DB.TableName;
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
                    wsServer.broadcastMessage({
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

export default router;
