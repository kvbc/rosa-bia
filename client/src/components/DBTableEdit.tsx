//
// DBTableEdit.tsx
// TableEdit component connected to the database
//
// 1
//

import { ComponentProps, useCallback, useMemo } from "react";
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
    defaultRow?: DBTableEditDefaultRow<TRow>;
    rows?: TRow[];
} & Omit<
    ComponentProps<typeof TableEdit<TRow>>,
    | "totalRowCount"
    | "rows"
    | "defaultRow"
    | "onRowAddClicked"
    | "onRowDeleteClicked"
    | "onRowsRangeChanged"
    | "setFilters"
    | "filters"
>) {
    const {
        totalRowCount,
        rows,
        // rowsQuery,
        addRowMutation,
        deleteRowMutation,
        updateRowMutation,
        setStartRowIndex,
        setEndRowIndex,
        topRowID,
        setFilters,
        filters,
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

    const stripClientRowKeys = useCallback((row: TRow): TDatabaseRow => {
        row = { ...row };
        Object.keys(row).forEach((key) => {
            if (key.startsWith("CLIENT_")) {
                delete row[key];
            }
        });
        return row;
    }, []);

    const handleRowAddClicked = useCallback(
        (row: TRow) => {
            const dbRow = stripClientRowKeys(row);
            addRowMutation.mutate(dbRow);
        },
        [addRowMutation, stripClientRowKeys]
    );

    const handleRowSaveClicked = useCallback(
        (row: TRow) => {
            const dbRow = stripClientRowKeys(row);
            updateRowMutation.mutate(dbRow);
        },
        [updateRowMutation, stripClientRowKeys]
    );

    const handleRowDeleteClicked = useCallback(
        (row: TRow) => {
            deleteRowMutation.mutate(row.id);
        },
        [deleteRowMutation]
    );

    // useEffect(() => {
    //     console.log(">>huh", rows);
    // }, [rows]);

    return (
        <TableEdit<TRow>
            // FIXME: as?
            rows={customRows ?? (rows as TRow[])}
            filters={filters}
            setFilters={setFilters}
            defaultRow={defaultRow}
            totalRowCount={totalRowCount}
            // isLoading={rowsQuery.isFetching}
            isLoading={false} // FIXME
            onRowAddClicked={handleRowAddClicked}
            onRowDeleteClicked={handleRowDeleteClicked}
            onRowSaveClicked={handleRowSaveClicked}
            onRowsRangeChanged={handleRowsRangeChanged}
            {...restTableEditProps}
        />
    );
}
