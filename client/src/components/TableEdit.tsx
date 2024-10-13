//
// TableEdit.tsx
// Flexible table component displaying, allowing edition and providing pagination for many provided rows.
//

import React, {
    ComponentProps,
    Dispatch,
    SetStateAction,
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
    onRowDeleteClicked: _onRowDeleteClicked,
    onRowAddClicked: _onRowAddClicked,
    onRowSaveClicked: _onRowSaveClicked,
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
    const [rows, setRows] = useState<TRow[]>([..._rows, { ...emptyRow }]);
    const [revertRows, setRevertRows] = useState<TRow[]>([ ..._rows, { ...emptyRow } ]); // prettier-ignore

    const upperTableEditRowContext = useContext(TableEditRowContext);
    const pageCount = Math.ceil(totalRowCount / rowsPerPage);
    const startRowIndex = (page - 1) * rowsPerPage;
    const endRowIndex = page * rowsPerPage;

    useEffect(() => {
        onRowsRangeChanged?.(startRowIndex, endRowIndex);
    }, [onRowsRangeChanged, startRowIndex, endRowIndex]);

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
        setRows([..._rows, { ...emptyRow }]);
        setRevertRows([..._rows, { ...emptyRow }]);
    }, [_rows, emptyRow]);

    useEffect(() => {
        if (upperTableEditRowContext) {
            const offs = [
                upperTableEditRowContext.eventEmitter.on("rowAdded", () => {
                    // TODO: here compare and commit
                    // events?.onRowAddClicked?.(row);
                    // events?.onRowSaveClicked?.(row);
                    // events?.onRowDeleteClicked?.(row);
                    setRevertRows([...rows]);
                }),
                upperTableEditRowContext.eventEmitter.on("rowSaved", () => {
                    // TODO: here compare and commit
                    // events?.onRowAddClicked?.(row);
                    // events?.onRowSaveClicked?.(row);
                    // events?.onRowDeleteClicked?.(row);
                    setRevertRows([...rows]);
                }),
                upperTableEditRowContext.eventEmitter.on("rowCanceled", () => {
                    setRows([...revertRows]);
                }),
            ];
            return () => {
                offs.forEach((off) => off());
            };
        }
    }, [upperTableEditRowContext, rows, revertRows]);

    const handleRowAdded = (_row: TRow) => {
        setRows([...rows, { ...emptyRow }]);
        // setRows([...rows, { ...emptyRow, id: rows.length + 100 }]);
    };

    const handleRowSaved = (_row: TRow) => {
        // nothing
    };

    const handleRowDeleted = (deletedRow: TRow) => {
        setRows(rows.filter((row) => row.id !== deletedRow.id));
    };

    const handleChangeRowsPerPage = (
        _event: unknown,
        newValue: number | null
    ) => {
        setRowsPerPage(parseInt(newValue!.toString()));
        setPage(1);
    };

    const getSetRowFunction =
        (thisRowID: number): Dispatch<SetStateAction<TRow>> =>
        (value: TRow | ((prevRow: TRow) => TRow)): void => {
            setRows((rows) =>
                rows.map((mapRow) =>
                    mapRow.id === thisRowID
                        ? typeof value === "function"
                            ? value(mapRow)
                            : value
                        : mapRow
                )
            );
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
                {rows
                    .slice(0, editable ? rows.length : -1) // dont show last (add) row if not editable
                    .map((row, _rowIndex) => (
                        <TableEditRow
                            key={row.id}
                            row={row}
                            onAddClicked={
                                row === rows.at(-1) // is last (add)
                                    ? () => handleRowAdded(row)
                                    : undefined
                            }
                            onSaveClicked={() => handleRowSaved(row)}
                            onDeleteClicked={() => handleRowDeleted(row)}
                            editable={editable}
                            inputsProps={rowInputsProps}
                            ContentComponent={RowContentComponent}
                            setRow={getSetRowFunction(row.id)}
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
