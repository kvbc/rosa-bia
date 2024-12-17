import { Request, Response } from "express";
import * as DB from "@shared/db";
import jwt, { Secret } from "jsonwebtoken";
import { db } from "@";
import { resError } from "./resError";
import { resErrorMessage } from "./resErrorMessage";

export const resGetAuthEmployee = async (
    req: Request,
    res: Response,
    optional?: boolean
): Promise<{ employee: DB.Rows.Employee | null; jwtToken: string | null }> => {
    return new Promise((resolve, reject) => {
        const authorization = req.headers["authorization"];
        if (!(authorization && authorization.startsWith("Bearer "))) {
            if (optional) {
                resolve({ employee: null, jwtToken: null });
            }
            if (!optional) {
                resError(res, 401, "Authorization required");
                reject();
            }
            return;
        }
        const jwtToken = authorization.replace("Bearer ", "");
        try {
            const employeeName = jwt.verify(
                jwtToken,
                process.env.JWT_SECRET as Secret
            );
            db.get(
                "select * from employees where name = ?",
                [employeeName],
                (error: Error | null, row: DB.Rows.Employee | undefined) => {
                    if (error) {
                        if (optional) {
                            resolve({ employee: null, jwtToken });
                        } else {
                            resError(res, 500, error);
                            reject();
                        }
                        return;
                    }
                    if (row === undefined) {
                        if (optional) {
                            resolve({ employee: null, jwtToken });
                        } else {
                            resErrorMessage(res, 500, "Employee not found");
                            reject();
                        }
                        return;
                    }
                    resolve({ employee: row, jwtToken });
                }
            );
        } catch (error) {
            if (optional) {
                resolve({ employee: null, jwtToken });
            } else {
                resError(res, 401, error);
                reject();
            }
        }
    });
};
