import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import React, { useMemo } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";

export default function PageInvestors() {
    const dbTable = useDBTable<DB.Rows.Investor>("investors");

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Investor>>(
        () => ({
            address: "",
            name: "",
            info: "",
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
            headers={["Inwestor", "Adres"]}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
        />
    );
}
