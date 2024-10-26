import { Router } from "express";

const router = Router();

//
// Update the given entry with a new specified entry
//
router.put(
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
                const tableName = req.params.tableName as DB.TableName;

                // verify body
                if (!resVerifyTableRow(res, tableName, req.body)) {
                    return;
                }
                const newRow: DB.Row = req.body;

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

export default router;
