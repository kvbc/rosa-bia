import { z } from "zod";
import * as DB from "..";

export const EMPLOYEES_TABLE_NAMES = ["employees"] as const;

/*
 *
 * Row :: Employee
 *
 */

export const employeeShape = z.object({
    id: z.number(),
    name: z.string(),
    password: z.string(),
    admin: z.number(),
    has_password: z.boolean(),
});

export type Employee = z.infer<typeof employeeShape>;

export const EMPLOYEE_ADMIN_KEYS: DB.RowAdminKeys<Employee> = new Set<keyof Employee>(["password"]) // prettier-ignore

/*
 *
 * Meta
 *
 */

export const EMPLOYEES_ROW_METAS = {
    employees: {
        shape: employeeShape,
        adminKeys: EMPLOYEE_ADMIN_KEYS,
    },
} as const satisfies DB.RowMetas;
