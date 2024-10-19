/*
 *
 * Tabela danych wniosku
 *
 */

import { DBRows } from "../../../../../server/src/dbTypes";
import React, { useContext, useMemo } from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import { PageRegistersContext } from "../../../contexts/PageRegistersContext";
import MyTableTR from "../../../components/MyTableTR";
import MyTableTH from "../../../components/MyTableth";
import MyTableTD from "../../../components/MyTableTD";
import MyTable from "../../../components/MyTable";

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
        <MyTable size="sm">
            <thead>
                <MyTableTR>
                    <MyTableTH colSpan={2}>Dane Wniosku</MyTableTH>
                </MyTableTR>
            </thead>
            <tbody>
                <MyTableTR>
                    <MyTableTD>Numer zgłoszenia</MyTableTD>
                    <MyTableTD>{inputs.app_number}</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTD>Data złozenia</MyTableTD>
                    <MyTableTD>{inputs.app_submission_date}</MyTableTD>
                </MyTableTR>
                {showMore && (
                    <>
                        <MyTableTR>
                            <MyTableTD colSpan={2}>
                                <MyTable size="sm">
                                    <thead>
                                        <MyTableTR>
                                            <MyTableTH>Inwestor</MyTableTH>
                                        </MyTableTR>
                                    </thead>
                                    <tbody>
                                        <MyTableTR>
                                            <MyTableTD>
                                                {inputs.app_investor_id}
                                            </MyTableTD>
                                        </MyTableTR>
                                        <MyTableTR>
                                            <MyTableTD>
                                                {investor?.address}
                                            </MyTableTD>
                                        </MyTableTR>
                                    </tbody>
                                </MyTable>
                            </MyTableTD>
                        </MyTableTR>
                        <MyTableTR>
                            <MyTableTD colSpan={2}>
                                <MyTable size="sm">
                                    <thead>
                                        <MyTableTR>
                                            <MyTableTH colSpan={2}>
                                                {DBRows.REGISTER_TYPE_INFOS[
                                                    row.type
                                                ].subtype === "Mayor"
                                                    ? "Decyzja starosty Człuchowskiego"
                                                    : "Zaświadczenie / Decyzja"}
                                            </MyTableTH>
                                        </MyTableTR>
                                    </thead>
                                    <tbody>
                                        <MyTableTR>
                                            <MyTableTD colSpan={2}>
                                                {inputs.app_decision_type}
                                            </MyTableTD>
                                        </MyTableTR>
                                        <MyTableTR>
                                            <MyTableTD>Numer decyzji</MyTableTD>
                                            <MyTableTD>
                                                {inputs.app_decision_number}
                                            </MyTableTD>
                                        </MyTableTR>
                                        <MyTableTR>
                                            <MyTableTD>Data wydania</MyTableTD>
                                            <MyTableTD>
                                                {inputs.app_decision_issue_date}
                                            </MyTableTD>
                                        </MyTableTR>
                                    </tbody>
                                </MyTable>
                            </MyTableTD>
                        </MyTableTR>
                        <MyTableTR>
                            <MyTableTD colSpan={2}>
                                <MyTable size="sm">
                                    <thead>
                                        <MyTableTR>
                                            <MyTableTH colSpan={2}>
                                                Inne rozstrzygnięcie
                                            </MyTableTH>
                                        </MyTableTR>
                                    </thead>
                                    <tbody>
                                        <MyTableTR>
                                            <MyTableTD colSpan={2}>
                                                {inputs.app_resolution_type}
                                            </MyTableTD>
                                        </MyTableTR>
                                        <MyTableTR>
                                            <MyTableTD>Numer pisma</MyTableTD>
                                            <MyTableTD>
                                                {inputs.app_resolution_number}
                                            </MyTableTD>
                                        </MyTableTR>
                                        <MyTableTR>
                                            <MyTableTD>Data wydania</MyTableTD>
                                            <MyTableTD>
                                                {
                                                    inputs.app_resolution_issue_date
                                                }
                                            </MyTableTD>
                                        </MyTableTR>
                                    </tbody>
                                </MyTable>
                            </MyTableTD>
                        </MyTableTR>
                    </>
                )}
            </tbody>
        </MyTable>
    );
}
