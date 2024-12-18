import WebSocket from "ws";
import * as WS from "@shared/ws";

export const startWebSocketServer = () => {
    const server = new WebSocket.Server({ port: WS.SERVER_PORT });

    const broadcastMessage = (message: WS.Message): void => {
        server.clients.forEach((ws) => ws.send(JSON.stringify(message)));
    };

    server.on("listening", () => {
        console.log(
            `WebSocket Server is running at http://localhost:${WS.SERVER_PORT}`
        );
    });

    return { broadcastMessage };
};
