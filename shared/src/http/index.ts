import * as DB from "../db";

export * from "./employee_login";
export * from "./get_table_rows";

export const SERVER_PORT = 3001;

export type Response<TRow extends DB.Row = DB.Row> =
    | {
          type: "fetch table rows";
          totalCount: number;
          rows: TRow[];
          topRowID: number;
      }
    | {
          type: "error";
          message: string;
      }
    | {
          type: "login";
          jwtToken: string | null;
          employee: DB.Rows.Employee | null;
      };
