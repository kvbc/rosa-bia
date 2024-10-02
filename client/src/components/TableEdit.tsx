import {
    Dispatch,
    HTMLAttributes,
    InputHTMLAttributes,
    SetStateAction,
} from "react";
import TableEditRow, {
    TableEditRowContentComponentType,
    TableEditRowEvents,
    TableEditRowInputProps,
} from "./TableEditRow";
import { MyInputProps } from "./MyInput";

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
    showActionsHeader,
    rowInputsProps,
    RowContentComponent,
}: {
    entries: TEntry[];
    headers: string[];
    showActionsHeader?: boolean;
    setEntries: Dispatch<SetStateAction<typeof entries>>;
    events: TableEditEvents<TEntry>;
    rowInputsProps: TableEditRowInputProps<TEntry>[];
    RowContentComponent?: TableEditRowContentComponentType<TEntry>;
}) {
    return (
        <table className="h-full w-full">
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
                            inputsProps={rowInputsProps}
                            ContentComponent={RowContentComponent}
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
