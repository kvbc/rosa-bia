import { DB } from "@shared/db";

export namespace HTTP {
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
}
