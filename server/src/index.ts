//
// index.ts
// HTML and WebSocket server entry point
//

import dotenv from "dotenv";
import { startWebSocketServer } from "./ws";
import { startHttpServer } from "./http";
import { loadDatabase } from "./db";

dotenv.config();

export const db = loadDatabase();
export const wsServer = startWebSocketServer();
export const httpServer = startHttpServer();

wsServer.broadcastMessage({ type: "server started" });
console.log("Servers (re)started");
