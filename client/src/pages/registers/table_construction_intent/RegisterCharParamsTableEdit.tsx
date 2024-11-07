import { DB } from "../../../../../server/src/db/types";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/TableEditRowContentComponent";
import { Table } from "@mui/joy";

export default function RegisterCharParamsTableEdit(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
) {
    const { renderInput } = props;

    return (
        <Table size="sm" sx={{ height: "100%" }}>
            <thead>
                <tr>
                    <th colSpan={2}>Charakterystyczne parametry</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Powierzchnia zabudowy [m²]</td>
                    <td>{renderInput("object_demo_building_area")}</td>
                </tr>
                <tr>
                    <td>Powierzchnia użytkowa [m²]</td>
                    <td>{renderInput("object_demo_usable_area")}</td>
                </tr>
                <tr>
                    <td>Kubatura [m³]</td>
                    <td>{renderInput("object_demo_volume")}</td>
                </tr>
                <tr>
                    <td>Ilość budynków [szt.]</td>
                    <td>{renderInput("object_demo_building_count")}</td>
                </tr>
            </tbody>
        </Table>
    );
}
