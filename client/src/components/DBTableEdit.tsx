//
// DBTableEdit.tsx
// TableEdit component connected to update database rows
//

import React, { ComponentProps, useCallback, useMemo } from "react";
import TableEdit from "./TableEdit";
import { DBRow } from "../../../server/src/dbTypes";
import { DBTable } from "../hooks/useDBTable";

export type DBTableEditDefaultRow<TRow extends DBRow> = Omit<TRow, "id">;

export default function DBTableEdit<TRow extends DBRow>({
    dbTable,
    defaultRow: _defaultRow,
    rows: customRows,
    ...props
}: {
    dbTable: DBTable<TRow>;
    defaultRow: DBTableEditDefaultRow<TRow>;
    rows?: TRow[];
} & Omit<
    ComponentProps<typeof TableEdit<TRow>>,
    "totalRowCount" | "rows" | "defaultRow"
>) {
    const {
        totalRowCount,
        rows,
        requestAddRow,
        requestDeleteRow,
        requestUpdateRow,
        setStartRowIndex,
        setEndRowIndex,
    } = dbTable;

    const handleRowsRangeChanged = useCallback(
        (startIndex: number, endIndex: number) => {
            setStartRowIndex(startIndex);
            setEndRowIndex(endIndex);
        },
        [setStartRowIndex, setEndRowIndex]
    );

    const defaultRow = useMemo<TRow>(
        // FIXME: as?
        () => ({ ..._defaultRow, id: totalRowCount + 1 } as TRow),
        [_defaultRow, totalRowCount]
    );

    return (
        <TableEdit
            rows={customRows ?? rows}
            defaultRow={defaultRow}
            totalRowCount={totalRowCount}
            onRowAddClicked={requestAddRow}
            onRowDeleteClicked={requestDeleteRow}
            onRowSaveClicked={requestUpdateRow}
            onRowsRangeChanged={handleRowsRangeChanged}
            {...props}
        />
    );
}
