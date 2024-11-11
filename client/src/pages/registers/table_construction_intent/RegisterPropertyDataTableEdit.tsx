import { DB } from "../../../../../server/src/db/types";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";
import { MyTable as Tb } from "../../../components/my_table/MyTable";
import { MyTableCell as Tc } from "../../../components/my_table/MyTableCell";
import { MyTableHeader as Th } from "../../../components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "../../../components/my_table/MyTableRow";

export default function RegisterPropertyDataTableEdit({
    inputs,
    place,
    area,
}: {
    place?: DB.Rows.Place;
    area?: DB.Rows.Place;
} & TableEditRowContentComponentProps<DB.Rows.Register>) {
    return (
        <Tb
            isCollapsible
            myHeaders={
                <>
                    <Th colSpan={4}>Dane nieruchomości</Th>
                </>
            }
        >
            <Tr>
                <Tc>Gmina</Tc>
                <Tc>{inputs._object_commune_id}</Tc>
                <Tc>Jedn. ewid.</Tc>
                <Tc>{place?.cad_unit ?? "-"}</Tc>
            </Tr>
            <Tr>
                <Tc>Miejscowość</Tc>
                <Tc>{inputs._object_place_id}</Tc>
                <Tc>Obręb</Tc>
                <Tc>{area?.name ?? "-"}</Tc>
            </Tr>
            <Tr>
                <Tc>Ulica</Tc>
                <Tc>{inputs.object_street_id}</Tc>
                <Tc>Nr</Tc>
                <Tc>{inputs.object_number}</Tc>
            </Tr>
        </Tb>
    );
}
