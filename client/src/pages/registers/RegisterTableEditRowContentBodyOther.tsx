import React from "react";
import { TableEditRowContentComponentProps } from "../../components/table_edit/row/TableEditRowContentComponent";
import { DB } from "../../../../server/src/db/types";
import { MyTable as Tb } from "../../components/my_table/MyTable";
import { MyTableRow as Tr } from "../../components/my_table/MyTableRow";
import { MyTableHeaderRow as ThRow } from "../../components/my_table/MyTableHeaderRow";
import { MyTableCell as Tc } from "../../components/my_table/MyTableCell";

export function RegisterTableEditRowContentBodyOther(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
) {
    const { inputs } = props;

    return (
        <Tb>
            <Tr>
                <ThRow>Sprawa</ThRow>
                <Tc>{inputs.other_case_title}</Tc>
            </Tr>
            <Tr>
                <ThRow>Od kogo</ThRow>
                <Tc>{inputs.other_case_from}</Tc>
            </Tr>
            <Tr>
                <ThRow>Znak pisma</ThRow>
                <Tc>{inputs.other_case_sign}</Tc>
            </Tr>
            <Tr>
                <ThRow>Z dnia</ThRow>
                <Tc>{inputs.other_case_date}</Tc>
            </Tr>
            <Tr>
                <ThRow>Data wszczęcia</ThRow>
                <Tc>{inputs.other_case_init_date}</Tc>
            </Tr>
            <Tr>
                <ThRow>Data ostatecznego załatwienia</ThRow>
                <Tc>{inputs.other_case_settle_date}</Tc>
            </Tr>
            <Tr>
                <ThRow>Uwagi</ThRow>
                <Tc>{inputs.other_case_comments}</Tc>
            </Tr>
        </Tb>
    );
}
