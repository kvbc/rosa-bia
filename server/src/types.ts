//
// types.ts
// HTTP and WebSocket server types
//

import { DBRow, DBTableName } from "./dbTypes";
import { z } from "zod";

export type WSMessage<TRow extends DBRow = DBRow> = {
    messageType: "table row added" | "table row updated" | "table row deleted";
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
      };

export const DB_ADMIN_MODIFY_TABLES: readonly DBTableName[] = [
    "construction_sections",
    "construction_divisions",
    "construction_groups",
    "construction_classes",
    "construction_specs",
    "employees",
    "info_boards",
];
