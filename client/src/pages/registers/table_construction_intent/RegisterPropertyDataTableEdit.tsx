import { DBRows } from "../../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import React from "react";
import MyTableTR from "../../../components/MyTableTR";
import MyTableTH from "../../../components/MyTableth";
import MyTableTD from "../../../components/MyTableTD";
import MyTable from "../../../components/MyTable";

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
        <MyTable size="sm">
            <thead>
                <MyTableTR>
                    <MyTableTH colSpan={4}>Dane nieruchomości</MyTableTH>
                </MyTableTR>
            </thead>
            <tbody>
                <MyTableTR>
                    <MyTableTH>Gmina</MyTableTH>
                    <MyTableTD>{inputs._object_commune_id}</MyTableTD>
                    <MyTableTH scope="row">Jedn. ewid.</MyTableTH>
                    <MyTableTD>{place?.cad_unit}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTH>Miejscowość</MyTableTH>
                    <MyTableTD>{inputs._object_place_id}</MyTableTD>
                    <MyTableTH scope="row">Obręb</MyTableTH>
                    <MyTableTD>{area?.name}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTH>Ulica</MyTableTH>
                    <MyTableTD>{inputs.object_street_id}</MyTableTD>
                    <MyTableTH scope="row">Nr</MyTableTH>
                    <MyTableTD>{row.object_number}</MyTableTD>
                </MyTableTR>
            </tbody>
        </MyTable>
    );
}
