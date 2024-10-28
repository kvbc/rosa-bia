import WebSocket from "ws";
import { DB } from "./db";

export namespace WS {
    export const SERVER_PORT = 3002;

    export type Message<TRow extends DB.Row = DB.Row> = {
        type: "table row added" | "table row updated" | "table row deleted";
        tableRow: TRow;
        tableName: DB.TableName;
    };

    export const startServer = () => {
        const server = new WebSocket.Server({ port: SERVER_PORT });

        const broadcastMessage = (message: WS.Message): void => {
            server.clients.forEach((ws) => ws.send(JSON.stringify(message)));
        };

        server.on("listening", () => {
            console.log(
                `WebSocket Server is running at http://localhost:${SERVER_PORT}`
            );
        });

        return { broadcastMessage };
    };
}
