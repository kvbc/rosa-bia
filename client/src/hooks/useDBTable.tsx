//
// useDBTable.tsx
//

import { useCallback, useContext, useEffect, useState } from "react";
import { DB } from "../../../server/src/db/types";
// import Emittery from "emittery";
import WebSocketContext from "../contexts/WebSocketContext";
import {
    apiAddTableRow,
    apiDeleteTableRow,
    apiGetTableRows,
    apiUpdateTableRow,
} from "../api/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wsOnMessage } from "../api/ws";
import { Filter } from "../../../server/src/http/routes/table_rows/get";

export type DBTable<TRow extends DB.Row> = ReturnType<typeof useDBTable<TRow>>;

export default function useDBTable<TRow extends DB.Row>(
    tableName: DB.TableName,
    initFilters?: Filter[]
) {
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [rows, setRows] = useState<TRow[]>([]);
    const [startRowIndex, setStartRowIndex] = useState<number>(0);
    const [endRowIndex, setEndRowIndex] = useState<number | null>(null);
    const [filters, setFilters] = useState<Filter[]>(initFilters ?? []);
    const webSocket = useContext(WebSocketContext)!;
    const queryClient = useQueryClient();

    const rowsQuery = useQuery({
        queryKey: [
            "table_rows",
            tableName,
            startRowIndex,
            endRowIndex,
            filters,
        ],
        queryFn: () =>
            apiGetTableRows(tableName, startRowIndex, endRowIndex, filters),
    });

    useEffect(() => {
        const data = rowsQuery.data;
        if (data) {
            setRows(data.rows as TRow[]);
            setTotalRowCount(data.totalCount);
        }
    }, [rowsQuery.data]);

    const addRowMutation = useMutation({
        mutationFn: (newRow: TRow) => apiAddTableRow(tableName, newRow),
        onSuccess: (_, newRow) => {
            addRow(newRow);
            queryClient.invalidateQueries({
                queryKey: ["table_rows", tableName],
            });
        },
        onError: () => {
            setRows((rows) => [...rows]);
        },
    });

    const deleteRowMutation = useMutation({
        mutationFn: (rowID: number) => apiDeleteTableRow(tableName, rowID),
        onSuccess: (_, rowID) => {
            deleteRow(rowID);
            queryClient.invalidateQueries({
                queryKey: ["table_rows", tableName],
            });
        },
        onError: () => {
            setRows((rows) => [...rows]);
        },
    });

    const updateRowMutation = useMutation({
        mutationFn: (updatedRow: TRow) =>
            apiUpdateTableRow(tableName, updatedRow),
        onSuccess: (_, updatedRow) => {
            updateRow(updatedRow);
            queryClient.invalidateQueries({
                queryKey: ["table_rows", tableName],
            });
        },
        onError: () => {
            setRows((rows) => [...rows]);
        },
    });

    const isRowIDInRange = useCallback(
        (rowID: number): boolean => {
            if (endRowIndex !== null && rowID > endRowIndex) {
                return false;
            }
            return rowID > startRowIndex;
        },
        [startRowIndex, endRowIndex]
    );

    const addRow = useCallback(
        (newRow: TRow) => {
            setTotalRowCount((totalRowCount) => totalRowCount + 1);
            if (isRowIDInRange(newRow.id)) {
                setRows((rows) => [...rows, newRow]);
            }
        },
        [isRowIDInRange]
    );

    const deleteRow = useCallback(
        (rowID: number) => {
            setTotalRowCount((totalRowCount) => totalRowCount - 1);
            if (isRowIDInRange(rowID)) {
                setRows((rows) => rows.filter((row) => row.id !== rowID));
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

    useEffect(() => {
        return wsOnMessage<TRow>(webSocket, (message) => {
            if (message.tableName !== tableName) {
                return;
            }
            switch (message.type) {
                case "table row added":
                    addRow(message.tableRow);
                    break;
                case "table row deleted":
                    deleteRow(message.tableRow.id);
                    break;
                case "table row updated":
                    updateRow(message.tableRow);
                    break;
            }
        });
    }, [webSocket, addRow, deleteRow, updateRow, tableName]);

    return {
        tableName,
        totalRowCount,
        rows,
        startRowIndex,
        setStartRowIndex,
        endRowIndex,
        setEndRowIndex,
        rowsQuery,
        addRowMutation,
        deleteRowMutation,
        updateRowMutation,
        filters,
        setFilters,
    };
}
