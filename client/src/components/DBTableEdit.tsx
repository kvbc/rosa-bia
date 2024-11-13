//
// DBTableEdit.tsx
// TableEdit component connected to the database
//
// 1
//

import React, { ComponentProps, useCallback, useMemo } from "react";
import { TableEdit } from "./table_edit/TableEdit";
import * as DB from "@shared/db";
import { DBTable } from "@/hooks/useDBTable";

export type DBTableEditDefaultRow<TRow extends DB.Row> = Omit<TRow, "id">;

export function DBTableEdit<
    TDatabaseRow extends DB.Row,
    TRow extends TDatabaseRow = TDatabaseRow
>({
    dbTable,
    defaultRow: defaultRowProp,
    rows: customRows,
    ...restTableEditProps
}: {
    dbTable: DBTable<TDatabaseRow>;
    defaultRow: DBTableEditDefaultRow<TRow>;
    rows?: TRow[];
} & Omit<
    ComponentProps<typeof TableEdit<TRow>>,
    | "totalRowCount"
    | "rows"
    | "defaultRow"
    | "onRowAddClicked"
    | "onRowDeleteClicked"
    | "onRowsRangeChanged"
>) {
    const {
        totalRowCount,
        rows,
        rowsQuery,
        addRowMutation,
        deleteRowMutation,
        updateRowMutation,
        setStartRowIndex,
        setEndRowIndex,
        topRowID,
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
        () => ({ ...defaultRowProp, id: topRowID + 1 } as TRow),
        [defaultRowProp, topRowID]
    );

    const handleRowAddClicked = useCallback(
        (row: TRow) => {
            addRowMutation.mutate(row);
        },
        [addRowMutation]
    );

    const handleRowSaveClicked = useCallback(
        (row: TRow) => {
            updateRowMutation.mutate(row);
        },
        [updateRowMutation]
    );

    const handleRowDeleteClicked = useCallback(
        (row: TRow) => {
            deleteRowMutation.mutate(row.id);
        },
        [deleteRowMutation]
    );

    return (
        <TableEdit<TRow>
            // FIXME: as?
            rows={customRows ?? (rows as TRow[])}
            defaultRow={defaultRow}
            totalRowCount={totalRowCount}
            isLoading={rowsQuery.isFetching}
            onRowAddClicked={handleRowAddClicked}
            onRowDeleteClicked={handleRowDeleteClicked}
            onRowSaveClicked={handleRowSaveClicked}
            onRowsRangeChanged={handleRowsRangeChanged}
            {...restTableEditProps}
        />
    );
}
