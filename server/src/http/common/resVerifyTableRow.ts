import { Response } from "express";
import { DB } from "../../db";
import { resErrorMessage } from "./resErrorMessage";

// returns true if succeeded or false if not
export const resVerifyTableRow = (
    res: Response,
    tableName: DB.TableName,
    row: any
): boolean => {
    const ret = DB.Rows.INFOS[tableName].zod.safeParse(row);
    if (!ret.success) {
        resErrorMessage(res, 400, ret.error.message);
        return false;
    }
    return true;
};
