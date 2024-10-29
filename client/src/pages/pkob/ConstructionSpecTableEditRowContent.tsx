import { DB } from "../../../../server/src/db/types";
import React from "react";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { Table } from "@mui/joy";

export default function ConstructionSpecTableEditRowContent({
    inputs,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionSpec>) {
    return (
        <td>
            <Table size="sm">
                <tr>
                    <th>Nazwa</th>
                    <td>{inputs.name}</td>
                </tr>
                <tr>
                    <th>Kat. OB</th>
                    <td>{inputs.ob_cat}</td>
                </tr>
                <tr>
                    <th>Klasa ZL.</th>
                    <td>{inputs.zl_class}</td>
                </tr>
            </Table>
        </td>
    );
}
