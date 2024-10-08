/*
 *
 * Tabela danych wniosku
 *
 */

import { Table } from "@mui/joy";
import {
    Register,
    REGISTER_TYPES_DECISION_TYPES,
    RegisterType,
} from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";

export default function RegisterDataTable({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<Register>) {
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
                    <td>{inputs.wniosek_numer}</td>
                </tr>
                <tr>
                    <td>Data złozenia</td>
                    <td>{inputs.wniosek_data_zlozenia}</td>
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
                                    <td>{inputs.wniosek_inwestor_id}</td>
                                </tr>
                                <tr>
                                    <td>Informacje o inwestorze ...</td>
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
                                        {REGISTER_TYPES_DECISION_TYPES[
                                            entry.typ
                                        ] === "Mayor"
                                            ? "Decyzja starosty Człuchowskiego"
                                            : "Decyzja Zaświadczenie"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        {inputs.wniosek_decyzja_typ}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Numer decyzji</td>
                                    <td>{inputs.wniosek_decyzja_numer}</td>
                                </tr>
                                <tr>
                                    <td>Data wydania</td>
                                    <td>
                                        {inputs.wniosek_decyzja_data_wydania}
                                    </td>
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
                                        {inputs.wniosek_rozstrzygniecie_typ}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Numer pisma</td>
                                    <td>
                                        {
                                            inputs.wniosek_rozstrzygniecie_numer_pisma
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Data wydania</td>
                                    <td>
                                        {
                                            inputs.wniosek_rozstrzygniecie_data_wydania
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
