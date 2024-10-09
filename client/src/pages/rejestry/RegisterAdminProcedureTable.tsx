import { Table } from "@mui/joy";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import RegisterAdminProcedureActionsTable from "./RegisterAdminProcedureActionsTable";
import { DB } from "../../../../server/src/dbTypes";

export default function RegisterAdminProcedureTable(
    props: TableEditRowContentProps<DB.Register>
) {
    const { inputs, entry, editable, setEntry } = props;

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
                {DB.REGISTER_TYPE_INFOS[entry.type]
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
