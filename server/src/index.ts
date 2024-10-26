//
// index.ts
// HTML and WebSocket server entry point
//

import dotenv from "dotenv";
import { WS } from "./ws";
import { HTTP } from "./http";
import { DB } from "./db";

dotenv.config();

export const db = DB.load();
export const wsServer = WS.startServer();
export const httpServer = HTTP.startServer();
