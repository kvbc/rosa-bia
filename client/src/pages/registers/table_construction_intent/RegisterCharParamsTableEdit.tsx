import { DBRows } from "../../../../../server/src/dbTypes";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import MyTableTR from "../../../components/MyTableTR";
import MyTableTH from "../../../components/MyTableth";
import MyTableTD from "../../../components/MyTableTD";
import MyTable from "../../../components/MyTable";

export default function RegisterCharParamsTableEdit(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { inputs } = props;

    return (
        <MyTable size="sm" sx={{ height: "100%" }}>
            <thead>
                <MyTableTR>
                    <MyTableTH colSpan={2}>
                        Charakterystyczne parametry
                    </MyTableTH>
                </MyTableTR>
            </thead>
            <tbody>
                <MyTableTR>
                    <MyTableTD>Powierzchnia zabudowy [m²]</MyTableTD>
                    <MyTableTD>{inputs.object_demo_building_area}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTD>Powierzchnia użytkowa [m²]</MyTableTD>
                    <MyTableTD>{inputs.object_demo_usable_area}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTD>Kubatura [m³]</MyTableTD>
                    <MyTableTD>{inputs.object_demo_volume}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTD>Ilość budynków [szt.]</MyTableTD>
                    <MyTableTD>{inputs.object_demo_building_count}</MyTableTD>
                </MyTableTR>
            </tbody>
        </MyTable>
    );
}
