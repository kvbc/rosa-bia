import React, { useEffect, useState } from "react";
import useDBTableStore from "./useDBTableStore";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";
import { AbcOutlined } from "@mui/icons-material";

export default function useDBTable<TRow extends DBRow>(tableName: DBTableName) {
    const globalStore = useDBTableStore<TRow>(tableName);
    const [rows, setRows] = useState<TRow[]>([]);
    const [rowRange, setRowRange] = useState<{
        startIndex: number;
        endIndex: number;
    } | null>(null);

    const isRowIDInRange = (rowID: number): boolean => {
        if (rowRange)
            return rowID > rowRange.startIndex && rowID <= rowRange.endIndex;
        return true;
    };

    useEffect(() => {
        const offs = [
            globalStore.eventEmitter.on("rowAdded", (addedRow) => {
                if (!isRowIDInRange(addedRow.id)) return;
                setRows((rows) => [...rows, addedRow]);
            }),
            globalStore.eventEmitter.on("rowDeleted", (deletedRow) => {
                if (!isRowIDInRange(deletedRow.id)) return;
                setRows((rows) =>
                    rows.filter((row) => row.id !== deletedRow.id)
                );
            }),
            globalStore.eventEmitter.on("rowUpdated", (updatedRow) => {
                if (!isRowIDInRange(updatedRow.id)) return;
                setRows((rows) =>
                    rows.map((row) =>
                        row.id === updatedRow.id ? updatedRow : row
                    )
                );
            }),
        ];
        return () => {
            offs.forEach((off) => off());
        };
    }, []);

    useEffect(() => {
        if (!rowRange) return;
        const { abort, promise } = globalStore.fetchRows(
            rowRange.startIndex,
            rowRange.endIndex
        );
        promise.then((rows) => setRows(rows));
        return abort;
    }, [rowRange]);

    return {
        globalStore,
        rows,
        rowRange,
        setRowRange,
    };
}
