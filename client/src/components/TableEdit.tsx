//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//
// TODO: Revisit this shit ong
//

import React, {
    ComponentProps,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import TableEditRow, { TableEditRowStateContext } from "./TableEditRow";
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

export type TableEditRowType = {
    id: number;
    [key: string]: unknown;
};

const TableEditContext = createContext<EventTarget | null>(null);

// TODO: Use only one context
export default function TableEdit<TRow extends TableEditRowType>({
    rows: _rows,
    defaultRow,
    headers,
    rowInputsProps,
    onRowDeleteClicked,
    onRowAddClicked,
    onRowSaveClicked,
    onRowsRangeChanged,
    totalRowCount,
    editable,
    rowActionButtonOrientation,
    RowContentComponent,
}: {
    rows: TRow[];
    headers: (
        | {
              name: string;
              width?: string;
          }
        | string
    )[];
    totalRowCount: number;
    defaultRow: TRow;
    editable?: boolean;
    onRowDeleteClicked?: (row: TRow) => void;
    onRowAddClicked?: (row: TRow) => void;
    onRowSaveClicked?: (row: TRow) => void;
    onRowsRangeChanged?: (startRowIndex: number, endRowIndex: number) => void;
    rowActionButtonOrientation?: ComponentProps<typeof TableEditRow<TRow>>["actionButtonOrientation"]; // prettier-ignore
    rowInputsProps: ComponentProps<typeof TableEditRow<TRow>>["inputsProps"];
    RowContentComponent?: ComponentProps<typeof TableEditRow<TRow>>["ContentComponent"]; // prettier-ignore
}) {
    if (editable === undefined) {
        editable = true;
    }

    // revertRows - rows used to revert the changes made to the table if this table is inside of any other table
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const [rows, setRows] = useState<TRow[]>(_rows);
    const [revertRows, setRevertRows] = useState<TRow[]>(_rows); // prettier-ignore
    const [addRow, setAddRow] = useState<TRow>({
        ...defaultRow,
        id: -1 - rows.length,
    });
    const [eventTarget] = useState(new EventTarget());
    const upperTableEventTarget = useContext(TableEditContext);
    const upperRowState = useContext(TableEditRowStateContext);

    // const upperTableEditRowContext = useContext(TableEditRowContext);
    const pageCount = Math.ceil(totalRowCount / rowsPerPage);
    const startRowIndex = (page - 1) * rowsPerPage;
    const endRowIndex = page * rowsPerPage;

    useEffect(() => {
        onRowsRangeChanged?.(startRowIndex, endRowIndex);
    }, [onRowsRangeChanged, startRowIndex, endRowIndex]);

    useEffect(() => {
        setAddRow({ ...defaultRow, id: -1 - rows.length }); // just so id is unique
    }, [defaultRow, rows.length]);

    //
    // If this TableEdit is inside of another TableEditRow,
    // depend it's 'editable' property on this row
    //
    // useEffect(() => {
    //     return upperTableEditRowContext?.eventEmitter.on(
    //         "stateChanged",
    //         (state) => {
    //             setEditable(state === "editing" || state === "adding");
    //         }
    //     );
    // }, [upperTableEditRowContext]);

    // if (editableProp) {
    //     headers = [
    //         ...headers,
    //         {
    //             name: "Akcje",
    //             width: "70px",
    //         },
    //     ];
    // }

    useEffect(() => {
        setRevertRows(_rows);
        setRows(_rows);
    }, [_rows]);

    const commitChanges = useCallback(() => {
        // rowEventTarget.dispatchEvent(new Event("forceSave"));
        // console.log("yes 2", rows);

        let anyChanges = false;
        rows.forEach((row) => {
            const rrow = revertRows.find((rrow) => rrow.id === row.id);
            if (rrow) {
                if (rrow !== row) {
                    onRowSaveClicked?.(row);
                    anyChanges = true;
                }
            } else {
                onRowAddClicked?.(row);
                anyChanges = true;
            }
        });
        revertRows.forEach((rrow) => {
            if (!rows.find((row) => row.id === rrow.id)) {
                onRowDeleteClicked?.(rrow);
                anyChanges = true;
            }
        });
        if (anyChanges) {
            // setRevertRows(rows);
            setRevertRows([...rows]);
        }
        eventTarget.dispatchEvent(new Event("changesCommited"));
    }, [
        onRowAddClicked,
        onRowSaveClicked,
        onRowDeleteClicked,
        revertRows,
        rows,
        eventTarget,
    ]);

    const cancelChanges = useCallback(() => {
        setRows([...revertRows]);
        // setRows(revertRows);
        eventTarget.dispatchEvent(new Event("changesCanceled"));
    }, [revertRows, eventTarget]);

    // useEffect(() => {
    //     commitChanges();
    // }, [commitChanges, rows]);

    useEffect(() => {
        if (upperTableEventTarget) {
            upperTableEventTarget.addEventListener('changesCommited', commitChanges); // prettier-ignore
            upperTableEventTarget.addEventListener('changesCanceled', cancelChanges); // prettier-ignore
            return () => {
                upperTableEventTarget.removeEventListener('changesCommited', commitChanges); // prettier-ignore
                upperTableEventTarget.removeEventListener('changesCanceled', cancelChanges); // prettier-ignore
            };
        }
    }, [upperTableEventTarget, commitChanges, cancelChanges]);

    // FIXME: emittery not work on rerender :( (event emits when it just offed)
    // useEffect(() => {
    //     // console.log("noway");
    //     if (upperTableEditRowContext) {
    //         const doIfHigher =
    //             (callback: () => void) => (dir: "higher" | "lower") => {
    //                 if (dir === "higher") {
    //                     console.log("mhm");
    //                     callback();
    //                 }
    //             };
    //         // prettier-ignore
    //         const offs = [
    //             upperTableEditRowContext.eventEmitter.on("add", doIfHigher(commitChanges)),
    //             upperTableEditRowContext.eventEmitter.on("save", doIfHigher(commitChanges)),
    //             upperTableEditRowContext.eventEmitter.on("delete", doIfHigher(commitChanges)),
    //             upperTableEditRowContext.eventEmitter.on("cancel", doIfHigher(cancelChanges)),
    //         ];
    //         return () => {
    //             offs.forEach((off) => off());
    //         };
    //     } else {
    //         commitChanges();
    //     }
    // }, [upperTableEditRowContext, commitChanges, cancelChanges]);

    const handleRowAdded = useCallback(
        (addedRow: TRow) => {
            // if (isRowIDInRange(newRow.id, startRowIndex, endRowIndex)) {
            setRows((rows) => [...rows, { ...addedRow }]);
            // setAddRow({ ...defaultRow, id: defaultRow.id + 1 });
            if (!upperTableEventTarget) {
                commitChanges();
            }
            // onRowsRangeChanged?.(startRowIndex, endRowIndex);
            // }
        },
        [upperTableEventTarget, commitChanges]
    );

    const handleRowSaved = useCallback(
        (newRow: TRow) => {
            console.log("saved mr", newRow);
            setRows((rows) =>
                rows.map((row) => (row.id === newRow.id ? newRow : row))
            );
            if (!upperTableEventTarget) {
                commitChanges();
            }
        },
        [upperTableEventTarget, commitChanges]
    );

    const handleRowDeleted = useCallback(
        (deletedRow: TRow) => {
            setRows((rows) => rows.filter((row) => row.id !== deletedRow.id));
            if (!upperTableEventTarget) {
                commitChanges();
            }
        },
        [upperTableEventTarget, commitChanges]
    );

    const handleChangeRowsPerPage = (
        _event: unknown,
        newValue: number | null
    ) => {
        setRowsPerPage(parseInt(newValue!.toString()));
        setPage(1);
    };

    const content = (
        <Table
            variant="outlined"
            size="sm"
            borderAxis="bothBetween"
            stickyFooter
            stickyHeader
        >
            <thead>
                <tr>
                    {(editable
                        ? [
                              ...headers,
                              {
                                  name: "Akcje",
                                  width: "70px",
                              },
                          ]
                        : headers
                    ).map((header) => {
                        let name,
                            width = "inherit";
                        if (typeof header === "string") name = header;
                        else {
                            name = header.name;
                            width = header.width ?? "inherit";
                        }
                        return (
                            <Tooltip title={name} variant="soft" key={name}>
                                <th style={{ width }}>{name}</th>
                            </Tooltip>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {(editable ? [...rows, addRow] : rows).map((row) => (
                    <TableEditRow
                        key={row.id}
                        row={row}
                        onAddClicked={
                            row === addRow ? handleRowAdded : undefined
                        }
                        showSaveAction={!upperTableEventTarget}
                        onSaveClicked={handleRowSaved}
                        onDeleteClicked={handleRowDeleted}
                        actionButtonOrientation={rowActionButtonOrientation}
                        stateProp={
                            row === addRow
                                ? "adding"
                                : upperRowState ?? "viewing"
                        }
                        editable={editable}
                        inputsProps={rowInputsProps}
                        ContentComponent={RowContentComponent}
                    />
                ))}
            </tbody>
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
                                    z {totalRowCount}
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
                                    onClick={() => setPage((page) => page - 1)}
                                    sx={{ bgcolor: "background.surface" }}
                                >
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                                <IconButton
                                    size="sm"
                                    color="neutral"
                                    variant="outlined"
                                    disabled={page === pageCount}
                                    onClick={() => setPage((page) => page + 1)}
                                    sx={{ bgcolor: "background.surface" }}
                                >
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </td>
                </tr>
            </tfoot>
        </Table>
    );

    // if (!upperTableEventTarget) {
    return (
        <TableEditContext.Provider value={eventTarget}>
            {content}
        </TableEditContext.Provider>
    );
    // }

    // return content;
}
