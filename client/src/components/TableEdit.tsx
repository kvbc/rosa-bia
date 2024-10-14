//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//

import React, {
    ComponentProps,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import TableEditRow, { TableEditRowContext } from "./TableEditRow";
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

export default function TableEdit<TRow extends TableEditRowType>({
    rows: _rows,
    emptyRow,
    headers,
    rowInputsProps,
    editable,
    onRowDeleteClicked,
    onRowAddClicked,
    onRowSaveClicked,
    onRowsRangeChanged,
    totalRowCount,
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
    emptyRow: TRow;
    editable?: boolean;
    onRowDeleteClicked?: (row: TRow) => void;
    onRowAddClicked?: (row: TRow) => void;
    onRowSaveClicked?: (row: TRow) => void;
    onRowsRangeChanged?: (startRowIndex: number, endRowIndex: number) => void;
    rowInputsProps: ComponentProps<typeof TableEditRow<TRow>>["inputsProps"];
    RowContentComponent?: ComponentProps<typeof TableEditRow<TRow>>["ContentComponent"]; // prettier-ignore
}) {
    if (editable === undefined) editable = true;

    //
    // revertRows - rows used to revert the changes made to the table if this table is inside of any TableEditRow
    //
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const [rows, setRows] = useState<TRow[]>(_rows);
    const [revertRows, setRevertRows] = useState<TRow[]>(_rows); // prettier-ignore
    const [addRow, setAddRow] = useState<TRow>({ ...emptyRow });

    const upperTableEditRowContext = useContext(TableEditRowContext);
    const pageCount = Math.ceil(totalRowCount / rowsPerPage);
    const startRowIndex = (page - 1) * rowsPerPage;
    const endRowIndex = page * rowsPerPage;

    useEffect(() => {
        onRowsRangeChanged?.(startRowIndex, endRowIndex);
    }, [onRowsRangeChanged, startRowIndex, endRowIndex]);

    useEffect(() => {
        setAddRow({ ...emptyRow });
    }, [emptyRow]);

    //
    // If this TableEdit is inside of another TableEditRow,
    // depend it's 'editable' property on this row
    //
    if (upperTableEditRowContext) {
        editable =
            upperTableEditRowContext.state === "editing" ||
            upperTableEditRowContext.state === "adding";
    }

    useEffect(() => {
        setRevertRows(_rows);
        setRows(_rows);
    }, [_rows]);

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
    }, [
        onRowAddClicked,
        onRowSaveClicked,
        onRowDeleteClicked,
        rows,
        revertRows,
    ]);

    const cancelChanges = useCallback(() => {
        setRows([...revertRows]);
    }, [revertRows]);

    useEffect(() => {
        if (upperTableEditRowContext) {
            // prettier-ignore
            const offs = [
                upperTableEditRowContext.eventEmitter.on("rowAdded", commitChanges),
                upperTableEditRowContext.eventEmitter.on("rowSaved", commitChanges),
                upperTableEditRowContext.eventEmitter.on("rowCanceled", cancelChanges),
            ];
            return () => {
                offs.forEach((off) => off());
            };
        } else {
            commitChanges();
        }
    }, [upperTableEditRowContext, commitChanges, cancelChanges]);

    const handleRowAdded = (newRow: TRow) => {
        // if (isRowIDInRange(newRow.id, startRowIndex, endRowIndex)) {
        setRows((rows) => [...rows, newRow]);
        // onRowsRangeChanged?.(startRowIndex, endRowIndex);
        // }
    };

    const handleRowSaved = (newRow: TRow) => {
        setRows((rows) =>
            rows.map((row) => (row.id === newRow.id ? newRow : row))
        );
    };

    const handleRowDeleted = (deletedRow: TRow) => {
        setRows((rows) => rows.filter((row) => row.id !== deletedRow.id));
    };

    const handleRowCanceled = useCallback(
        (_canceledRow: TRow) => {
            if (!upperTableEditRowContext) {
                cancelChanges();
            }
        },
        [upperTableEditRowContext, cancelChanges]
    );

    const handleChangeRowsPerPage = (
        _event: unknown,
        newValue: number | null
    ) => {
        setRowsPerPage(parseInt(newValue!.toString()));
        setPage(1);
    };

    return (
        <Table
            variant="outlined"
            size="sm"
            borderAxis="bothBetween"
            stickyFooter
            stickyHeader
        >
            <thead>
                <tr>
                    {[...headers, { name: "Akcje", width: "70px" }].map(
                        (header) => {
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
                        }
                    )}
                </tr>
            </thead>
            <tbody>
                {[...rows, addRow].map((row) => (
                    <TableEditRow
                        key={row.id}
                        row={row}
                        onAddClicked={
                            row === addRow ? handleRowAdded : undefined
                        }
                        onSaveClicked={handleRowSaved}
                        onDeleteClicked={handleRowDeleted}
                        onCancelClicked={handleRowCanceled}
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
}
