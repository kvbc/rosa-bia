import { Request, Response } from "express";
import * as DB from "@shared/db";
import { resErrorMessage } from "./resErrorMessage";

export const resVerifyTableName = (
    actionType: "modify" | "fetch",
    res: Response,
    tableName: string,
    isAdmin: boolean
): DB.TableName | null => {
    if (!DB.TABLE_NAMES.includes(tableName as DB.TableName)) {
        resErrorMessage(res, 400, `Invalid table name "${tableName}"`);
        return null;
    }
    if (
        DB.TABLE_NAMES_MODIFY_ADMIN_ONLY.includes(tableName as DB.TableName) &&
        !isAdmin &&
        actionType === "modify"
    ) {
        resErrorMessage(res, 401, `Insufficient permissions for table "${tableName}"`) // prettier-ignore
        return null;
    }
    return tableName as DB.TableName;
};
