import { Request, Response } from "express";
import { DB } from "../../db";
import jwt from "jsonwebtoken";
import { db } from "../..";
import { resError } from "./resError";
import { resErrorMessage } from "./resErrorMessage";

export const resGetAuthEmployee = async (
    req: Request,
    res: Response,
    optional?: boolean
): Promise<{ employee?: DB.Rows.Employee; jwtToken?: string }> => {
    return new Promise((resolve, reject) => {
        const authorization = req.headers["authorization"];
        if (!(authorization && authorization.startsWith("Bearer "))) {
            if (optional) {
                resolve({});
            }
            if (!optional) {
                resError(res, 401, "Authorization required");
                reject();
            }
            return;
        }
        const jwtToken = authorization.replace("Bearer ", "");
        try {
            const employeeName = jwt.verify(jwtToken, process.env.JWT_SECRET);
            db.get<DB.Rows.Employee | undefined>(
                "select * from employees where name = ?",
                [employeeName],
                (error, row) => {
                    if (error) {
                        if (optional) {
                            resolve({ jwtToken });
                        } else {
                            resError(res, 500, error);
                            reject();
                        }
                        return;
                    }
                    if (row === undefined) {
                        if (optional) {
                            resolve({ jwtToken });
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
                resolve({ jwtToken });
            } else {
                resError(res, 401, error);
                reject();
            }
        }
    });
};
