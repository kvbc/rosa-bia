//
// useDBTableStore.tsx
// hook used to access a specific database table
//

import { EffectCallback, useContext, useEffect, useState } from "react";
import { HTTPResponse, WSMessage } from "../../../server/src/types";
import WebSocketContext from "../contexts/WebSocketContext";
import axios from "axios";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";
import { HTTP_SERVER_URL } from "../../../config";
import Emittery from "emittery";

export default function useDBTableStore<TRow extends DBRow>(
    tableName: DBTableName
) {
    const [totalRowCount, setTotalRowCount] = useState<number>(0);
    const [eventEmitter] = useState(
        new Emittery<{
            rowAdded: TRow;
            rowDeleted: TRow;
            rowUpdated: TRow;
        }>()
    );
    const webSocket = useContext(WebSocketContext);

    useEffect(() => {
        if (!webSocket) {
            throw "Error"; // FIXME: show nice error
        }
        const listener: WebSocket["onmessage"] = (event) => {
            const message: WSMessage<TRow> = JSON.parse(event.data);
            if (message.tableName !== tableName) return;
            switch (message.type) {
                case "table row added":
                    eventEmitter.emit("rowAdded", message.tableRow);
                    break;
                case "table row deleted":
                    eventEmitter.emit("rowDeleted", message.tableRow);
                    break;
                case "table row updated":
                    eventEmitter.emit("rowUpdated", message.tableRow);
                    break;
            }
        };
        webSocket.addEventListener("message", listener);
        return () => {
            webSocket.removeEventListener("message", listener);
        };
    }, [webSocket, eventEmitter, tableName]);

    const addRow = (row: TRow) => {
        axios.post(HTTP_SERVER_URL + "/table/" + tableName, row).then(() => {
            eventEmitter.emit("rowAdded", row);
            setTotalRowCount((totalRowCount) => totalRowCount + 1);
        });
    };

    const deleteRow = (row: TRow) => {
        axios
            .delete(HTTP_SERVER_URL + `/table/${tableName}/${row.id}`)
            .then(() => {
                eventEmitter.emit("rowDeleted", row);
                setTotalRowCount((totalRowCount) => totalRowCount - 1);
            });
    };

    const updateRow = (row: TRow) => {
        axios.put(HTTP_SERVER_URL + "/table/" + tableName, row).then(() => {
            eventEmitter.emit("rowUpdated", row);
        });
    };

    const fetchRows = (
        startIndex: number,
        endIndex: number,
        onFetch: (rows: TRow[]) => void
    ): ReturnType<EffectCallback> => {
        const abortController = new AbortController();
        axios
            .get<HTTPResponse<TRow>>(
                HTTP_SERVER_URL +
                    `/table/${tableName}/${startIndex}/${endIndex}`,
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                const msg = res.data;
                if (msg.responseType !== "fetch table rows") {
                    throw "Invalid response type";
                }
                setTotalRowCount(msg.totalCount);
                onFetch(msg.rows);
            });
        return () => abortController.abort();
    };

    return {
        totalRowCount,
        eventEmitter,
        addRow,
        deleteRow,
        updateRow,
        fetchRows,
    };
}
