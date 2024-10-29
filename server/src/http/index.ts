import express from "express";
import cors from "cors";

import routeTableRowsGet from "./routes/table_rows/get";
import routeTableRowsAdd from "./routes/table_rows/add";
import routeTableRowsDelete from "./routes/table_rows/delete";
import routeTableRowsUpdate from "./routes/table_rows/update";
import routeEmployeeLogin from "./routes/employee_login";
import { HTTP } from "./types";

export const startHttpServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(routeTableRowsGet);
    app.use(routeTableRowsAdd);
    app.use(routeTableRowsDelete);
    app.use(routeTableRowsUpdate);
    app.use(routeEmployeeLogin);

    app.listen(HTTP.SERVER_PORT, () => {
        console.log(
            `HTTP Server is running at http://localhost:${HTTP.SERVER_PORT}`
        );
    });
};
