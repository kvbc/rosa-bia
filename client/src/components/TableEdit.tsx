import {
    createContext,
    InputHTMLAttributes,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
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

export type TableEditActionType = "delete" | "add" | "save";
export type TableEditAction<TEntry extends TableEditEntry> = {
    type: TableEditActionType;
    entry: TEntry;
};

const TableEditHistoryContext = createContext<number | null>(null);

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
    // if (editable === false) showActionsHeader = false;

    const [entries, setEntries] = useState<TEntry[]>([
        ..._entries,
        { ...emptyEntry },
    ]);
    const [actionHistory, setActionHistory] = useState<
        TableEditAction<TEntry>[]
    >([]);
    const commitHistoryNumber = useContext(TableEditHistoryContext);
    const [outCommitHistoryNumber, setOutCommitHistoryNumber] =
        useState<number>(1);

    useEffect(() => {
        setEntries([..._entries, { ...emptyEntry }]);
    }, [_entries]);

    const registerAction = (action: TableEditAction<TEntry>) => {
        setActionHistory((actionHistory) => [...actionHistory, action]);
    };

    const commitActionHistory = useCallback(() => {
        actionHistory.forEach((action) => {
            switch (action.type) {
                case "add"    : events?.onEntryAddClicked?.(action.entry); break; // prettier-ignore
                case "delete" : events?.onEntryDeleteClicked?.(action.entry); break; // prettier-ignore
                case "save"   : events?.onEntrySaveClicked?.(action.entry); break; // prettier-ignore
            }
        });
        setActionHistory([]);
    }, [actionHistory]);

    useEffect(() => {
        if (commitHistoryNumber) {
            commitActionHistory();
        }
    }, [commitHistoryNumber]);

    // useEffect(() => {
    //     if (commitHistoryEvent) {
    //         return commitHistoryEvent.on("commit", commitActionHistory);
    //     }
    // }, [commitHistoryEvent]);

    const handleEntryAdded = (entry: TEntry) => {
        setEntries([...entries, { ...emptyEntry, id: entries.length + 100 }]);
        if (commitHistoryNumber) {
            registerAction({ type: "add", entry });
        } else {
            // commitHistoryNumberEmitter.emit("commit");
            setOutCommitHistoryNumber(
                (outCommitHistoryNumber) => outCommitHistoryNumber + 1
            );
            events?.onEntryAddClicked?.(entry);
        }
    };

    const handleEntrySaved = (entry: TEntry) => {
        if (commitHistoryNumber) {
            registerAction({ type: "save", entry });
        } else {
            // commitHistoryNumberEmitter.emit("commit");
            setOutCommitHistoryNumber(
                (outCommitHistoryNumber) => outCommitHistoryNumber + 1
            );
            events?.onEntrySaveClicked?.(entry);
        }
    };

    const handleEntryDeleted = (entry: TEntry) => {
        setEntries(entries.filter((fEntry) => fEntry.id !== entry.id));
        if (commitHistoryNumber) {
            registerAction({ type: "delete", entry });
        } else {
            events?.onEntryDeleteClicked?.(entry);
        }
    };

    const setEntry = (newEntry: TEntry) => {
        setEntries(
            entries.map((entry) =>
                entry.id === newEntry.id ? newEntry : entry
            )
        );
    };

    return (
        <table className="w-full">
            <thead>
                <tr>
                    {headers.length === 1 ? (
                        <th colSpan={2}>{headers[0]}</th>
                    ) : (
                        headers.map((header) => <th>{header}</th>)
                    )}
                    {/* {showActionsHeader && <th>Akcje</th>} */}
                </tr>
            </thead>
            <tbody className="h-full">
                <TableEditHistoryContext.Provider
                    value={outCommitHistoryNumber}
                >
                    {entries
                        .slice(0, editable ? entries.length : -1)
                        .map((entry, entryIndex) => {
                            const entryEvents: TableEditRowEvents = {
                                onDeleteClicked: () => handleEntryDeleted(entry), // prettier-ignore
                                onSaveClicked: () => handleEntrySaved(entry), // prettier-ignore
                            };
                            if (entryIndex === entries.length - 1) {
                                // last entry (use for adding)
                                entryEvents.onAddClicked = () => handleEntryAdded(entry); // prettier-ignore
                            }
                            return (
                                <TableEditRow
                                    key={entry.id}
                                    entry={entry}
                                    events={entryEvents}
                                    editable={editable}
                                    inputsProps={rowInputsProps}
                                    ContentComponent={RowContentComponent}
                                    setEntry={setEntry}
                                />
                            );
                        })}
                </TableEditHistoryContext.Provider>
            </tbody>
        </table>
    );
}
