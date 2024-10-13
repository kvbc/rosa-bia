import DBTableEdit from "../../components/DBTableEdit";
import React from "react";

export default function InwestorzyStrona() {
    return (
        <DBTableEdit
            dbTableName="investors"
            headers={["ID", "Inwestor", "Adres", "Informacje"]}
            emptyRow={{
                id: 0,
                address: "",
                name: "",
                info: "",
            }}
            rowInputsProps={[
                {
                    type: "number",
                    rowKey: "id",
                },
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
