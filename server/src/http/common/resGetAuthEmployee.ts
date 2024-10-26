import { Request, Response } from "express";
import { DB } from "../../db";
import jwt from "jsonwebtoken";
import { db } from "../..";
import { resError } from "./resError";
import { resErrorMessage } from "./resErrorMessage";

// TODO: start rework with this
export const resGetAuthEmployee = async (
    req: Request,
    res: Response,
    optional?: boolean
): Promise<{ row?: DB.Rows.Employee; jwtToken?: string }> => {
    return new Promise((resolve, reject) => {
        const authorization = req.headers["authorization"];
        if (authorization && authorization.startsWith("Bearer ")) {
            const jwtToken = authorization.replace("Bearer ", "");
            try {
                const employeeName = jwt.verify(
                    jwtToken,
                    process.env.JWT_SECRET
                );
                console.log(">>>", employeeName);
                db.get<DB.Rows.Employee | undefined>(
                    "select * from employees where name = ?",
                    [employeeName],
                    (error, row) => {
                        if (error) {
                            if (!optional) {
                                resError(res, 500, error);
                            }
                            resolve({ jwtToken });
                            // reject();
                            return;
                        }
                        if (row === undefined) {
                            if (!optional) {
                                resErrorMessage(res, 500, "Employee not found");
                            }
                            resolve({ jwtToken });
                            // reject();
                            return;
                        }
                        resolve({ row, jwtToken });
                    }
                );
                return;
            } catch (error) {
                if (!optional) {
                    resError(res, 401, error);
                }
                resolve({ jwtToken });
                // reject();
                return;
            }
        }
        if (!optional) {
            resError(res, 401, "Authorization required");
            // reject();
        }
        resolve({});
    });
};
