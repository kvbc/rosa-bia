import { Table } from "@mui/joy";
import { Register, REGISTER_TYPE_INFOS } from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import RegisterAdminProcedureActionsTable from "./RegisterAdminProcedureActionsTable";

export default function RegisterAdminProcedureTable(
    props: TableEditRowContentProps<Register>
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
                {REGISTER_TYPE_INFOS[entry.typ]
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
                                            {inputs.admin_dziennik_budowy_numer}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Z dnia</td>
                                        <td>
                                            {inputs.admin_dziennik_budowy_data}
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
