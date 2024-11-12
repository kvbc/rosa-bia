//
// DBTableEdit.tsx
// TableEdit component connected to the database
//
// 1
//

import React, { ComponentProps, useCallback, useMemo } from "react";
import { TableEdit } from "./table_edit/TableEdit";
import { DB } from "../../../server/src/db/types";
import { DBTable } from "../hooks/useDBTable";

export type DBTableEditDefaultRow<TRow extends DB.Row> = Omit<TRow, "id">;

export function DBTableEdit<TRow extends DB.Row>({
    dbTable,
    defaultRow: defaultRowProp,
    rows: customRows,
    ...restTableEditProps
}: {
    dbTable: DBTable<TRow>;
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

    // useEffect(() => {
    //     console.log(defaultRow);
    // }, [defaultRow]);

    return (
        <TableEdit
            rows={customRows ?? rows}
            defaultRow={defaultRow}
            totalRowCount={totalRowCount}
            isLoading={rowsQuery.isFetching}
            onRowAddClicked={addRowMutation.mutate}
            onRowDeleteClicked={(row) => deleteRowMutation.mutate(row.id)}
            onRowSaveClicked={updateRowMutation.mutate}
            onRowsRangeChanged={handleRowsRangeChanged}
            {...restTableEditProps}
        />
    );
}
