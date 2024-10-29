import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import React, { useMemo } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowInputsProps } from "../../components/TableEditRow";

export default function PageEmployees() {
    const dbTable = useDBTable<DB.Rows.Employee>("employees");

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Employee>>(
        () => ({
            name: "",
            password: "",
            admin: 0,
            has_password: false,
        }),
        []
    );

    const rowInputsProps = useMemo<TableEditRowInputsProps<DB.Rows.Employee>>(
        () => [
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
        ],
        []
    );

    return (
        <DBTableEdit
            dbTable={dbTable}
            headers={["Nazwa", "Hasło", "Administrator"]}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
        />
    );
}
