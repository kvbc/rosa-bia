import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import React, { useMemo } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { TableEditHeader } from "../../components/table_edit/TableEdit";
import { TableEditRowInputsProps } from "../../components/table_edit/row/TableEditRow";

export default function PageEmployees() {
    const dbTable = useDBTable<DB.Rows.Employee>("employees");

    const headers = useMemo<TableEditHeader[]>(
        () => ["Nazwa", "Hasło", "Administrator"],
        []
    );

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Employee>>(
        () => ({
            name: "",
            password: "",
            admin: Number(false),
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
            headers={headers}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
        />
    );
}
