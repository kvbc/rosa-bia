import { DB } from "@shared/db";

export namespace WS {
    export const SERVER_PORT = 3002;

    export type Message<TRow extends DB.Row = DB.Row> =
        | {
              type:
                  | "table row added"
                  | "table row updated"
                  | "table row deleted";
              tableRow: TRow;
              tableName: DB.TableName;
          }
        | {
              type: "server started";
          };
}
