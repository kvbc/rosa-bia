//
// useDBTable.tsx
//
// TODO: Merge DBTableStore from App into this?
//

import {
    EffectCallback,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";
// import Emittery from "emittery";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config";
import { HTTPResponse, WSMessage } from "../../../server/src/types";
import WebSocketContext from "../contexts/WebSocketContext";

export type DBTable<TRow extends DBRow> = ReturnType<typeof useDBTable<TRow>>;

// FIXME: add filters and dont always fetch all on init
export default function useDBTable<TRow extends DBRow>(tableName: DBTableName) {
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
                .post(HTTP_SERVER_URL + "/table/" + tableName, addedRow)
                .then(() => {
                    // eventEmitter.emit("rowAdded", addedRow);
                    addRow(addedRow);
                });
        },
        // [eventEmitter, tableName, isRowIDInRange]
        [tableName, addRow]
    );

    const requestDeleteRow = useCallback(
        (deletedRow: TRow) => {
            axios
                .delete(
                    HTTP_SERVER_URL + `/table/${tableName}/${deletedRow.id}`
                )
                .then(() => {
                    // eventEmitter.emit("rowDeleted", deletedRow);
                    deleteRow(deletedRow);
                });
        },
        // [eventEmitter, tableName, isRowIDInRange]
        [tableName, deleteRow]
    );

    const requestUpdateRow = useCallback(
        (updatedRow: TRow) => {
            axios
                .put(HTTP_SERVER_URL + "/table/" + tableName, updatedRow)
                .then(() => {
                    // eventEmitter.emit("rowUpdated", updatedRow);
                    updateRow(updatedRow);
                });
        },
        // [eventEmitter, tableName, isRowIDInRange]
        [tableName, updateRow]
    );

    const requestFetchRows = useCallback(
        (startIndex: number, endIndex: number): ReturnType<EffectCallback> => {
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
                    // FIXME: why?
                    if (abortController.signal.aborted) return;

                    const msg = res.data;
                    if (msg.responseType !== "fetch table rows") {
                        throw "Invalid response type";
                    }
                    setTotalRowCount(msg.totalCount);
                    setRows(msg.rows);
                });
            return () => abortController.abort();
        },
        [tableName]
    );

    useEffect(() => {
        return requestFetchRows(startRowIndex, endRowIndex);
    }, [startRowIndex, endRowIndex, requestFetchRows]);

    useEffect(() => {
        if (webSocket === null) {
            // FIXME: Error handling
            throw "Error";
        }
        const listener: WebSocket["onmessage"] = (event) => {
            const message: WSMessage<TRow> = JSON.parse(event.data);
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
    };
}
