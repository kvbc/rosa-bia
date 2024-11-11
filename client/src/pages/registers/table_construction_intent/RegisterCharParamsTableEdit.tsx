import { DB } from "../../../../../server/src/db/types";
import React from "react";
import { MyTable as Tb } from "../../../components/my_table/MyTable";
import { MyTableCell as Tc } from "../../../components/my_table/MyTableCell";
import { MyTableHeader as Th } from "../../../components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "../../../components/my_table/MyTableRow";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";

export default function RegisterCharParamsTableEdit(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
) {
    const { inputs } = props;

    return (
        <Tb
            height="full"
            isCollapsible
            myHeaders={
                <>
                    <Th colSpan={2}>Charakterystyczne parametry</Th>
                </>
            }
        >
            <Tr>
                <Tc>Powierzchnia zabudowy [m²]</Tc>
                <Tc>{inputs.object_demo_building_area}</Tc>
            </Tr>
            <Tr>
                <Tc>Powierzchnia użytkowa [m²]</Tc>
                <Tc>{inputs.object_demo_usable_area}</Tc>
            </Tr>
            <Tr>
                <Tc>Kubatura [m³]</Tc>
                <Tc>{inputs.object_demo_volume}</Tc>
            </Tr>
            <Tr>
                <Tc>Ilość budynków [szt.]</Tc>
                <Tc>{inputs.object_demo_building_count}</Tc>
            </Tr>
        </Tb>
    );
}
