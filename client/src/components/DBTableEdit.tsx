import { ComponentProps } from "react";
import TableEdit from "./TableEdit";
import { DBEntries } from "../hooks/useDBEntriesStore";
import { DBEntry } from "../../../server/src/types";

export default function DBTableEdit<TEntry extends DBEntry>({
    dbEntries,
    ...props
}: { dbEntries: DBEntries<TEntry> } & ComponentProps<
    typeof TableEdit<TEntry>
>) {
    return (
        <TableEdit
            entries={dbEntries.entries}
            events={{
                onEntryAddClicked: dbEntries.addEntry,
                onEntryDeleteClicked: dbEntries.deleteEntry,
                onEntrySaveClicked: dbEntries.saveEntry,
            }}
            {...props}
        />
    );
}
