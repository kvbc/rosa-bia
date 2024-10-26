import { Router } from "express";

const router = Router();

export const ZRequestEmployeeLogin = z.object({
    employeeName: z.string(),
    employeePassword: z.string(),
});
export type RequestEmployeeLogin = z.infer<typeof ZRequestEmployeeLogin>;

router.post(
    "/login",
    (req: Request<HTTP.RequestEmployeeLogin>, res: Response) => {
        getAuthorizedEmployee(req, res, true)
            .then(({ employee, jwtToken }) => {
                const noBody =
                    !req.body ||
                    (typeof req.body === "object" &&
                        Object.keys(req.body).length === 0);
                if (employee && noBody) {
                    const response: HTTP.Response = {
                        type: "login",
                        jwtToken: jwtToken!,
                        employee,
                    };
                    res.status(200).json(response);
                    return;
                }

                // verify body
                const ret = HTTP.ZRequestEmployeeLogin.safeParse(req.body);
                if (!ret.success) {
                    return console.error(ret.error.message);
                    // return resErrorMessage(res, 400, ret.error.message);
                }
                const body = ret.data;

                const sqlQuery =
                    "select * from employees where name = ? and password = ?";
                const sqlParams = [body.employeeName, body.employeePassword];

                console.log(`[POST /login] ${sqlQuery} ${sqlParams}`);

                db.get<DB.Rows.Employee | undefined>(
                    sqlQuery,
                    sqlParams,
                    (error, row) => {
                        if (error) {
                            // return resError(res, 500, error);
                            return console.error(error.message);
                        }
                        if (row === undefined) {
                            return console.error(
                                "Invalid username or password"
                            );
                            // return resErrorMessage(
                            //     res,
                            //     400,
                            //     "Invalid username or password"
                            // );
                        }
                        const jwtToken = jwt.sign(row.name, JWT_SECRET_KEY);
                        const response: HTTP.Response = {
                            type: "login",
                            jwtToken,
                            employee: row,
                        };
                        res.status(200).json(response);
                    }
                );
            })
            .catch(console.error);
    }
);

export default router;
