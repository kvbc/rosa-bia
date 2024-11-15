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
import TableEditContext from "@/contexts/components/TableEditContext";
import { Center, Float, Skeleton, Spinner, Stack } from "@chakra-ui/react";
import { TableEditRowContext } from "@/contexts/components/TableEditRowContext";
// import { TableEditPagination } from "./TableEditPagination";
import { MyTable } from "@/components/my_table/MyTable";
import { MyTableHeader } from "@/components/my_table/MyTableHeader";
import { TableEditPagination } from "./TableEditPagination";
import { MyTableRow } from "@/components/my_table/MyTableRow";
import { MyTableCell } from "@/components/my_table/MyTableCell";

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
        defaultRow?: TRow;
        editable?: boolean;
        showFooter?: boolean;
        title?: string;
        isLoading?: boolean;
        disableRowAdding?: boolean;
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
        disableRowAdding,
        onRowDeleteClicked,
        onRowAddClicked,
        onRowSaveClicked,
        onRowsRangeChanged,
        totalRowCount,
        title,
        isLoading,
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
    const [addRow, setAddRow] = useState<TRow | undefined>(
        defaultRow
            ? {
                  ...defaultRow,
              }
            : undefined
    );
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
        if (defaultRow?.id !== undefined) {
            setAddRow((addRow) =>
                addRow
                    ? {
                          ...addRow,
                          // id: defaultRow.id + rows.length - rowsProp.length,
                          // id: defaultRow.id + rows.length - revertRows.length,
                          id: defaultRow.id + totalAddedRowsCount,
                      }
                    : undefined
            );
            // }, [defaultRow.id, rowsProp.length, rows.length]);
            // }, [defaultRow.id, revertRows.length, rows.length]);
        }
    }, [defaultRow?.id, totalAddedRowsCount]);

    useEffect(() => {
        if (defaultRow !== undefined) {
            setAddRow((addRow) => ({
                ...defaultRow,
                id: addRow ? addRow.id : defaultRow.id,
            }));
        }
    }, [defaultRow]);

    useEffect(() => {
        console.log("this problem?", rowsProp.at(0));
        setRevertRows([...rowsProp]);
        setRows([...rowsProp]);
    }, [rowsProp]);

    /*
     *
     * Changes
     *
     */

    const commitChanges = useCallback(() => {
        if (revertRows === rows) {
            return;
        }
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
                console.log("adding", row);
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
            setRevertRows(rows);
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
        console.log(canCommit);
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
            if (!upperTableEventTarget && !canCommit) {
                setCanCommit(true);
            }
        },
        [upperTableEventTarget, canCommit]
    );

    const handleRowSaved = useCallback(
        (newRow: TRow) => {
            setRows((rows) =>
                rows.map((row) => (row.id === newRow.id ? newRow : row))
            );
            if (!upperTableEventTarget && !canCommit) {
                setCanCommit(true);
            }
        },
        [upperTableEventTarget, canCommit]
    );

    const handleRowDeleted = useCallback(
        (deletedRow: TRow) => {
            setRows((rows) => rows.filter((row) => row.id !== deletedRow.id));
            if (!upperTableEventTarget && !canCommit) {
                setCanCommit(true);
            }
        },
        [upperTableEventTarget, canCommit]
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
                {...myTableProps}
            >
                {isLoading
                    ? new Array(15).fill(0).map((_, index) => (
                          <MyTableRow key={index}>
                              <MyTableCell colSpan={999} position="relative">
                                  <Skeleton
                                      width="full"
                                      height="full"
                                      minHeight="40px"
                                  />
                                  <Float placement="middle-center">
                                      <Center>
                                          <Spinner color="gray" size="sm" />
                                      </Center>
                                  </Float>
                              </MyTableCell>
                          </MyTableRow>
                      ))
                    : (editable && !disableRowAdding
                          ? addRow
                              ? [...rows, addRow]
                              : rows
                          : rows
                      ).map((row) => (
                          <TableEditRow<TRow>
                              key={row === addRow ? row.id + 100 : row.id} // to avoid same-key problems when changing ids
                              row={row}
                              onAddClicked={
                                  row === addRow ? handleRowAdded : undefined
                              }
                              showSaveAction={upperTableEventTarget === null}
                              onSaveClicked={handleRowSaved}
                              onDeleteClicked={handleRowDeleted}
                              actionButtonOrientation={
                                  rowActionButtonOrientation
                              }
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
                              saveOnInputFocusOut={
                                  upperTableEventTarget !== null
                              }
                          />
                      ))}
            </MyTable>
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
