import {
    Dispatch,
    HTMLAttributes,
    InputHTMLAttributes,
    SetStateAction,
} from "react";
import TableEditRow, {
    TableEditRowEvents,
    TableEditRowInputInfo,
} from "./TableEditRow";

export type TableEditEntry = {
    id: number;
    [key: string]: InputHTMLAttributes<any>["value"];
};

export type TableEditEvents<TEntry extends TableEditEntry> = {
    onEntryDeleteClicked?: (entry: TEntry) => void;
    onEntryAddClicked?: (entry: TEntry) => void;
    onEntrySaveClicked?: (entry: TEntry) => void;
};

export default function TableEdit<TEntry extends TableEditEntry>({
    entries,
    setEntries,
    events,
    headers,
    rowInputInfos,
}: {
    entries: TEntry[];
    headers: string[];
    setEntries: Dispatch<SetStateAction<typeof entries>>;
    events: TableEditEvents<TEntry>;
    rowInputInfos: TableEditRowInputInfo<TEntry>[];
}) {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th>{header}</th>
                    ))}
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry) => {
                    const entryEvents: TableEditRowEvents = {
                        onDeleteClicked: () =>
                            events.onEntryDeleteClicked?.(entry),
                        onSaveClicked: () => events.onEntrySaveClicked?.(entry),
                    };
                    if (entry === entries.at(-1)) {
                        // last entry (use for adding)
                        entryEvents.onAddClicked = () =>
                            events.onEntryAddClicked?.(entry);
                    }
                    return (
                        <TableEditRow
                            key={entry.id}
                            entry={entry}
                            events={entryEvents}
                            inputInfos={rowInputInfos}
                            setEntry={(newEntry) => {
                                setEntries((entries) =>
                                    entries.map((entry) =>
                                        entry.id === newEntry.id
                                            ? newEntry
                                            : entry
                                    )
                                );
                            }}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}
