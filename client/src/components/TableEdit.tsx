import { InputHTMLAttributes, useEffect, useState } from "react";
import TableEditRow, {
    TableEditRowContentComponentType,
    TableEditRowEvents,
    TableEditRowInputProps,
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
    entries: _entries,
    events,
    emptyEntry,
    headers,
    showActionsHeader,
    rowInputsProps,
    editable,
    RowContentComponent,
}: {
    entries?: TEntry[];
    headers: string[];
    emptyEntry: TEntry;
    editable?: boolean;
    showActionsHeader?: boolean;
    events?: TableEditEvents<TEntry>;
    rowInputsProps: TableEditRowInputProps<TEntry>[];
    RowContentComponent?: TableEditRowContentComponentType<TEntry>;
}) {
    if (!_entries) throw "Error";
    if (editable === undefined) editable = true;

    const [entries, setEntries] = useState<TEntry[]>([
        ..._entries,
        { ...emptyEntry },
    ]);

    useEffect(() => {
        setEntries([..._entries, { ...emptyEntry }]);
    }, [_entries]);

    return (
        <table className="w-full border-gray-500 border-2 p-3">
            <thead>
                <tr>
                    {headers.length === 1 ? (
                        <th colSpan={1 + (showActionsHeader ? 0 : 1)}>
                            {headers[0]}
                        </th>
                    ) : (
                        headers.map((header) => <th>{header}</th>)
                    )}
                    {showActionsHeader && <th>Akcje</th>}
                </tr>
            </thead>
            <tbody>
                {/* 
                
                TODO: ADD CHANGE HISTORY and commit
                
                */}
                {entries.map((entry, entryIndex) => {
                    const entryEvents: TableEditRowEvents = {
                        onDeleteClicked: () => {
                            setEntries(
                                entries.filter(
                                    (fEntry) => fEntry.id !== entry.id
                                )
                            );
                            events?.onEntryDeleteClicked?.(entry);
                        },
                        onSaveClicked: () => {
                            events?.onEntrySaveClicked?.(entry);
                        },
                    };
                    if (entryIndex === entries.length - 1) {
                        // last entry (use for adding)
                        console.log(entry, entryIndex, "/", entries.length);
                        entryEvents.onAddClicked = () => {
                            setEntries([
                                ...entries,
                                { ...emptyEntry, id: entries.length + 1 },
                            ]);
                            events?.onEntryAddClicked?.(entry);
                        };
                    }
                    return (
                        <TableEditRow
                            key={entry.id}
                            entry={entry}
                            events={entryEvents}
                            editable={editable}
                            inputsProps={rowInputsProps}
                            ContentComponent={RowContentComponent}
                            setEntry={(newEntry: TEntry) => {
                                setEntries(
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
