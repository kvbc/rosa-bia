import { ComponentProps } from "react";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import { ClientRegister } from "../PageRegisters";

export default function RegisterConstructionJournalTableEdit({
    inputs,
    ...myTableProps
}: ComponentProps<typeof Tb> &
    TableEditRowContentComponentProps<ClientRegister>) {
    return (
        <Tb isCollapsible {...myTableProps}>
            <Th colSpan={2}>Dziennik budowy</Th>
            <Tr>
                <Tc>Nr dziennika</Tc>
                <Tc>{inputs.admin_construction_journal_number}</Tc>
            </Tr>
            <Tr>
                <Tc>Wydany w dniu</Tc>
                <Tc>{inputs.admin_construction_journal_date}</Tc>
            </Tr>
            <Tr>
                <Tc>Numer tomu</Tc>
                <Tc>{inputs.admin_construction_journal_tome}</Tc>
            </Tr>
        </Tb>
    );
}
