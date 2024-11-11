/*
 *
 * Tabela danych wniosku
 *
 */

import { DB } from "../../../../../server/src/db/types";
import React, { PropsWithChildren, useContext, useMemo } from "react";
import { PageRegistersContext } from "../../../contexts/pages/PageRegistersContext";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";
import { MyTable as Tb } from "../../../components/my_table/MyTable";
import { MyTableHeader as Th } from "../../../components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "../../../components/my_table/MyTableRow";
import { MyTableCell as Tc } from "../../../components/my_table/MyTableCell";

export default function RegisterDataTableEdit({
    inputs,
    row,
    showMore,
    children,
}: PropsWithChildren<
    TableEditRowContentComponentProps<DB.Rows.Register> & {
        showMore: boolean;
    }
>) {
    const pageContext = useContext(PageRegistersContext)!;

    const investor = useMemo(
        () =>
            pageContext.investorsDBTable.rows.find(
                (investor) => investor.id === row.app_investor_id
            ),
        [pageContext.investorsDBTable.rows, row.app_investor_id]
    );

    const subtype = DB.Rows.REGISTER_TYPE_INFOS[row.type].subtype;

    return (
        <Tb
            myHeaders={[
                <Th key="1" colSpan={2}>
                    Dane wniosku
                </Th>,
            ]}
            overflow="visible"
        >
            {row.type === "Dz. bud" && (
                <>
                    <Tr>
                        <Tc height="60px">Złożony w dniu</Tc>
                        <Tc height="60px">{inputs.app_submission_date}</Tc>
                    </Tr>
                    <Tr>
                        <Tc height="60px">Nr decyzji PnB</Tc>
                        <Tc height="60px">{inputs.app_number}</Tc>
                    </Tr>
                    <Tr>
                        <Tc height="60px">Typ dziennika</Tc>
                        <Tc height="60px">
                            {inputs.app_construction_journal_type}
                        </Tc>
                    </Tr>
                </>
            )}
            {row.type !== "Dz. bud" && (
                <>
                    <Tr>
                        <Tc height="60px">Numer zgłoszenia</Tc>
                        <Tc height="60px">{inputs.app_number}</Tc>
                    </Tr>
                    <Tr>
                        <Tc height="60px" position="relative">
                            Data złożenia
                            {/* show more button */}
                            {children}
                        </Tc>
                        <Tc height="60px">{inputs.app_submission_date}</Tc>
                    </Tr>
                    {showMore && (
                        <>
                            <Tr>
                                <Tc colSpan={2}>
                                    <Tb
                                        isCollapsible
                                        myHeaders={
                                            <>
                                                <Th>Inwestor</Th>
                                            </>
                                        }
                                    >
                                        <Tr>
                                            <Tc>{inputs.app_investor_id}</Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>{investor?.address ?? "-"}</Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            <Tr>
                                <Tc colSpan={2}>
                                    <Tb
                                        isCollapsible
                                        myHeaders={
                                            <>
                                                <Th colSpan={2}>
                                                    {subtype === "Mayor"
                                                        ? "Decyzja Starosty Człuchowskiego"
                                                        : subtype === "Cert"
                                                        ? "Zaświadczenie / Decyzja"
                                                        : "Odpowiedź"}
                                                </Th>
                                            </>
                                        }
                                    >
                                        <Tr>
                                            <Tc colSpan={2}>
                                                {inputs.app_decision_type}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>Numer decyzji</Tc>
                                            <Tc>
                                                {inputs.app_decision_number}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>Data wydania</Tc>
                                            <Tc>
                                                {inputs.app_decision_issue_date}
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            <Tr height="full">
                                <Tc colSpan={2} height="full">
                                    <Tb
                                        isCollapsible
                                        myHeaders={
                                            <>
                                                <Th colSpan={2}>
                                                    Inne rozstrzygnięcie
                                                </Th>
                                            </>
                                        }
                                    >
                                        <Tr>
                                            <Tc colSpan={2}>
                                                {inputs.app_resolution_type}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>Numer pisma</Tc>
                                            <Tc>
                                                {inputs.app_resolution_number}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>Data wydania</Tc>
                                            <Tc>
                                                {
                                                    inputs.app_resolution_issue_date
                                                }
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                        </>
                    )}
                </>
            )}
        </Tb>
    );
}
