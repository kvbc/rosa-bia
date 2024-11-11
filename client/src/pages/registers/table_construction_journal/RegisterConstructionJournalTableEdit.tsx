import { DB } from "../../../../../server/src/db/types";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";
import { MyTable as Tb } from "../../../components/my_table/MyTable";
import { MyTableHeader as Th } from "../../../components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "../../../components/my_table/MyTableRow";
import { MyTableCell as Tc } from "../../../components/my_table/MyTableCell";

export default function RegisterConstructionJournalTableEdit({
    inputs,
}: TableEditRowContentComponentProps<DB.Rows.Register>) {
    return (
        <Tb
            isCollapsible
            myHeaders={
                <>
                    <Th colSpan={2}>Dziennik budowy</Th>
                </>
            }
        >
            <Tr>
                <Tc height="60px">Nr dziennika</Tc>
                <Tc height="60px">
                    {inputs.admin_construction_journal_number}
                </Tc>
            </Tr>
            <Tr>
                <Tc height="60px">Wydany w dniu</Tc>
                <Tc height="60px">{inputs.admin_construction_journal_date}</Tc>
            </Tr>
            <Tr>
                <Tc height="60px">Numer tomu</Tc>
                <Tc height="60px">{inputs.admin_construction_journal_tome}</Tc>
            </Tr>
        </Tb>
    );
}
