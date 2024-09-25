import axios from "axios";
import { DBEntry } from "../../../server/src/types";
import { DBEntries } from "../hooks/useDBEntriesStore";
import TableEdit from "./TableEdit";
import { ComponentType, useEffect, useState } from "react";
import { TableEditRowInputInfo } from "./TableEditRow";

export default function DBTableEdit<TEntry extends DBEntry>({
    endpoint,
    headers,
    dbEntries,
    emptyEntry,
    rowInputInfos,
}: {
    endpoint: string;
    headers: string[];
    dbEntries: DBEntries<TEntry>;
    emptyEntry: TEntry;
    rowInputInfos: TableEditRowInputInfo<TEntry>[];
}) {
    const [entries, setEntries] = useState<TEntry[]>([
        ...dbEntries.entries,
        { ...emptyEntry },
    ]);

    useEffect(() => {
        setEntries([...dbEntries.entries, { ...emptyEntry }]);
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
        <div className="db-table-edit">
            <TableEdit
                entries={entries}
                setEntries={setEntries}
                rowInputInfos={rowInputInfos}
                events={{
                    onEntryAddClicked,
                    onEntryDeleteClicked,
                    onEntrySaveClicked,
                }}
                headers={headers}
            />
        </div>
    );
}
