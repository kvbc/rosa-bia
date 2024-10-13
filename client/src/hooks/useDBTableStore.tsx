//
// useDBTableStore.tsx
// hook used to access a specific database table
//

import { EffectCallback, useContext } from "react";
import { HTTPResponse, WSMessage } from "../../../server/src/types";
import WebSocketContext from "../contexts/WebSocketContext";
import axios from "axios";
import { create, StoreApi, UseBoundStore } from "zustand";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";
import { HTTP_SERVER_HOSTNAME, HTTP_SERVER_URL } from "../../../config";
import Emittery from "emittery";
import { EventEmitter } from "stream";

const newEmittery = <TRow extends DBRow>() => {
    return new Emittery<{
        rowAdded: TRow;
        rowDeleted: TRow;
        rowUpdated: TRow;
    }>();
};

export type DBTableStore<TRow extends DBRow> = {
    tableName: DBTableName;
    totalRowCount: number;
    eventEmitter: ReturnType<typeof newEmittery<TRow>>;
    addRow: (newRow: TRow) => void;
    deleteRow: (row: TRow) => void;
    updateRow: (row: TRow) => void;
    fetchRows: (
        startRowIndex: number,
        endRowIndex: number
    ) => { abort: ReturnType<EffectCallback>; promise: Promise<TRow[]> };
};

function createDBEntriesStore<TRow extends DBRow>(tableName: DBTableName) {
    return create<DBTableStore<TRow>>((set, get) => {
        const webSocket = useContext(WebSocketContext);
        if (!webSocket) {
            throw "Error"; // FIXME: show nice error
        }
        webSocket.addEventListener("message", (event) => {
            const message: WSMessage<TRow> = JSON.parse(event.data);
            if (message.tableName !== tableName) return;
            switch (message.type) {
                case "table row added":
                    get().eventEmitter.emit("rowAdded", message.tableRow);
                    break;
                case "table row deleted":
                    get().eventEmitter.emit("rowDeleted", message.tableRow);
                    break;
                case "table row updated":
                    get().eventEmitter.emit("rowUpdated", message.tableRow);
                    break;
            }
        });

        return {
            totalRowCount: 0,
            tableName,
            eventEmitter: newEmittery<TRow>(),
            addRow: (row) => {
                axios
                    .post(HTTP_SERVER_URL + "/table/" + tableName, row)
                    .then(() => {
                        get().eventEmitter.emit("rowAdded", row);
                        set((state) => ({
                            ...state,
                            totalRowCount: get().totalRowCount + 1,
                        }));
                    });
            },
            deleteRow: (row) => {
                axios
                    .delete(HTTP_SERVER_URL + `/table/${tableName}/${row.id}`)
                    .then(() => {
                        get().eventEmitter.emit("rowDeleted", row);
                        set((state) => ({
                            ...state,
                            totalRowCount: get().totalRowCount - 1,
                        }));
                    });
            },
            updateRow: (row) => {
                axios
                    .put(HTTP_SERVER_URL + "/table/" + tableName, row)
                    .then(() => {
                        get().eventEmitter.emit("rowUpdated", row);
                    });
            },
            fetchRows: (startIndex: number, endIndex: number) => {
                const abortController = new AbortController();
                const promise: Promise<TRow[]> = axios
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
                        set((state) => ({
                            ...state,
                            totalRowCount: msg.totalCount,
                        }));
                        return msg.rows;
                    });
                return {
                    abort: abortController.abort,
                    promise,
                };
            },
        };
    });
}

const stores: {
    [tableName in DBTableName]?: any;
} = {};

export default function useDBTableStore<TRow extends DBRow>(
    tableName: DBTableName
) {
    if (!stores[tableName]) {
        stores[tableName] = createDBEntriesStore<TRow>(tableName);
    }
    const store: ReturnType<
        UseBoundStore<StoreApi<DBTableStore<TRow>>>["getState"]
    > = stores[tableName].getState();

    return store;
}
