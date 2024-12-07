//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//

import React, {
    ComponentProps,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TableEditRow } from "./row/TableEditRow";
import TableEditContext from "@/contexts/components/TableEditContext";
import { Box, Center, Float, Skeleton, Spinner, Stack } from "@chakra-ui/react";
import { TableEditRowContext } from "@/contexts/components/TableEditRowContext";
// import { TableEditPagination } from "./TableEditPagination";
import { MyTable } from "@/components/my_table/MyTable";
import { MyTableHeader } from "@/components/my_table/MyTableHeader";
import { TableEditPagination } from "./TableEditPagination";
import { MyTableRow } from "@/components/my_table/MyTableRow";
import { MyTableCell } from "@/components/my_table/MyTableCell";
import { Range } from "@/utils/types";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../ui/accordion";
import { FaFilter } from "react-icons/fa6";
import { Filter, FilterOperator } from "@server/http/routes/table_rows/get";

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
        isLoading?: boolean;
        baseRowKey?: number;
        disableRowAdding?: boolean;
        hidePagination?: boolean;
        filters: Filter[];
        setFilters: Dispatch<SetStateAction<Filter[]>>;
        disableActions?: boolean;
        showFilters?: boolean;
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
        showFilters,
        filters,
        setFilters,
        rowActionButtonOrientation,
        RowContentComponent,
        ...myTableProps
    } = props;
    let { editable, showFooter, baseRowKey, disableActions } = props;

    disableActions = disableActions ?? false;
    baseRowKey = baseRowKey ?? 0;
    if (editable === undefined) {
        editable = true;
    }
    if (showFooter === undefined) {
        showFooter = true;
    }

    //
    // replace some inputs with ranges (number, date)
    //
    const updateFilterRow = useCallback((): TRow | undefined => {
        if (!defaultRow) {
            return undefined;
        }
        let row = { ...defaultRow };
        rowInputsProps.forEach((inputProps) => {
            if (inputProps.type === "date" || inputProps.type === "number") {
                const key = inputProps.rowKey;
                const value = row[key] as string | number;
                row = {
                    ...row,
                    [key]: { from: value, to: value } satisfies Range<
                        string | number
                    >,
                };
            }
        });
        return row;
    }, [defaultRow, rowInputsProps]);

    // revertRows - rows used to revert the changes made to the table if this table is inside of any other table
    const [rows, setRows] = useState<TRow[]>([...rowsProp]);
    const [revertRows, setRevertRows] = useState<TRow[]>([...rowsProp]); // prettier-ignore
    const [filterRow, setFilterRow] = useState<TRow | undefined>(
        updateFilterRow
    );
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
    // const [rerenderCount, increaseRerenderCount] = useReducer(
    //     (count) => count + 1,
    //     0
    // );

    // useEffect(() => {
    //     setFilterRow(updateFilterRow());
    // }, [updateFilterRow]);

    const headers = useMemo<TableEditHeader[]>(
        () =>
            editable && !disableActions
                ? [
                      ...headersProp,
                      {
                          name: "Akcje",
                          width: "70px",
                      },
                  ]
                : headersProp,
        [editable, headersProp, disableActions]
    );

    // useEffect(increaseRerenderCount);

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
        // console.log("this problem?", rowsProp.at(0));
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
        // console.log(canCommit);
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
            console.log("handleRowSaved called");
            setRows((rows) =>
                rows.map((row) => (row.id === newRow.id ? newRow : row))
            );
            if (!upperTableEventTarget && !canCommit) {
                console.log("set canCommit to true");
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
     * Filters
     *
     */

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    useEffect(() => {
        console.log("filter row: ", filterRow);

        const newFilters: Filter[] = [];
        for (const key in filterRow) {
            const shouldFilter = filterRow["FILTER_" + key];
            if (shouldFilter) {
                const value = filterRow[key];
                if (typeof value === "object") {
                    // must be a Range
                    const range = value as Range;
                    newFilters.push({
                        key,
                        operator: ">=",
                        value: String(range.from),
                    });
                    newFilters.push({
                        key,
                        operator: "<=",
                        value: String(range.to),
                    });
                } else {
                    let filterValue = String(value);
                    let operator: FilterOperator = "=";
                    if (
                        typeof value === "string" ||
                        typeof value === "number"
                    ) {
                        operator = "like";
                        filterValue = "%" + String(value).trim() + "%";
                    }
                    newFilters.push({
                        key,
                        operator,
                        value: filterValue,
                    });
                }
            }
        }
        setFilters(newFilters);
    }, [filterRow, setFilters]);

    /*
     *
     * TableEdit
     *
     */

    const renderRows =
        editable && !disableRowAdding
            ? addRow
                ? [...rows, addRow]
                : rows
            : rows;
    // if (filterRow) {
    //     renderRows = [filterRow, ...renderRows];
    // }

    const content = (
        <Stack gap="0">
            {!hidePagination && (
                <MyTable showBody={false}>
                    <MyTableHeader>
                        <TableEditPagination {...props} />
                    </MyTableHeader>
                </MyTable>
            )}
            <MyTable
                title={title}
                stickyHeader={upperTableEventTarget === null}
                {...myTableProps}
            >
                {headers.map((header) => {
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
                {
                    // isLoading ? (
                    //     new Array(15).fill(0).map((_, index) => (
                    //         <MyTableRow key={index}>
                    //             <MyTableCell colSpan={999} position="relative">
                    //                 <Skeleton
                    //                     width="full"
                    //                     height="full"
                    //                     minHeight="40px"
                    //                 />
                    //                 <Float placement="middle-center">
                    //                     <Center>
                    //                         <Spinner color="gray" size="sm" />
                    //                     </Center>
                    //                 </Float>
                    //             </MyTableCell>
                    //         </MyTableRow>
                    //     ))
                    // ) :
                    <>
                        {showFilters && (
                            <MyTableRow>
                                <MyTableCell colSpan={999}>
                                    {/* <TableEditFilters
                                        rowInputsProps={rowInputsProps}
                                        defaultRow={defaultRow}
                                    /> */}
                                    <AccordionRoot collapsible variant="plain">
                                        <AccordionItem value="1">
                                            <AccordionItemTrigger
                                                fontSize="inherit"
                                                padding="0"
                                            >
                                                <FaFilter />
                                                <Box>Filtry</Box>
                                            </AccordionItemTrigger>
                                            <AccordionItemContent>
                                                <MyTable keepIndentLevel>
                                                    {filterRow && (
                                                        <TableEditRow<TRow>
                                                            row={filterRow}
                                                            stateProp="editing"
                                                            isFilterRow
                                                            inputsProps={
                                                                rowInputsProps
                                                            }
                                                            editable={true}
                                                            showSaveAction={
                                                                false
                                                            }
                                                            onSaveClicked={
                                                                setFilterRow
                                                            }
                                                            disableActions={
                                                                true
                                                            }
                                                            ContentComponent={
                                                                RowContentComponent
                                                            }
                                                            saveOnInputFocusOut={
                                                                true
                                                            }
                                                        />
                                                    )}
                                                </MyTable>
                                            </AccordionItemContent>
                                        </AccordionItem>
                                    </AccordionRoot>
                                </MyTableCell>
                            </MyTableRow>
                        )}
                        {renderRows.map((row) => (
                            <TableEditRow<TRow>
                                key={
                                    //   rerenderCount +
                                    baseRowKey +
                                    (row === addRow ? row.id + 100 : row.id)
                                } // to avoid same-key problems when changing ids
                                row={row}
                                disableActions={disableActions}
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
                    </>
                }
            </MyTable>
            {!hidePagination && (
                <MyTable showBody={false}>
                    <MyTableHeader>
                        <TableEditPagination {...props} />
                    </MyTableHeader>
                </MyTable>
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
