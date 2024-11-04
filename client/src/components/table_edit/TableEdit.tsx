//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//
// TODO: Revisit this shit ong
//

import React, {
    ComponentProps,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { TableEditRow } from "./TableEditRow";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TableEditContext from "../../contexts/components/TableEditContext";
import { HStack, Table } from "@chakra-ui/react";
import { TableEditRowContext } from "../../contexts/components/TableEditRowContext";

export type TableEditRowType = {
    id: number;
    [key: string]: unknown;
};

export default function TableEdit<TRow extends TableEditRowType>({
    rows: _rows,
    defaultRow,
    headers,
    showFooter,
    rowInputsProps,
    onRowDeleteClicked,
    onRowAddClicked,
    onRowSaveClicked,
    onRowsRangeChanged,
    totalRowCount,
    editable,
    rowActionButtonOrientation,
    RowContentComponent,
    ...tableProps
}: ComponentProps<typeof Table.Root> & {
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
    showFooter?: boolean;
    onRowDeleteClicked?: (row: TRow) => void;
    onRowAddClicked?: (row: TRow) => void;
    onRowSaveClicked?: (row: TRow) => void;
    onRowsRangeChanged?: (startRowIndex: number, endRowIndex: number) => void;
    rowActionButtonOrientation?: ComponentProps<typeof TableEditRow<TRow>>["actionButtonDirection"]; // prettier-ignore
    rowInputsProps: ComponentProps<typeof TableEditRow<TRow>>["inputsProps"];
    RowContentComponent?: ComponentProps<typeof TableEditRow<TRow>>["ContentComponent"]; // prettier-ignore
}) {
    if (editable === undefined) {
        editable = true;
    }
    if (showFooter === undefined) {
        showFooter = true;
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
    const upperRowState = useContext(TableEditRowContext);

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

    useEffect(() => {
        if (!upperTableEventTarget) {
            commitChanges();
        }
    }, [rows, upperTableEventTarget, commitChanges]);

    const handleRowAdded = useCallback((addedRow: TRow) => {
        // if (isRowIDInRange(newRow.id, startRowIndex, endRowIndex)) {
        setRows((rows) => [...rows, { ...addedRow }]);
        // setAddRow({ ...defaultRow, id: defaultRow.id + 1 });
        // if (!upperTableEventTarget) {
        //     commitChanges();
        // }
        // onRowsRangeChanged?.(startRowIndex, endRowIndex);
        // }
    }, []);

    const handleRowSaved = useCallback((newRow: TRow) => {
        console.log("saved mr", newRow);
        setRows((rows) =>
            rows.map((row) => (row.id === newRow.id ? newRow : row))
        );
        // if (!upperTableEventTarget) {
        //     commitChanges();
        // }
    }, []);

    const handleRowDeleted = useCallback((deletedRow: TRow) => {
        setRows((rows) => rows.filter((row) => row.id !== deletedRow.id));
        // if (!upperTableEventTarget) {
        //     commitChanges();
        // }
    }, []);

    const handleChangeRowsPerPage = (
        _event: unknown,
        newValue: number | null
    ) => {
        setRowsPerPage(parseInt(newValue!.toString()));
        setPage(1);
    };

    const content = (
        <Table.Root
            variant="outline"
            size="sm"
            showColumnBorder
            interactive
            stickyHeader={upperTableEventTarget === null}
            {...tableProps}
        >
            <Table.Header>
                <Table.Row bg="bg.subtle">
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
                            <Table.ColumnHeader style={{ width }} key={name}>
                                {/* <Tooltip content={name}> */}
                                {name}
                                {/* </Tooltip> */}
                            </Table.ColumnHeader>
                        );
                    })}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {(editable ? [...rows, addRow] : rows).map((row) => (
                    <TableEditRow
                        key={row.id}
                        row={row}
                        onAddClicked={
                            row === addRow ? handleRowAdded : undefined
                        }
                        showSaveAction={upperTableEventTarget === null}
                        onSaveClicked={handleRowSaved}
                        onDeleteClicked={handleRowDeleted}
                        actionButtonDirection={rowActionButtonOrientation}
                        stateProp={
                            row === addRow
                                ? "adding"
                                : upperRowState === null
                                ? "viewing"
                                : upperRowState === "adding"
                                ? "editing"
                                : upperRowState
                        }
                        editable={editable}
                        inputsProps={rowInputsProps}
                        ContentComponent={RowContentComponent}
                        saveOnInputBlur={upperTableEventTarget !== null}
                    />
                ))}
            </Table.Body>

            {showFooter && (
                <Table.Footer className="z-20">
                    <Table.Row>
                        <Table.Cell colSpan={headers.length + 2}>
                            <HStack align="center" justify="flex-end" gap="2">
                                {/* <FormControl orientation="horizontal" size="sm">
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
                                </Box> */}
                            </HStack>
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>
            )}
        </Table.Root>
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
