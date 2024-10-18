import { Table } from "@mui/joy";
import { DBRows } from "../../../../../server/src/dbTypes";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";

export default function RegisterCharParamsTableEdit(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { inputs } = props;

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
                    <td>{inputs.object_demo_building_area}</td>
                </tr>
                <tr>
                    <td>Powierzchnia użytkowa [m²]</td>
                    <td>{inputs.object_demo_usable_area}</td>
                </tr>
                <tr>
                    <td>Kubatura [m³]</td>
                    <td>{inputs.object_demo_volume}</td>
                </tr>
                <tr>
                    <td>Ilość budynków [szt.]</td>
                    <td>{inputs.object_demo_building_count}</td>
                </tr>
            </tbody>
        </Table>
    );
}
