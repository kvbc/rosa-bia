/*
 *
 * Tabela danych wniosku
 *
 */

import * as DB from "@shared/db";
import React, { ComponentProps, useContext, useMemo } from "react";
import { PageRegistersContext } from "@/contexts/pages/PageRegistersContext";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { MyTable, MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import { topRowHeight } from "../RegisterTableEditRowContent";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";
import { ClientRegister } from "../PageRegisters";

export default function RegisterDataTableEdit({
    inputs,
    row,
    showMore,
    children,
    ...myTableProps
}: ComponentProps<typeof MyTable> &
    TableEditRowContentComponentProps<ClientRegister> & {
        showMore: boolean;
    }) {
    const pageContext = useContext(PageRegistersContext)!;

    const investor = useMemo(
        () =>
            pageContext.investorsDBTable.rows.find(
                (investor) => investor.id === row.app_investor_id
            ),
        [pageContext.investorsDBTable.rows, row.app_investor_id]
    );

    const decisionTitle = useMemo(() => {
        switch (row.type) {
            case "PnB (6740)":
            case "PnRozb. (6741)":
            case "ZRiD (7012)":
            case "Uzupełniający":
            case "Wejście na dz. sąsiednią":
                return "Decyzja Starosty Człuchowskiego";
            case "Zg. Rozb. (6743.1)":
            case "Zg. Zwykłe (6743.2)":
            case "Zm. Sp. Użytk. (6743.3)":
            case "BiP (6743.4)":
            case "Samodz. Lokali (705)":
            case "Tymczasowe (6743.5)":
                return "Zaświadczenie / Decyzja";
            case "Pisma różne (670)":
                return "Odpowiedź";
            case "Dz. bud":
            case "Konserwator (Inne)":
            case "Lokalizacja inwestycji (Inne)":
            case "PiNB (Inne)":
                return <FeatureUnfinishedIcon />;
        }
    }, [row.type]);

    return (
        <Tb
            myHeaders={[
                <Th key="1" colSpan={2}>
                    Dane wniosku
                </Th>,
            ]}
            overflow="visible"
            {...myTableProps}
        >
            {row.type === "Dz. bud" && (
                <>
                    <Tr>
                        <Tc>Złożony w dniu</Tc>
                        <Tc>{inputs.app_submission_date}</Tc>
                    </Tr>
                    <Tr>
                        <Tc>Nr decyzji PnB</Tc>
                        <Tc>{inputs.app_number}</Tc>
                    </Tr>
                    <Tr>
                        <Tc>Typ dziennika</Tc>
                        <Tc>{inputs.app_construction_journal_type}</Tc>
                    </Tr>
                </>
            )}
            {row.type !== "Dz. bud" && (
                <>
                    <Tr height={topRowHeight}>
                        <Tc>Numer zgłoszenia</Tc>
                        <Tc>{inputs.app_number}</Tc>
                    </Tr>
                    <Tr height={topRowHeight}>
                        <Tc position="relative">
                            Data złożenia
                            {/* show more button */}
                            {children}
                        </Tc>
                        <Tc>{inputs.app_submission_date}</Tc>
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
                                                    {decisionTitle}
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
