import { Response } from "express";
import { DB } from "../../db";
import { resErrorMessage } from "./resErrorMessage";

// returns true if succeeded or false if not
export const resVerifyTableRow = (
    res: Response,
    tableName: DB.TableName,
    row: any
): DB.Row | null => {
    const ret = DB.Rows.getMeta(tableName).shape.safeParse(row);
    if (!ret.success) {
        resErrorMessage(res, 400, ret.error.message);
        return null;
    }
    return row as DB.Row;
};
