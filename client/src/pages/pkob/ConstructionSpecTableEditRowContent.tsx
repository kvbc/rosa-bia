import { DBRows } from "../../../../server/src/dbTypes";
import React from "react";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import MyTableTD from "../../components/MyTableTD";
import MyTableTR from "../../components/MyTableTR";
import MyTableTH from "../../components/MyTableth";
import MyTable from "../../components/MyTable";

export default function ConstructionSpecTableEditRowContent({
    inputs,
}: TableEditRowContentComponentProps<DBRows.ConstructionSpec>) {
    return (
        <MyTableTD>
            <MyTable size="sm">
                <MyTableTR>
                    <MyTableTH>Nazwa</MyTableTH>
                    <MyTableTD>{inputs.name}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTH>Kat. OB</MyTableTH>
                    <MyTableTD>{inputs.ob_cat}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTH>Klasa ZL.</MyTableTH>
                    <MyTableTD>{inputs.zl_class}</MyTableTD>
                </MyTableTR>
            </MyTable>
        </MyTableTD>
    );
}
