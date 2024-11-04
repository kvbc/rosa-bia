import RegisterAdminProcedureActionsTable from "./RegisterAdminProcedureActionsTable";
import { DB } from "../../../../../server/src/db/types";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/TableEditRowContentComponent";
import { Table } from "@mui/joy";

export default function RegisterAdminProceduresTableEdit(
    props: TableEditRowContentComponentProps<DB.Rows.Register> & {
        showMore: boolean;
    }
) {
    const { inputs, row, showMore } = props;

    return (
        <Table size="sm" sx={{ height: "100%" }}>
            <thead>
                <tr>
                    <th colSpan={2}>Postępowanie administracyjne</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Informacja o postępowaniu</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>Upływający czas w dniach</td>
                    <td>...</td>
                </tr>
                {showMore && (
                    <>
                        <tr>
                            <td colSpan={2}>
                                <RegisterAdminProcedureActionsTable
                                    {...props}
                                />
                            </td>
                        </tr>
                        {DB.Rows.REGISTER_TYPE_INFOS[row.type]
                            .showAdminConstructionJournal && (
                            <tr>
                                <td colSpan={2}>
                                    <Table size="sm">
                                        <thead>
                                            <tr>
                                                <th colSpan={2}>
                                                    Dziennik budowy
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Numer</td>
                                                <td>
                                                    {
                                                        inputs.admin_construction_journal_number
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Z dnia</td>
                                                <td>
                                                    {
                                                        inputs.admin_construction_journal_date
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        )}
                    </>
                )}
            </tbody>
        </Table>
    );
}
