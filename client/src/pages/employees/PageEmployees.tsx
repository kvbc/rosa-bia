import DBTableEdit from "../../components/DBTableEdit";
import React from "react";
import useDBTable from "../../hooks/useDBTable";
import { DBRows } from "../../../../server/src/dbTypes";

export default function PageEmployees() {
    const dbTable = useDBTable<DBRows.Employee>("employees");

    return (
        <DBTableEdit
            dbTable={dbTable}
            headers={["Nazwa", "Hasło", "Administrator"]}
            defaultRow={{
                name: "",
                password: "",
                admin: false,
            }}
            rowInputsProps={[
                {
                    type: "text",
                    rowKey: "name",
                },
                {
                    type: "text",
                    rowKey: "password",
                },
                {
                    type: "checkbox",
                    rowKey: "admin",
                },
            ]}
        />
    );
}
