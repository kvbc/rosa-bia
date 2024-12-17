import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import { useMemo } from "react";
import useDBTable from "@/hooks/useDBTable";
import * as DB from "@shared/db";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { TableEditHeader } from "@/components/table_edit/TableEdit";

export default function PageInvestors() {
    const dbTable = useDBTable<DB.Rows.Investor>("investors");

    const headers = useMemo<TableEditHeader[]>(() => ["Inwestor", "Adres"], []);

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Investor>>(
        () => ({
            address: "",
            name: "",
        }),
        []
    );

    const rowInputsProps = useMemo<TableEditRowInputsProps<DB.Rows.Investor>>(
        () => [
            {
                type: "text",
                rowKey: "name",
                placeholder: "Inwestor",
                isFilterable: true,
            },
            {
                type: "text",
                rowKey: "address",
                placeholder: "Adres",
                isFilterable: true,
            },
        ],
        []
    );

    return (
        <DBTableEdit
            dbTable={dbTable}
            headers={headers}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
            showFilters
        />
    );
}
