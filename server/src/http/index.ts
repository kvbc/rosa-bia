import express, { Express, Request, Response } from "express";
import cors from "cors";
import { HTTP_SERVER_PORT, HTTP_SERVER_URL } from "../../../config";

import routeTableRowsGet from "./routes/table_rows/get";
import routeTableRowsAdd from "./routes/table_rows/add";
import routeTableRowsDelete from "./routes/table_rows/delete";
import routeTableRowsUpdate from "./routes/table_rows/update";
import routeEmployeeLogin from "./routes/employee_login";
import { DB } from "../db";

export namespace HTTP {
    export type Response<TRow extends DB.Row = DB.Row> =
        | {
              type: "fetch table rows";
              totalCount: number;
              rows: TRow[];
          }
        | {
              type: "error";
              message: string;
          }
        | {
              type: "login";
              jwtToken: string;
              employee: DB.Rows.Employee;
          };

    export const startServer = () => {
        const app = express();

        app.use(express.json());
        app.use(cors());

        app.listen(HTTP_SERVER_PORT, () => {
            console.log(`HTTP Server is running at ${HTTP_SERVER_URL}`);
        });

        app.use(routeTableRowsGet);
        app.use(routeTableRowsAdd);
        app.use(routeTableRowsDelete);
        app.use(routeTableRowsUpdate);
        app.use(routeEmployeeLogin);
    };
}
