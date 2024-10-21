//
// DBTableEdit.tsx
// TableEdit component connected to update database rows
//

import React, {
    ComponentProps,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import TableEdit from "./TableEdit";
import { DBRow } from "../../../server/src/dbTypes";
import { DBTable } from "../hooks/useDBTable";
import { Stack } from "@mui/joy";
import DBTableEditFilters, { DBFilterRow } from "./DBTableEditFilters";
import { DBFilter } from "../../../server/src/types";

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
        setFilters,
    } = dbTable;

    const [filterRows, setFilterRows] = useState<DBFilterRow<TRow>[]>([]);

    const handleFilterRowAddClicked = useCallback(
        (filterRow: DBFilterRow<TRow>) => {
            setFilterRows((filterRows) => [...filterRows, filterRow]);
        },
        []
    );

    const handleFilterRowDeleteClicked = useCallback(
        (filterRow: DBFilterRow<TRow>) => {
            setFilterRows((filterRows) =>
                filterRows.filter((row) => row.id !== filterRow.id)
            );
        },
        []
    );

    const handleFilterRowSaveClicked = useCallback(
        (filterRow: DBFilterRow<TRow>) => {
            setFilterRows((filterRows) =>
                filterRows.map((row) =>
                    row.id === filterRow.id ? filterRow : row
                )
            );
        },
        []
    );

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

    useEffect(() => {
        setFilters(
            filterRows.map<DBFilter<TRow>>((row) => ({
                ...row,
                id: undefined,
            }))
        );
    }, [filterRows, setFilters]);

    return (
        <Stack>
            <DBTableEditFilters
                dbTable={dbTable}
                rows={filterRows}
                onRowAddClicked={handleFilterRowAddClicked}
                onRowDeleteClicked={handleFilterRowDeleteClicked}
                onRowSaveClicked={handleFilterRowSaveClicked}
            />
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
        </Stack>
    );
}
