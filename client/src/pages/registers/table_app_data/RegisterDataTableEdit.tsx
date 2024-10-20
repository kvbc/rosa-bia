/*
 *
 * Tabela danych wniosku
 *
 */

import { DBRows } from "../../../../../server/src/dbTypes";
import React, { useContext, useMemo } from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import { PageRegistersContext } from "../../../contexts/PageRegistersContext";
import { Table } from "@mui/joy";

export default function RegisterDataTableEdit({
    inputs,
    row,
    showMore,
}: TableEditRowContentComponentProps<DBRows.Register> & {
    showMore: boolean;
}) {
    const pageContext = useContext(PageRegistersContext);
    if (!pageContext) {
        throw "Error";
    }

    const investor = useMemo(
        () =>
            pageContext.investorsDBTable.rows.find(
                (investor) => investor.id === row.app_investor_id
            ),
        [pageContext.investorsDBTable.rows, row.app_investor_id]
    );

    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th colSpan={2}>Dane Wniosku</th>
                </tr>
            </thead>
            <tbody>
                {row.type !== "Dz. bud" && (
                    <>
                        <tr>
                            <td>Numer zgłoszenia</td>
                            <td>{inputs.app_number}</td>
                        </tr>
                        <tr>
                            <td>Data złozenia</td>
                            <td>{inputs.app_submission_date}</td>
                        </tr>
                        {showMore && (
                            <>
                                <tr>
                                    <td colSpan={2}>
                                        <Table size="sm">
                                            <thead>
                                                <tr>
                                                    <th>Inwestor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {inputs.app_investor_id}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>{investor?.address}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Table size="sm">
                                            <thead>
                                                <tr>
                                                    <th colSpan={2}>
                                                        {DBRows
                                                            .REGISTER_TYPE_INFOS[
                                                            row.type
                                                        ].subtype === "Mayor"
                                                            ? "Decyzja starosty Człuchowskiego"
                                                            : "Zaświadczenie / Decyzja"}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2}>
                                                        {
                                                            inputs.app_decision_type
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Numer decyzji</td>
                                                    <td>
                                                        {
                                                            inputs.app_decision_number
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Data wydania</td>
                                                    <td>
                                                        {
                                                            inputs.app_decision_issue_date
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <Table size="sm">
                                            <thead>
                                                <tr>
                                                    <th colSpan={2}>
                                                        Inne rozstrzygnięcie
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2}>
                                                        {
                                                            inputs.app_resolution_type
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Numer pisma</td>
                                                    <td>
                                                        {
                                                            inputs.app_resolution_number
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Data wydania</td>
                                                    <td>
                                                        {
                                                            inputs.app_resolution_issue_date
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </td>
                                </tr>
                            </>
                        )}
                    </>
                )}
                {row.type === "Dz. bud" && (
                    <>
                        <tr>
                            <td>Złożony w dniu</td>
                            <td>{inputs.app_submission_date}</td>
                        </tr>
                        <tr>
                            <td>Nr decyzji PnB</td>
                            <td>{inputs.app_number}</td>
                        </tr>
                        <tr>
                            <td>Typ dziennika</td>
                            <td>{inputs.app_construction_journal_type}</td>
                        </tr>
                    </>
                )}
            </tbody>
        </Table>
    );
}
