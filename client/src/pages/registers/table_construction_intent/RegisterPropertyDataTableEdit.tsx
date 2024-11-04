import { DB } from "../../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/TableEditRowContentComponent";
import React from "react";
import { Table } from "@mui/joy";

export default function RegisterPropertyDataTableEdit({
    inputs,
    row,
    place,
    area,
}: {
    place?: DB.Rows.Place;
    area?: DB.Rows.Place;
} & TableEditRowContentComponentProps<DB.Rows.Register>) {
    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th colSpan={4}>Dane nieruchomości</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Gmina</th>
                    <td>{inputs._object_commune_id}</td>
                    <th scope="row">Jedn. ewid.</th>
                    <td>{place?.cad_unit}</td>
                </tr>
                <tr>
                    <th>Miejscowość</th>
                    <td>{inputs._object_place_id}</td>
                    <th scope="row">Obręb</th>
                    <td>{area?.name}</td>
                </tr>
                <tr>
                    <th>Ulica</th>
                    <td>{inputs.object_street_id}</td>
                    <th scope="row">Nr</th>
                    <td>{row.object_number}</td>
                </tr>
            </tbody>
        </Table>
    );
}
