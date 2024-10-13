//
// DBTableEdit.tsx
// TableEdit component connected to update database rows
//
// TODO: Review
//

import React, { ComponentProps } from "react";
import TableEdit from "./TableEdit";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";
import useDBTable from "../hooks/useDBTable";

export default function DBTableEdit<TRow extends DBRow>({
    dbTableName,
    ...props
}: { dbTableName: DBTableName } & Omit<
    ComponentProps<typeof TableEdit<TRow>>,
    "totalRowCount" | "rows" | "onUpdateEntries"
>) {
    const dbTable = useDBTable<TRow>(dbTableName);
    return (
        <TableEdit
            rows={dbTable.rows}
            onRowAddClicked={dbTable.store.addRow}
            onRowDeleteClicked={dbTable.store.deleteRow}
            onRowSaveClicked={dbTable.store.updateRow}
            onRowsRangeChanged={(startIndex, endIndex) =>
                dbTable.setRowRange({ startIndex, endIndex })
            }
            totalRowCount={dbTable.store.totalRowCount}
            {...props}
        />
    );
}
