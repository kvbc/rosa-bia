import { Table } from "@mui/joy";
import RegisterAdminProcedureActionsTable from "./RegisterAdminProcedureActionsTable";
import { DBRows } from "../../../../../server/src/dbTypes";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";

export default function RegisterAdminProceduresTableEdit(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { inputs, row } = props;

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
                <tr>
                    <td colSpan={2}>
                        <RegisterAdminProcedureActionsTable {...props} />
                    </td>
                </tr>
                {DBRows.REGISTER_TYPE_INFOS[row.type]
                    .showAdminConstructionJournal && (
                    <tr>
                        <td colSpan={2}>
                            <Table size="sm">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>Dziennik budowy</th>
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
            </tbody>
        </Table>
    );
}
