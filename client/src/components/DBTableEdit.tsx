//
// DBTableEdit.tsx
// TableEdit component connected to update database rows
//
// TODO: Review
//

import { ComponentProps } from "react";
import TableEdit from "./TableEdit";
import { DBTableStore } from "../hooks/useDBTableStore";
import { DBRow, DBTableName } from "../../../server/src/dbTypes";

export default function DBTableEdit<TEntry extends DBRow>({
    dbTableName,
    // emptyEntry,
    showFooter,
    ...props
}: { dbTableName: DBTableName; showFooter?: boolean } & Omit<
    ComponentProps<typeof TableEdit<TEntry>>,
    "totalEntryCount"
>) {
    return (
        <TableEdit
            entries={dbEntries.rows}
            events={{
                onEntryAddClicked: dbEntries.addRow,
                onEntryDeleteClicked: dbEntries.deleteRow,
                onEntrySaveClicked: dbEntries.saveRow,
            }}
            totalEntryCount={dbEntries.totalRowCount}
            onUpdateEntries={
                showFooter === false ? undefined : dbEntries.fetchRows
            }
            // emptyEntry={{ ...emptyEntry, id: dbEntries.entryCount + 1 }}
            {...props}
        />
    );
}
