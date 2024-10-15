import DBTableEdit from "../../components/DBTableEdit";
import React from "react";
import useDBTable from "../../hooks/useDBTable";
import { DBRows } from "../../../../server/src/dbTypes";

export default function PageInvestors() {
    const dbTable = useDBTable<DBRows.Investor>("investors");

    return (
        <DBTableEdit
            dbTable={dbTable}
            headers={["Inwestor", "Adres", "Informacje"]}
            defaultRow={{
                address: "",
                name: "",
                info: "",
            }}
            rowInputsProps={[
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
            ]}
        />
    );
}
