import { Request, Response, Router } from "express";
import { z } from "zod";
import { resError, resErrorMessage, resGetAuthEmployee } from "../common";
import { db } from "@";
import * as DB from "@shared/db";
import jwt, { Secret } from "jsonwebtoken";
import * as HTTP from "@shared/http";

const router = Router();

//
// If body is empty, just retrieve information
// Otherwise attempt to login
//
router.post(
    "/login",
    async (req: Request<HTTP.EmployeeLoginRequest>, res: Response) => {
        const { employee, jwtToken } = await resGetAuthEmployee(
            req,
            res,
            true
        ).catch();

        const isBodyEmpty =
            !req.body ||
            (typeof req.body === "object" &&
                Object.keys(req.body).length === 0);

        if (isBodyEmpty) {
            const response: HTTP.Response = {
                type: "login",
                jwtToken,
                employee,
            };
            res.status(200).json(response);
            return;
        }

        // verify body
        const ret = HTTP.EmployeeLoginRequestShape.safeParse(req.body);
        if (!ret.success) {
            resErrorMessage(res, 400, ret.error.message);
            return;
        }
        const body = ret.data;

        const sqlQuery = "select * from employees where name = ? and password = ?"; // prettier-ignore
        const sqlParams = [body.employeeName, body.employeePassword];

        // console.log(`[POST /login]`);

        db.get(
            sqlQuery,
            sqlParams,
            (error: Error | null, row: DB.Rows.Employee | undefined) => {
                if (error) {
                    resError(res, 500, error);
                    return;
                }
                if (row === undefined) {
                    resErrorMessage(res, 400, "Invalid username or password");
                    return;
                }
                const jwtToken = jwt.sign(
                    row.name,
                    process.env.JWT_SECRET as Secret
                );
                const response: HTTP.Response = {
                    type: "login",
                    jwtToken,
                    employee: row,
                };
                res.status(200).json(response);
            }
        );
    }
);

export default router;
