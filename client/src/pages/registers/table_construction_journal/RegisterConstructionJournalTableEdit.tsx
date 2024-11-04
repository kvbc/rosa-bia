import { DB } from "../../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/TableEditRowContentComponent";
import React, { useContext } from "react";
import { PageRegistersContext } from "../../../contexts/pages/PageRegistersContext";
import { Table } from "@mui/joy";

export default function RegisterConstructionJournalTableEdit({
    inputs,
}: TableEditRowContentComponentProps<DB.Rows.Register>) {
    const pageContext = useContext(PageRegistersContext);
    if (!pageContext) {
        throw "Error";
    }

    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th colSpan={2}>Dziennik budowy</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Nr dziennika</td>
                    <td>{inputs.admin_construction_journal_number}</td>
                </tr>
                <tr>
                    <td>Wydany w dniu</td>
                    <td>{inputs.admin_construction_journal_date}</td>
                </tr>
                <tr>
                    <td>Numer tomu</td>
                    <td>{inputs.admin_construction_journal_tome}</td>
                </tr>
            </tbody>
        </Table>
    );
}
