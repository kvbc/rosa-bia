import { Request, Response, Router } from "express";
import { z } from "zod";
import { resError, resErrorMessage, resGetAuthEmployee } from "../common";
import { db } from "../..";
import { DB } from "../../db/types";
import jwt from "jsonwebtoken";
import { HTTP } from "../types";

export const EmployeeLoginRequestShape = z.strictObject({
    employeeName: z.string(),
    employeePassword: z.string(),
});
export type EmployeeLoginRequest = z.infer<typeof EmployeeLoginRequestShape>;

const router = Router();

//
// If body is empty, just retrieve information
// Otherwise attempt to login
//
router.post(
    "/login",
    async (req: Request<EmployeeLoginRequest>, res: Response) => {
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
        const ret = EmployeeLoginRequestShape.safeParse(req.body);
        if (!ret.success) {
            resErrorMessage(res, 400, ret.error.message);
            return;
        }
        const body = ret.data;

        const sqlQuery = "select * from employees where name = ? and password = ?"; // prettier-ignore
        const sqlParams = [body.employeeName, body.employeePassword];

        console.log(`[POST /login]`);

        db.get<DB.Rows.Employee | undefined>(
            sqlQuery,
            sqlParams,
            (error, row) => {
                if (error) {
                    resError(res, 500, error);
                    return;
                }
                if (row === undefined) {
                    resErrorMessage(res, 400, "Invalid username or password");
                    return;
                }
                const jwtToken = jwt.sign(row.name, process.env.JWT_SECRET);
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
