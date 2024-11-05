import React, { useMemo } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Stack,
} from "@mui/joy";
import { DB } from "../../../server/src/db/types";
import { DBTable } from "../hooks/useDBTable";
import TableEdit from "./table_edit/TableEdit";
import { TableEditRowInputsProps } from "./table_edit/TableEditRow";
import { TableEditRowInputSelectOption } from "./table_edit/TableEditRowInputSelect";
import { Filter as DBFilter } from "../../../server/src/http/routes/table_rows/get";
import {
    FilterList as FilterListIcon,
    Help as HelpIcon,
} from "@mui/icons-material";

export type DBFilterRow = DBFilter & {
    id: number;
};

// FIXME: fixme
export default function DBTableEditFilters<TRow extends DB.Row>({
    dbTable,
    rows,
    onRowAddClicked,
    onRowDeleteClicked,
    onRowSaveClicked,
}: {
    dbTable: DBTable<TRow>;
    rows: DBFilterRow[];
    onRowAddClicked: (row: DBFilterRow) => void;
    onRowDeleteClicked: (row: DBFilterRow) => void;
    onRowSaveClicked: (row: DBFilterRow) => void;
}) {
    const defaultRow = useMemo<DBFilterRow>(
        () => ({
            id: rows.length + 1,
            key: "id",
            operator: "=",
            value: "1",
        }),
        [rows.length]
    );

    const rowInputsProps = useMemo<TableEditRowInputsProps<DBFilterRow>>(
        () => [
            {
                rowKey: "key",
                type: "select",
                placeholder: "Klucz",
                getSelectOptions: () =>
                    DB.Rows.getMeta(
                        dbTable.tableName
                    ).keys.map<TableEditRowInputSelectOption>((key) => ({
                        value: key,
                        name: key,
                    })),
            },
            {
                rowKey: "operator",
                type: "select",
                placeholder: "Operator",
                getSelectOptions: () =>
                    DB_FILTER_OPERATORS.map<TableEditRowInputSelectOption>(
                        (operator) => ({
                            value: operator,
                            name: operator,
                        })
                    ),
            },
            {
                rowKey: "value",
                type: "text",
                placeholder: "Wartość",
            },
        ],
        [dbTable.tableName]
    );

    return (
        <Accordion>
            <AccordionSummary indicator={null} color="primary" variant="solid">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    justifyContent="center"
                    padding={0.5}
                >
                    <FilterListIcon />
                    <span>Filtry</span>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="end"
                    width="100%"
                    padding={0.5}
                >
                    {/* TODO: Do something */}
                    <IconButton variant="solid" color="primary">
                        <HelpIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </AccordionSummary>
            <AccordionDetails color="primary" variant="soft">
                <TableEdit
                    rows={rows}
                    headers={["Klucz", "Operator", "Wartość"]}
                    totalRowCount={rows.length}
                    showFooter={false}
                    defaultRow={defaultRow}
                    rowInputsProps={rowInputsProps}
                    onRowAddClicked={onRowAddClicked}
                    onRowDeleteClicked={onRowDeleteClicked}
                    onRowSaveClicked={onRowSaveClicked}
                />
            </AccordionDetails>
        </Accordion>
    );
}
