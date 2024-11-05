//
// DBTableEdit.tsx
// TableEdit component connected to update database rows
//

import React, { ComponentProps, useCallback, useMemo } from "react";
import TableEdit from "./table_edit/TableEdit";
import { DB } from "../../../server/src/db/types";
import { DBTable } from "../hooks/useDBTable";
import { Stack } from "@chakra-ui/react";

export type DBTableEditDefaultRow<TRow extends DB.Row> = Omit<TRow, "id">;

export default function DBTableEdit<TRow extends DB.Row>({
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
        addRowMutation,
        deleteRowMutation,
        updateRowMutation,
        setStartRowIndex,
        setEndRowIndex,
        topRowID,
    } = dbTable;

    // const [filterRows, setFilterRows] = useState<DBFilterRow<TRow>[]>([]);

    // const handleFilterRowAddClicked = useCallback(
    //     (filterRow: DBFilterRow<TRow>) => {
    //         setFilterRows((filterRows) => [...filterRows, filterRow]);
    //     },
    //     []
    // );

    // const handleFilterRowDeleteClicked = useCallback(
    //     (filterRow: DBFilterRow<TRow>) => {
    //         setFilterRows((filterRows) =>
    //             filterRows.filter((row) => row.id !== filterRow.id)
    //         );
    //     },
    //     []
    // );

    // const handleFilterRowSaveClicked = useCallback(
    //     (filterRow: DBFilterRow<TRow>) => {
    //         setFilterRows((filterRows) =>
    //             filterRows.map((row) =>
    //                 row.id === filterRow.id ? filterRow : row
    //             )
    //         );
    //     },
    //     []
    // );

    const handleRowsRangeChanged = useCallback(
        (startIndex: number, endIndex: number) => {
            setStartRowIndex(startIndex);
            setEndRowIndex(endIndex);
        },
        [setStartRowIndex, setEndRowIndex]
    );

    const defaultRow = useMemo<TRow>(
        // FIXME: as?
        () => ({ ..._defaultRow, id: topRowID + 1 } as TRow),
        [_defaultRow, topRowID]
    );

    // useEffect(() => {
    //     setFilters(
    //         filterRows.map<DBFilter<TRow>>((row) => ({
    //             ...row,
    //             id: undefined,
    //         }))
    //     );
    // }, [filterRows, setFilters]);

    return (
        <Stack>
            {/* <DBTableEditFilters
                dbTable={dbTable}
                rows={filterRows}
                onRowAddClicked={handleFilterRowAddClicked}
                onRowDeleteClicked={handleFilterRowDeleteClicked}
                onRowSaveClicked={handleFilterRowSaveClicked}
            /> */}
            <TableEdit
                rows={customRows ?? rows}
                defaultRow={defaultRow}
                totalRowCount={totalRowCount}
                onRowAddClicked={addRowMutation.mutate}
                onRowDeleteClicked={(row) => deleteRowMutation.mutate(row.id)}
                onRowSaveClicked={updateRowMutation.mutate}
                onRowsRangeChanged={handleRowsRangeChanged}
                {...props}
            />
        </Stack>
    );
}
