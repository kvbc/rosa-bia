import { ComponentProps } from "react";
import TableEdit from "./TableEdit";
import { DBEntries } from "../hooks/useDBEntriesStore";
import { DBRow } from "../../../server/src/dbTypes";

export default function DBTableEdit<TEntry extends DBRow>({
    dbEntries,
    // emptyEntry,
    showFooter,
    ...props
}: { dbEntries: DBEntries<TEntry>; showFooter?: boolean } & Omit<
    ComponentProps<typeof TableEdit<TEntry>>,
    "totalEntryCount"
>) {
    return (
        <TableEdit
            entries={dbEntries.entries}
            events={{
                onEntryAddClicked: dbEntries.addEntry,
                onEntryDeleteClicked: dbEntries.deleteEntry,
                onEntrySaveClicked: dbEntries.saveEntry,
            }}
            totalEntryCount={dbEntries.entryCount}
            onUpdateEntries={
                showFooter === false ? undefined : dbEntries.fetchEntries
            }
            // emptyEntry={{ ...emptyEntry, id: dbEntries.entryCount + 1 }}
            {...props}
        />
    );
}
