import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import * as DB from "@shared/db";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";

export default function RegisterAdminProcedureActionsDBTableEditRowContent({
    row,
    inputs,
}: TableEditRowContentComponentProps<DB.Rows.RegisterAdminAction>) {
    return (
        <>
            <Tc>{row.type}</Tc>
            <Tc>{inputs.select}</Tc>
            <Tc>{inputs.deadline}</Tc>
            <Tc>{inputs.letter_date}</Tc>
            <Tc>{inputs.receipt_date}</Tc>
            <Tc>{inputs.reply_date}</Tc>
        </>
    );
}
