import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import React, { useMemo } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import { TableEditHeader } from "../../components/table_edit/TableEdit";

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
            },
            {
                type: "text",
                rowKey: "address",
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
        />
    );
}
