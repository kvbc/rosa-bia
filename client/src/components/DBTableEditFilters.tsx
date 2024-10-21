import React, { useMemo } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Stack,
} from "@mui/joy";
import { DB_TABLE_ROW_INFOS, DBRow } from "../../../server/src/dbTypes";
import { DBTable } from "../hooks/useDBTable";
import TableEdit from "./TableEdit";
import { DB_FILTER_OPERATORS, DBFilter } from "../../../server/src/types";
import { TableEditRowInputsProps } from "./TableEditRow";
import { TableEditRowInputSelectOption } from "./TableEditRowInput";
import {
    FilterList as FilterListIcon,
    Help as HelpIcon,
} from "@mui/icons-material";

export type DBFilterRow<TRow extends DBRow> = DBFilter<TRow> & {
    id: number;
};

export default function DBTableEditFilters<TRow extends DBRow>({
    dbTable,
    rows,
    onRowAddClicked,
    onRowDeleteClicked,
    onRowSaveClicked,
}: {
    dbTable: DBTable<TRow>;
    rows: DBFilterRow<TRow>[];
    onRowAddClicked: (row: DBFilterRow<TRow>) => void;
    onRowDeleteClicked: (row: DBFilterRow<TRow>) => void;
    onRowSaveClicked: (row: DBFilterRow<TRow>) => void;
}) {
    const defaultRow = useMemo<DBFilterRow<TRow>>(
        () => ({
            id: rows.length + 1,
            key: "id",
            operator: "=",
            value: "1",
        }),
        [rows.length]
    );

    const rowInputsProps = useMemo<TableEditRowInputsProps<DBFilterRow<TRow>>>(
        () => [
            {
                rowKey: "key",
                type: "select",
                placeholder: "Klucz",
                getSelectOptions: () =>
                    [
                        ...DB_TABLE_ROW_INFOS[dbTable.tableName].zod.keyof()
                            .options,
                    ].map<TableEditRowInputSelectOption>((key) => ({
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
