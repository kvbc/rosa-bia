//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//
// TODO: Review
//

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
    TableEditRowContext,
    TableEditRowEvents,
    TableEditRowProps,
    TableEditRowState,
} from "./TableEditRow";
import Table from "@mui/joy/Table";
import Tooltip from "@mui/joy/Tooltip";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import Select from "@mui/joy/Select";
import Typography from "@mui/joy/Typography";
import FormLabel from "@mui/joy/FormLabel";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { SxProps } from "@mui/material";

export type TableEditEntry = {
    id: number;
    [key: string]: InputHTMLAttributes<any>["value"] | boolean;
};

export type TableEditHeader = {
    name: string;
    width?: string;
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
    headersClassName,
    title,
    totalEntryCount,
    onUpdateEntries,
    RowContentComponent,
    rowActionTDClassName,
}: {
    entries?: TEntry[];
    headers: (TableEditHeader | string)[];
    totalEntryCount: number;
    emptyEntry: TEntry;
    headersClassName?: string;
    editable?: boolean;
    title?: string;
    rowActionTDClassName?: string;
    onUpdateEntries?: (startRowIndex: number, endRowIndex: number) => void;
    showActionsHeader?: boolean;
    events?: TableEditEvents<TEntry>;
    rowInputsProps: TableEditRowProps<TEntry>["inputsProps"];
    RowContentComponent?: TableEditRowContentComponentType<TEntry>;
}) {
    if (!_entries) throw "Error";
    if (editable === undefined) editable = true;
    if (showActionsHeader === undefined) showActionsHeader = true;
    if (editable === false) showActionsHeader = false;

    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const [entries, setEntries] = useState<TEntry[]>([
        ..._entries,
        { ...emptyEntry },
    ]);
    const [actionHistory, setActionHistory] = useState<
        TableEditAction<TEntry>[]
    >([]);
    const commitHistoryNumber = useContext(TableEditHistoryContext);
    const tableEditRowContext = useContext(TableEditRowContext);
    const [outCommitHistoryNumber, setOutCommitHistoryNumber] =
        useState<number>(1);
    const pageCount = Math.ceil(totalEntryCount / rowsPerPage);
    const startRowIndex = (page - 1) * rowsPerPage;
    const endRowIndex = page * rowsPerPage;

    if (tableEditRowContext) {
        editable = [
            TableEditRowState.Editing,
            TableEditRowState.Adding,
        ].includes(tableEditRowContext.rowState);
    }

    useEffect(() => {
        if (onUpdateEntries) onUpdateEntries(startRowIndex, endRowIndex);
    }, [startRowIndex, endRowIndex]);

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
        setEntries((entries) =>
            entries.map((entry) =>
                entry.id === newEntry.id ? newEntry : entry
            )
        );
    };

    const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
        setRowsPerPage(parseInt(newValue!.toString(), 10));
        setPage(1);
    };

    const bodyContent = entries
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
                    actionTDClassName={rowActionTDClassName}
                    key={entry.id}
                    entry={entry}
                    events={entryEvents}
                    editable={editable}
                    inputsProps={rowInputsProps}
                    ContentComponent={RowContentComponent}
                    setEntry={setEntry}
                />
            );
        });

    return (
        <Table
            variant="outlined"
            size="sm"
            borderAxis="bothBetween"
            stickyFooter
            stickyHeader
            // sx={{ width: "inherit" }}
        >
            {title && <caption>{title}</caption>}
            <thead>
                <tr>
                    {/* {headers.length === 1 ? (
                        <th colSpan={3}>{headers[0]}</th>
                    ) : ( */}
                    <>
                        {headers.map((header) => {
                            let name,
                                width = "inherit";
                            if (typeof header === "string") name = header;
                            else {
                                name = header.name;
                                width = header.width ?? "inherit";
                            }
                            return (
                                <Tooltip title={name} variant="soft">
                                    <th
                                        style={{ width }}
                                        className={headersClassName}
                                    >
                                        {name}
                                    </th>
                                </Tooltip>
                            );
                        })}
                        {showActionsHeader && (
                            <th
                                className={headersClassName}
                                style={{
                                    width: "70px",
                                }}
                            >
                                Akcje
                            </th>
                        )}
                    </>
                    {/* )} */}
                </tr>
            </thead>
            <tbody>
                {commitHistoryNumber ? (
                    bodyContent
                ) : (
                    <TableEditHistoryContext.Provider
                        value={outCommitHistoryNumber}
                    >
                        {bodyContent}
                    </TableEditHistoryContext.Provider>
                )}
            </tbody>
            {onUpdateEntries && (
                <tfoot>
                    <tr>
                        <td colSpan={headers.length + 2}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <FormControl orientation="horizontal" size="sm">
                                    <FormLabel>Wyniki na stronę:</FormLabel>
                                    <Select
                                        onChange={handleChangeRowsPerPage}
                                        value={rowsPerPage}
                                    >
                                        <Option value={25}>25</Option>
                                        <Option value={50}>50</Option>
                                        <Option value={100}>100</Option>
                                        <Option value={250}>250</Option>
                                        <Option value={500}>500</Option>
                                    </Select>
                                    <FormLabel sx={{ paddingLeft: "4px" }}>
                                        z {totalEntryCount}
                                    </FormLabel>
                                </FormControl>
                                <Typography
                                    sx={{ textAlign: "center", minWidth: 20 }}
                                >
                                    {page} / {pageCount} ({startRowIndex + 1}-
                                    {endRowIndex})
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={page === 1}
                                        onClick={() =>
                                            setPage((page) => page - 1)
                                        }
                                        sx={{ bgcolor: "background.surface" }}
                                    >
                                        <KeyboardArrowLeftIcon />
                                    </IconButton>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={page === pageCount}
                                        onClick={() =>
                                            setPage((page) => page + 1)
                                        }
                                        sx={{ bgcolor: "background.surface" }}
                                    >
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                </tfoot>
            )}
        </Table>
    );
}
