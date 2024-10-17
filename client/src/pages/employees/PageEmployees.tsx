import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import React, { useMemo } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowInputsProps } from "../../components/TableEditRow";

export default function PageEmployees() {
    const dbTable = useDBTable<DBRows.Employee>("employees");

    const defaultRow = useMemo<DBTableEditDefaultRow<DBRows.Employee>>(
        () => ({
            name: "",
            password: "",
            admin: false,
        }),
        []
    );

    const rowInputsProps = useMemo<TableEditRowInputsProps<DBRows.Employee>>(
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
