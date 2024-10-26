import { Request, Response } from "express";
import { DB } from "../../db";
import { resErrorMessage } from "./resErrorMessage";

// returns true if succeeded or false if not
export const resVerifyTableName = (
    method: Request["method"],
    res: Response,
    tableName: string,
    isAdmin: boolean
): boolean => {
    if (!DB.TABLE_NAMES.includes(tableName as DB.TableName)) {
        resErrorMessage(res, 400, `Invalid table name "${tableName}"`);
        return false;
    }
    const modifyMethods: Request["method"][] = ["POST", "PUT", "DELETE"];
    if (
        DB.TABLE_NAMES_MODIFY_ADMIN_ONLY.includes(tableName as DB.TableName) &&
        !isAdmin &&
        modifyMethods.includes(method)
    ) {
        resErrorMessage(res, 401, `Insufficient permissions for table "${tableName}"`) // prettier-ignore
        return false;
    }
    return true;
};
