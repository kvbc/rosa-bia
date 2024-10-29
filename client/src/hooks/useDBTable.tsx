//
// useDBTable.tsx
//

import {
    EffectCallback,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { DB } from "../../../server/src/db/types";
// import Emittery from "emittery";
import axios from "axios";
import { HTTP } from "../../../server/src/http/types";
import { WS } from "../../../server/src/ws/types";
import WebSocketContext from "../contexts/WebSocketContext";
import { HTTP_SERVER_URL } from "../api/http";

export type DBTable<TRow extends DB.Row> = ReturnType<typeof useDBTable<TRow>>;

// FIXME: add filters and dont always fetch all on init
export default function useDBTable<TRow extends DB.Row>(
    tableName: DB.TableName
    // initFilters?: DBFilter[]
) {
    const [totalRowCount, setTotalRowCount] = useState(0);
    // const [eventEmitter] = useState(
    //     new Emittery<{
    //         rowAdded: TRow;
    //         rowDeleted: TRow;
    //         rowUpdated: TRow;
    //     }>()
    // );
    const [rows, setRows] = useState<TRow[]>([]);
    const [startRowIndex, setStartRowIndex] = useState<number>(0);
    const [endRowIndex, setEndRowIndex] = useState<number>(9999); // FIXME: yeah
    // const [filters, setFilters] = useState<DBFilter<TRow>[]>(initFilters ?? []);
    const webSocket = useContext(WebSocketContext);

    const isRowIDInRange = useCallback(
        (rowID: number): boolean => {
            return rowID > startRowIndex && rowID <= endRowIndex;
        },
        [startRowIndex, endRowIndex]
    );

    const addRow = useCallback(
        (addedRow: TRow) => {
            setTotalRowCount((totalRowCount) => totalRowCount + 1);
            if (isRowIDInRange(addedRow.id)) {
                setRows((rows) => [...rows, addedRow]);
            }
        },
        [isRowIDInRange]
    );

    const deleteRow = useCallback(
        (deletedRow: TRow) => {
            setTotalRowCount((totalRowCount) => totalRowCount - 1);
            if (isRowIDInRange(deletedRow.id)) {
                setRows((rows) =>
                    rows.filter((row) => row.id !== deletedRow.id)
                );
            }
        },
        [isRowIDInRange]
    );

    const updateRow = useCallback(
        (updatedRow: TRow) => {
            if (isRowIDInRange(updatedRow.id)) {
                setRows((rows) =>
                    rows.map((row) =>
                        row.id === updatedRow.id ? updatedRow : row
                    )
                );
            }
        },
        [isRowIDInRange]
    );

    const requestAddRow = useCallback(
        (addedRow: TRow) => {
            axios
                .post(
                    HTTP_SERVER_URL + "/table_rows/add/" + tableName,
                    addedRow
                )
                .then(() => {
                    // eventEmitter.emit("rowAdded", addedRow);
                    addRow(addedRow);
                })
                .catch(() => {
                    setRows((rows) => [...rows]);
                });
        },
        // [eventEmitter, tableName, isRowIDInRange]
        [tableName, addRow]
    );

    const requestDeleteRow = useCallback(
        (deletedRow: TRow) => {
            axios
                .post(
                    HTTP_SERVER_URL +
                        `/table_rows/delete/${tableName}/${deletedRow.id}`
                )
                .then(() => {
                    // eventEmitter.emit("rowDeleted", deletedRow);
                    deleteRow(deletedRow);
                })
                .catch(() => {
                    setRows((rows) => [...rows]);
                });
        },
        // [eventEmitter, tableName, isRowIDInRange]
        [tableName, deleteRow]
    );

    const requestUpdateRow = useCallback(
        (updatedRow: TRow) => {
            axios
                .post(
                    HTTP_SERVER_URL + "/table_rows/update/" + tableName,
                    updatedRow
                )
                .then(() => {
                    // eventEmitter.emit("rowUpdated", updatedRow);
                    updateRow(updatedRow);
                })
                .catch(() => {
                    setRows((rows) => [...rows]);
                });
        },
        // [eventEmitter, tableName, isRowIDInRange]
        [tableName, updateRow]
    );

    const requestFetchRows = useCallback(
        (startIndex: number, endIndex: number): ReturnType<EffectCallback> => {
            const abortController = new AbortController();
            axios
                .post<HTTP.Response<TRow>>(
                    HTTP_SERVER_URL +
                        `/table_rows/get/${tableName}/${startIndex}/${endIndex}`,
                    {
                        // filters,
                    },
                    {
                        signal: abortController.signal,
                    }
                )
                .then((res) => {
                    // FIXME: why?
                    if (abortController.signal.aborted) return;

                    const msg = res.data;
                    if (msg.type !== "fetch table rows") {
                        throw "Invalid response type";
                    }
                    setTotalRowCount(msg.totalCount);
                    setRows(msg.rows);
                });
            return () => abortController.abort();
        },
        [
            tableName,
            // filters
        ]
    );

    useEffect(() => {
        return requestFetchRows(startRowIndex, endRowIndex);
    }, [startRowIndex, endRowIndex, requestFetchRows]);

    useEffect(() => {
        if (webSocket === null) {
            // FIXME: Error handling
            throw "No web socket";
        }
        const listener: WebSocket["onmessage"] = (event) => {
            const message: WS.Message<TRow> = JSON.parse(event.data);
            if (message.tableName !== tableName) return;
            switch (message.type) {
                case "table row added":
                    addRow(message.tableRow);
                    break;
                case "table row deleted":
                    deleteRow(message.tableRow);
                    break;
                case "table row updated":
                    updateRow(message.tableRow);
                    break;
            }
        };
        webSocket.addEventListener("message", listener);
        return () => {
            webSocket.removeEventListener("message", listener);
        };
    }, [webSocket, addRow, deleteRow, updateRow, tableName]);

    return {
        tableName,
        totalRowCount,
        // eventEmitter,
        rows,
        startRowIndex,
        setStartRowIndex,
        endRowIndex,
        setEndRowIndex,
        requestAddRow,
        requestDeleteRow,
        requestUpdateRow,
        requestFetchRows,
        // filters,
        // setFilters,
    };
}
