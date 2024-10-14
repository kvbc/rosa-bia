/*
 *
 * Tabela danych wniosku
 *
 */

import { Table } from "@mui/joy";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";
import { DBRows } from "../../../../server/src/dbTypes";

export default function RegisterDataTable({
    inputs,
    row: entry,
    editable,
    setRow: setEntry,
}: TableEditRowContentComponentProps<DBRows.Register>) {
    const investorDBEntries = useDBEntriesStore<DBRows.Investor>("investors")(); // prettier-ignore
    const investor = investorDBEntries.rows.find(fEntry => fEntry.id === entry.app_investor_id); // prettier-ignore

    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th colSpan={2}>Dane Wniosku</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Numer zgłoszenia</td>
                    <td>{inputs.app_number}</td>
                </tr>
                <tr>
                    <td>Data złozenia</td>
                    <td>{inputs.app_submission_date}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Table
                            size="sm"
                            sx={{ backgroundColor: "rgb(243 244 246)" }}
                        >
                            <thead>
                                <tr>
                                    <th>Inwestor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{inputs.app_investor_id}</td>
                                </tr>
                                <tr>
                                    <td>{investor?.info}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Table
                            size="sm"
                            sx={{ backgroundColor: "rgb(243 244 246)" }}
                        >
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        {DBRows.REGISTER_TYPE_INFOS[entry.type]
                                            .subtype === "Mayor"
                                            ? "Decyzja starosty Człuchowskiego"
                                            : "Decyzja Zaświadczenie"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        {inputs.app_decision_type}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Numer decyzji</td>
                                    <td>{inputs.app_decision_number}</td>
                                </tr>
                                <tr>
                                    <td>Data wydania</td>
                                    <td>{inputs.app_decision_issue_date}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <Table
                            size="sm"
                            sx={{ backgroundColor: "rgb(243 244 246)" }}
                        >
                            <thead>
                                <tr>
                                    <th colSpan={2}>Inne rozstrzygnięcie</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        {inputs.app_resolution_type}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Numer pisma</td>
                                    <td>{inputs.app_resolution_number}</td>
                                </tr>
                                <tr>
                                    <td>Data wydania</td>
                                    <td>{inputs.app_resolution_issue_date}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
