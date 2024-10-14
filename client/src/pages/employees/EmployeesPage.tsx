import DBTableEdit from "../../components/DBTableEdit";
import React from "react";

export default function EmployeesPage() {
    return (
        <DBTableEdit
            dbTableName="employees"
            headers={["Nazwa", "Hasło", "Administrator"]}
            emptyRow={{
                id: 0,
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
