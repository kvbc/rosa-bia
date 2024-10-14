//
// DBTableEdit.tsx
// TableEdit component connected to update database rows
//

import React, { ComponentProps, useCallback, useMemo } from "react";
import TableEdit from "./TableEdit";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";
import useDBTable from "../hooks/useDBTable";

export default function DBTableEdit<TRow extends DBRow>({
    dbTableName,
    emptyRow: _emptyRow,
    ...props
}: { dbTableName: DBTableName; emptyRow: TRow } & Omit<
    ComponentProps<typeof TableEdit<TRow>>,
    "totalRowCount" | "rows" | "onUpdateEntries" | "emptyRow"
>) {
    const {
        store,
        rows,
        rowRange: _rowRange,
        setRowRange,
    } = useDBTable<TRow>(dbTableName);

    const handleRowsRangeChanged = useCallback(
        (startIndex: number, endIndex: number) =>
            setRowRange({ startIndex, endIndex }),
        [setRowRange]
    );

    // FIXME: store doesnt change since its a constant
    const emptyRow = useMemo(
        () => ({ ..._emptyRow, id: store.totalRowCount + 1 }),
        [_emptyRow, store]
    );

    return (
        <TableEdit
            rows={rows}
            emptyRow={emptyRow}
            totalRowCount={store.totalRowCount}
            onRowAddClicked={store.addRow}
            onRowDeleteClicked={store.deleteRow}
            onRowSaveClicked={store.updateRow}
            onRowsRangeChanged={handleRowsRangeChanged}
            {...props}
        />
    );
}
