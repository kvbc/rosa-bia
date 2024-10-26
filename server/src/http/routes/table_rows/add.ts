import { Router } from "express";

const router = Router();

//
// Insert a new row into the specified table
//
router.post(
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
                            wss.broadcastMessage({
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

export default router;
