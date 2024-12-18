import z from "zod";

export const EmployeeLoginRequestShape = z.strictObject({
    employeeName: z.string(),
    employeePassword: z.string(),
});
export type EmployeeLoginRequest =
    | z.infer<typeof EmployeeLoginRequestShape>
    | Record<PropertyKey, never>;
