//
// types.ts
// HTTP and WebSocket server types
//

import { DBRow, DBRows, DBTableName } from "./dbTypes";
import { z, ZodObject } from "zod";

export type WSMessage<TRow extends DBRow = DBRow> = {
    type: "table row added" | "table row updated" | "table row deleted";
    tableRow: TRow;
    tableName: DBTableName;
};

export const ZHTTPRequestLogin = z.object({
    employeeName: z.string(),
    employeePassword: z.string(),
});
export type HTTPRequestLogin = z.infer<typeof ZHTTPRequestLogin>;

export type HTTPResponse<TRow extends DBRow = DBRow> =
    | {
          responseType: "fetch table rows";
          totalCount: number;
          rows: TRow[];
      }
    | {
          responseType: "error";
          message: string;
      }
    | {
          responseType: "login";
          jwtToken: string;
          employee: DBRows.Employee;
      };

export const DB_FILTER_OPERATORS = [
    "=",
    ">",
    ">=",
    "<",
    "<=",
    "<>",
    "like",
] as const;
export type DBFilterOperator = (typeof DB_FILTER_OPERATORS)[number];
export const createHTTPRequestBodyGetTableRowsZodObject = (
    zodRowObject: ZodObject<any>
) =>
    z
        .object({
            filters: z
                .array(
                    z.object({
                        key: zodRowObject.keyof(),
                        operator: z.enum(DB_FILTER_OPERATORS),
                        value: z.string(),
                    })
                )
                .optional(),
        })
        .optional();
// Example: "id" ">=" "10"
export type DBFilter<TRow extends DBRow = DBRow> = {
    key: keyof TRow;
    operator: DBFilterOperator;
    value: string;
};
export type HTTPRequestBodyGetTableRows =
    | {
          filters?: DBFilter[];
      }
    | undefined;

export const DB_ADMIN_MODIFY_TABLES: readonly DBTableName[] = [
    "construction_sections",
    "construction_divisions",
    "construction_groups",
    "construction_classes",
    "construction_specs",
    "employees",
    "info_boards",
];
