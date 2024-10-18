import { Table } from "@mui/joy";
import { DBRows } from "../../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import React from "react";

export default function RegisterPropertyDataTableEdit({
    inputs,
    row,
    place,
    area,
}: {
    place?: DBRows.Place;
    area?: DBRows.Place;
} & TableEditRowContentComponentProps<DBRows.Register>) {
    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th colSpan={2}>Dane nieruchomości</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Table size="sm">
                            <tbody>
                                <tr>
                                    <th>Gmina</th>
                                    <td>{inputs._object_commune_id}</td>
                                </tr>
                                <tr>
                                    <th>Miejscowość</th>
                                    <td>{inputs._object_place_id}</td>
                                </tr>
                                <tr>
                                    <th>Ulica</th>
                                    <td>{inputs.object_street_id}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                    <td>
                        <Table
                            size="sm"
                            sx={{
                                height: "100%",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <th>Jedn. ewid.</th>
                                    <td>{place?.cad_unit}</td>
                                </tr>
                                <tr>
                                    <th>Obręb</th>
                                    <td>{area?.name}</td>
                                </tr>
                                <tr>
                                    <th>Nr</th>
                                    <td>{row.object_number}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
