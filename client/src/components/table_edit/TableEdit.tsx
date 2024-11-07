//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//

import React, {
    ComponentProps,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TableEditRow } from "./row/TableEditRow";
import TableEditContext from "../../contexts/components/TableEditContext";
import { Stack } from "@chakra-ui/react";
import { TableEditRowContext } from "../../contexts/components/TableEditRowContext";
// import { TableEditPagination } from "./TableEditPagination";
import { MyTable } from "../my_table/MyTable";
import { MyTableHeader } from "../my_table/MyTableHeader";
import { TableEditPagination } from "./TableEditPagination";

export type TableEditHeader =
    | {
          name: string;
          width?: string;
      }
    | string
    | ReactNode;

export type TableEditRowType = {
    id: number;
    [key: string]: unknown;
};

export function TableEdit<TRow extends TableEditRowType>(
    props: Omit<
        ComponentProps<typeof MyTable>,
        "myHeaders" | "myRows" | "myFooter"
    > & {
        rows: TRow[];
        headers: TableEditHeader[];
        totalRowCount: number;
        defaultRow: TRow;
        editable?: boolean;
        showFooter?: boolean;
        title?: string;
        hidePagination?: boolean;
        onRowDeleteClicked?: (row: TRow) => void;
        onRowAddClicked?: (row: TRow) => void;
        onRowSaveClicked?: (row: TRow) => void;
        onRowsRangeChanged?: (
            startRowIndex: number,
            endRowIndex: number
        ) => void;
        rowActionButtonOrientation?: ComponentProps<typeof TableEditRow<TRow>>["actionButtonOrientation"]; // prettier-ignore
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
        title,
        hidePagination,
        rowActionButtonOrientation,
        RowContentComponent,
        ...myTableProps
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
    const [totalAddedRowsCount, setTotalAddedRowsCount] = useState<number>(0);
    const [canCommit, setCanCommit] = useState<boolean>(false);
    const [eventTarget] = useState(new EventTarget());
    const upperTableEventTarget = useContext(TableEditContext);
    const upperRowContext = useContext(TableEditRowContext);

    const headers = useMemo<TableEditHeader[]>(
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
            // id: defaultRow.id + rows.length - rowsProp.length,
            // id: defaultRow.id + rows.length - revertRows.length,
            id: defaultRow.id + totalAddedRowsCount,
        }));
        // }, [defaultRow.id, rowsProp.length, rows.length]);
        // }, [defaultRow.id, revertRows.length, rows.length]);
    }, [defaultRow.id, totalAddedRowsCount]);

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
        console.log(revertRows, "=>", rows);
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
        setTotalAddedRowsCount(0);
        eventTarget.dispatchEvent(new Event("changesCommited"));
    }, [
        onRowAddClicked,
        onRowSaveClicked,
        onRowDeleteClicked,
        revertRows,
        eventTarget,
        rows,
    ]);

    const cancelChanges = useCallback(() => {
        setRows([...revertRows]);
        setTotalAddedRowsCount(0);
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

    useEffect(() => {
        if (canCommit) {
            setCanCommit(false);
            commitChanges();
        }
    }, [canCommit, commitChanges]);

    /*
     *
     * Row
     *
     */

    const handleRowAdded = useCallback(
        (addedRow: TRow) => {
            setRows((rows) => [...rows, { ...addedRow }]);
            setTotalAddedRowsCount((totalCount) => totalCount + 1);
            if (!upperTableEventTarget) {
                setCanCommit(true);
            }
        },
        [upperTableEventTarget]
    );

    const handleRowSaved = useCallback(
        (newRow: TRow) => {
            setRows((rows) =>
                rows.map((row) => (row.id === newRow.id ? newRow : row))
            );
            if (!upperTableEventTarget) {
                setCanCommit(true);
            }
        },
        [upperTableEventTarget]
    );

    const handleRowDeleted = useCallback(
        (deletedRow: TRow) => {
            setRows((rows) => rows.filter((row) => row.id !== deletedRow.id));
            if (!upperTableEventTarget) {
                setCanCommit(true);
            }
        },
        [upperTableEventTarget]
    );

    /*
     *
     * TableEdit
     *
     */

    const content = (
        <Stack gap="0">
            {!hidePagination && (
                <MyTable
                    myHeaders={[
                        <MyTableHeader key="1">
                            <TableEditPagination {...props} />
                        </MyTableHeader>,
                    ]}
                />
            )}
            <MyTable
                title={title}
                stickyHeader={upperTableEventTarget === null}
                myHeaders={headers.map((header) => {
                    let name,
                        width = "inherit";
                    if (typeof header === "string") {
                        name = header;
                    } else if (React.isValidElement(header)) {
                        return header;
                    } else {
                        // @ts-expect-error we check if is react element already
                        name = header.name;
                        // @ts-expect-error we check if is react element already
                        width = header.width ?? "inherit";
                    }
                    return (
                        <MyTableHeader key={name} width={width}>
                            {name}
                        </MyTableHeader>
                    );
                })}
                myRows={(editable ? [...rows, addRow] : rows).map((row) => (
                    <TableEditRow<TRow>
                        key={row === addRow ? row.id + 100 : row.id} // to avoid same-key problems when changing ids
                        row={row}
                        onAddClicked={
                            row === addRow ? handleRowAdded : undefined
                        }
                        showSaveAction={upperTableEventTarget === null}
                        onSaveClicked={handleRowSaved}
                        onDeleteClicked={handleRowDeleted}
                        actionButtonOrientation={rowActionButtonOrientation}
                        stateProp={
                            row === addRow
                                ? "adding"
                                : upperRowContext === null
                                ? "viewing"
                                : upperRowContext.state === "adding"
                                ? "editing"
                                : upperRowContext.state
                        }
                        editable={editable}
                        inputsProps={rowInputsProps}
                        ContentComponent={RowContentComponent}
                        saveOnInputFocusOut={upperTableEventTarget !== null}
                    />
                ))}
                {...myTableProps}
            />
            {!hidePagination && (
                <MyTable
                    myHeaders={[
                        <MyTableHeader key="1">
                            <TableEditPagination {...props} />
                        </MyTableHeader>,
                    ]}
                />
            )}
        </Stack>
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
