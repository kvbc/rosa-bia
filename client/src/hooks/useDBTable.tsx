import { useEffect, useState } from "react";
import useDBTableStore from "./useDBTableStore";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";

export default function useDBTable<TRow extends DBRow>(tableName: DBTableName) {
    const store = useDBTableStore<TRow>(tableName);
    const [rows, setRows] = useState<TRow[]>([]);
    const [rowRange, setRowRange] = useState<{
        startIndex: number;
        endIndex: number;
    } | null>(null);

    useEffect(() => {
        const isRowIDInRange = (rowID: number): boolean => {
            if (rowRange)
                return (
                    rowID > rowRange.startIndex && rowID <= rowRange.endIndex
                );
            return true;
        };

        const offs = [
            store.eventEmitter.on("rowAdded", (addedRow) => {
                if (!isRowIDInRange(addedRow.id)) return;
                setRows((rows) => [...rows, addedRow]);
            }),
            store.eventEmitter.on("rowDeleted", (deletedRow) => {
                if (!isRowIDInRange(deletedRow.id)) return;
                setRows((rows) =>
                    rows.filter((row) => row.id !== deletedRow.id)
                );
            }),
            store.eventEmitter.on("rowUpdated", (updatedRow) => {
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
    }, [store.eventEmitter, rowRange]);

    useEffect(() => {
        if (!rowRange) return;
        return store.fetchRows(rowRange.startIndex, rowRange.endIndex, setRows);
    }, [rowRange, store]);

    return {
        store,
        rows,
        rowRange,
        setRowRange,
    };
}
