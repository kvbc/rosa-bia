// 1

import * as DB from "@shared/db";
import * as WS from "@server/ws/types";

export const WS_SERVER_URL = "http://localhost:" + WS.SERVER_PORT;

export const wsOnMessage = <TRow extends DB.Row>(
    ws: WebSocket,
    customListener: (message: WS.Message<TRow>) => void
) => {
    const listener: WebSocket["onmessage"] = (event) => {
        const message: WS.Message<TRow> = JSON.parse(event.data);
        customListener(message);
    };
    ws.addEventListener("message", listener);
    return () => {
        ws.removeEventListener("message", listener);
    };
};
