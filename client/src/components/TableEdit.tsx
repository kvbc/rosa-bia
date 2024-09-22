import { ComponentType, Dispatch, SetStateAction } from "react";
import TableEditRow, {
    TableEditRowContentProps,
    TableEditRowEvents,
} from "./TableEditRow";

export type TableEditEntry = {
    id: number;
};

export type TableEditEvents<TEntry extends TableEditEntry> = {
    onEntryDeleteClicked?: (entry: TEntry) => void;
    onEntryAddClicked?: (entry: TEntry) => void;
    onEntrySaveClicked?: (entry: TEntry) => void;
};

export default function TableEdit<TEntry extends TableEditEntry>({
    headers,
    entries,
    setEntries,
    events,
    rowContentElement: RowContentElement,
}: {
    entries: TEntry[];
    setEntries: Dispatch<SetStateAction<typeof entries>>;
    headers: string[];
    events: TableEditEvents<TEntry>;
    rowContentElement: ComponentType<TableEditRowContentProps<TEntry>>;
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
                            rowContentElement={RowContentElement}
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
