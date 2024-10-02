import axios from "axios";
import { DBEntry } from "../../../server/src/types";
import { DBEntries } from "../hooks/useDBEntriesStore";
import TableEdit from "./TableEdit";
import { useEffect, useState } from "react";
import { MyInputProps } from "./MyInput";
import {
    TableEditRowContentComponentType,
    TableEditRowInputProps,
} from "./TableEditRow";

export default function DBTableEdit<TEntry extends DBEntry>({
    endpoint,
    headers,
    dbEntries,
    entriesFilter,
    emptyEntry,
    rowInputsProps,
    showActionsHeader,
    RowContentComponent,
}: {
    endpoint: string;
    headers: string[];
    dbEntries: DBEntries<TEntry>;
    entriesFilter?: (entry: TEntry) => boolean;
    showActionsHeader?: boolean;

    emptyEntry: TEntry;
    rowInputsProps: TableEditRowInputProps<TEntry>[];
    RowContentComponent?: TableEditRowContentComponentType<TEntry>;
}) {
    const [entries, setEntries] = useState<TEntry[]>([
        ...dbEntries.entries,
        // { ...emptyEntry, id: dbEntries.nextInsertID },
        { ...emptyEntry },
    ]);

    useEffect(() => {
        setEntries([
            ...dbEntries.entries,
            // { ...emptyEntry, id: dbEntries.nextInsertID },
            { ...emptyEntry },
        ]);
    }, [dbEntries.entries]);

    const onEntryAddClicked = (entry: TEntry): void => {
        axios.post(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME + "/" + endpoint,
            entry
        );
    };

    const onEntryDeleteClicked = (entry: TEntry): void => {
        axios.delete(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                `/${endpoint}/${entry.id}`
        );
    };

    const onEntrySaveClicked = (entry: TEntry): void => {
        axios.put(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME + "/" + endpoint,
            entry
        );
    };

    return (
        <div className="db-table-edit w-full">
            <TableEdit
                entries={
                    entriesFilter ? entries.filter(entriesFilter) : entries
                }
                showActionsHeader={showActionsHeader}
                setEntries={setEntries}
                rowInputsProps={rowInputsProps}
                events={{
                    onEntryAddClicked,
                    onEntryDeleteClicked,
                    onEntrySaveClicked,
                }}
                headers={headers}
                RowContentComponent={RowContentComponent}
            />
        </div>
    );
}
