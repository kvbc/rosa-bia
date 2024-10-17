import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import React, { useMemo } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowInputsProps } from "../../components/TableEditRow";

export default function PageInvestors() {
    const dbTable = useDBTable<DBRows.Investor>("investors");

    const defaultRow = useMemo<DBTableEditDefaultRow<DBRows.Investor>>(
        () => ({
            address: "",
            name: "",
            info: "",
        }),
        []
    );

    const rowInputsProps = useMemo<TableEditRowInputsProps<DBRows.Investor>>(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
            {
                type: "text",
                rowKey: "address",
            },
            {
                type: "text",
                rowKey: "info",
            },
        ],
        []
    );

    return (
        <DBTableEdit
            dbTable={dbTable}
            headers={["Inwestor", "Adres", "Informacje"]}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
        />
    );
}
