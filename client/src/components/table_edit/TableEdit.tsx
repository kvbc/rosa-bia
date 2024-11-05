//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//

import React, {
    ComponentProps,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TableEditRow } from "./TableEditRow";
import TableEditContext from "../../contexts/components/TableEditContext";
import { Box, Stack, Table } from "@chakra-ui/react";
import { TableEditRowContext } from "../../contexts/components/TableEditRowContext";
import { TableEditPagination } from "./TableEditPagination";

export type TableEditHeader =
    | {
          name: string;
          width?: string;
      }
    | string;

export type TableEditRowType = {
    id: number;
    [key: string]: unknown;
};

export type TableEditColorValue =
    | 0
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;

export const getTableEditColor = (value: TableEditColorValue) => {
    if (value === 0) {
        return "white";
    }
    return `gray.${value}`;
};

export const nextTableEditColorValue = (
    value: TableEditColorValue,
    steps: number = 1
): TableEditColorValue => {
    return (value + 100 * steps) as TableEditColorValue;
};

// TODO: refactor?
export default function TableEdit<TRow extends TableEditRowType>(
    props: ComponentProps<typeof Table.Root> & {
        rows: TRow[];
        headers: TableEditHeader[];
        totalRowCount: number;
        defaultRow: TRow;
        editable?: boolean;
        showFooter?: boolean;
        hidePagination?: boolean;
        primaryBackgroundColorValue?: TableEditColorValue;
        onRowDeleteClicked?: (row: TRow) => void;
        onRowAddClicked?: (row: TRow) => void;
        onRowSaveClicked?: (row: TRow) => void;
        onRowsRangeChanged?: (
            startRowIndex: number,
            endRowIndex: number
        ) => void;
        rowActionButtonOrientation?: ComponentProps<typeof TableEditRow<TRow>>["actionButtonDirection"]; // prettier-ignore
        rowInputsProps: ComponentProps<
            typeof TableEditRow<TRow>
        >["inputsProps"];
        RowContentComponent?: ComponentProps<typeof TableEditRow<TRow>>["ContentComponent"]; // prettier-ignore
    }
) {
    const {
        rows: rowsProp,
        defaultRow,
        headers: headersProp,
        rowInputsProps,
        onRowDeleteClicked,
        onRowAddClicked,
        onRowSaveClicked,
        onRowsRangeChanged,
        totalRowCount,
        primaryBackgroundColorValue = 0,
        hidePagination,
        rowActionButtonOrientation,
        RowContentComponent,
        ...tableProps
    } = props;
    let { editable, showFooter } = props;

    if (editable === undefined) {
        editable = true;
    }
    if (showFooter === undefined) {
        showFooter = true;
    }

    // revertRows - rows used to revert the changes made to the table if this table is inside of any other table
    const [rows, setRows] = useState<TRow[]>([...rowsProp]);
    const [revertRows, setRevertRows] = useState<TRow[]>([...rowsProp]); // prettier-ignore
    const [addRow, setAddRow] = useState<TRow>({
        ...defaultRow,
    });
    const [eventTarget] = useState(new EventTarget());
    const upperTableEventTarget = useContext(TableEditContext);
    const upperRowState = useContext(TableEditRowContext);

    const headers = useMemo<typeof headersProp>(
        () =>
            editable
                ? [
                      ...headersProp,
                      {
                          name: "Akcje",
                          width: "70px",
                      },
                  ]
                : headersProp,
        [editable, headersProp]
    );

    useEffect(() => {
        setAddRow((addRow) => ({
            ...addRow,
            id: defaultRow.id + rows.length - revertRows.length,
        }));
    }, [defaultRow.id, revertRows.length, rows.length]);

    useEffect(() => {
        setAddRow((addRow) => ({
            ...defaultRow,
            id: addRow.id,
        }));
    }, [defaultRow]);

    useEffect(() => {
        setRevertRows([...rowsProp]);
        setRows([...rowsProp]);
    }, [rowsProp]);

    /*
     *
     * Changes
     *
     */

    const commitChanges = useCallback(() => {
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
        eventTarget.dispatchEvent(new Event("changesCanceled"));
    }, [revertRows, eventTarget]);

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

    /*
     *
     * Row
     *
     */

    const handleRowAdded = useCallback(
        (addedRow: TRow) => {
            setRows((rows) => [...rows, { ...addedRow }]);
            if (!upperTableEventTarget) {
                commitChanges();
            }
        },
        [commitChanges, upperTableEventTarget]
    );

    const handleRowSaved = useCallback(
        (newRow: TRow) => {
            setRows((rows) =>
                rows.map((row) => (row.id === newRow.id ? newRow : row))
            );
            if (!upperTableEventTarget) {
                commitChanges();
            }
        },
        [commitChanges, upperTableEventTarget]
    );

    const handleRowDeleted = useCallback(
        (deletedRow: TRow) => {
            setRows((rows) => rows.filter((row) => row.id !== deletedRow.id));
            if (!upperTableEventTarget) {
                commitChanges();
            }
        },
        [commitChanges, upperTableEventTarget]
    );

    /*
     *
     * TableEdit
     *
     */

    return (
        <TableEditContext.Provider value={eventTarget}>
            <Stack gap="0">
                {!hidePagination && (
                    <Box
                        bg="gray.100"
                        padding="2"
                        outlineWidth="1px"
                        outlineStyle="solid"
                        outlineColor="gray.200"
                    >
                        <TableEditPagination
                            {...props}
                            primaryBackgroundColor="gray.200"
                            secondaryBackgroundColor="gray.300"
                        />
                    </Box>
                )}
                <Table.Root
                    variant="outline"
                    size="sm"
                    showColumnBorder
                    // interactive
                    stickyHeader={upperTableEventTarget === null}
                    {...tableProps}
                    outline={`1px solid ${getTableEditColor(
                        nextTableEditColorValue(primaryBackgroundColorValue, 2)
                    )} !important`}
                    // outlineColor="yellow !important"
                >
                    <Table.Header>
                        <Table.Row
                            backgroundColor={getTableEditColor(
                                nextTableEditColorValue(
                                    primaryBackgroundColorValue
                                )
                            )}
                            // bg="red"
                        >
                            {headers.map((header) => {
                                let name,
                                    width = "inherit";
                                if (typeof header === "string") name = header;
                                else {
                                    name = header.name;
                                    width = header.width ?? "inherit";
                                }
                                return (
                                    <Table.ColumnHeader
                                        style={{ width }}
                                        key={name}
                                        borderColor={getTableEditColor(
                                            nextTableEditColorValue(
                                                primaryBackgroundColorValue,
                                                2
                                            )
                                        )}
                                        // borderColor={getTableEditColor(
                                        //     nextTableEditColorValue(
                                        //         primaryBackgroundColorValue,
                                        //         2
                                        //     )
                                        // )}
                                    >
                                        {name}
                                    </Table.ColumnHeader>
                                );
                            })}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {(editable ? [...rows, addRow] : rows).map((row) => (
                            <Table.Row
                                key={row.id}
                                backgroundColor={getTableEditColor(
                                    primaryBackgroundColorValue
                                )}
                                borderColor={getTableEditColor(
                                    nextTableEditColorValue(
                                        primaryBackgroundColorValue,
                                        2
                                    )
                                )}
                            >
                                <TableEditRow
                                    row={row}
                                    onAddClicked={
                                        row === addRow
                                            ? handleRowAdded
                                            : undefined
                                    }
                                    primaryBgColorValue={
                                        primaryBackgroundColorValue
                                    }
                                    showSaveAction={
                                        upperTableEventTarget === null
                                    }
                                    onSaveClicked={handleRowSaved}
                                    onDeleteClicked={handleRowDeleted}
                                    actionButtonDirection={
                                        rowActionButtonOrientation
                                    }
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
                                    saveOnInputBlur={
                                        upperTableEventTarget !== null
                                    }
                                />
                            </Table.Row>
                        ))}
                    </Table.Body>
                    {/* {showFooter && (
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan={headers.length}>
                                <TableEditPagination
                                    {...props}
                                    primaryBackgroundColor="gray.100"
                                    secondaryBackgroundColor="gray.200"
                                />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                )} */}
                </Table.Root>
            </Stack>
        </TableEditContext.Provider>
    );
}
