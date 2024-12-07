import RegisterAdminProcedureActionsDBTableEdit from "./RegisterAdminProcedureActionsDBTableEdit";
import * as DB from "@shared/db";
import React, { ComponentProps, useContext, useEffect, useState } from "react";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { MyTable, MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import RegisterCharParamsTableEdit from "../table_construction_intent/RegisterCharParamsTableEdit";
import { topRowHeight } from "../RegisterTableEditRowContent";
import { isRegisterType } from "@/utils/array";
import { ClientRegister } from "../PageRegisters";
import { PageRegistersContext } from "@/contexts/pages/PageRegistersContext";
import { getDaysPassed } from "@/utils/time";

export default function RegisterAdminProceduresTableEdit(
    props: ComponentProps<typeof MyTable> &
        TableEditRowContentComponentProps<ClientRegister> & {
            showMore: boolean;
        }
) {
    const pageContext = useContext(PageRegistersContext)!;
    const { inputs, row, showMore, ...myTableProps } = props;

    const [infoState, setInfoState] = useState<string>("w toku");
    const [daysPassed, setDaysPassed] = useState<number>(
        getDaysPassed(Date.now(), row.app_submission_date)
    );

    const showCharParamsTable = row.type === "PnB (6740)";

    const showConstructionJournal = isRegisterType(
        row.type,
        "PnRozb. (6741)",
        "BiP (6743.4)",
        "ZRiD (7012)"
    );

    useEffect(() => {
        const trySetInfoState = (infoState: string | null | undefined) => {
            if (infoState !== null && infoState !== undefined) {
                setInfoState(infoState);
            }
        };

        const checkAction = (
            actionType: DB.Rows.RegisterAdminActionType,
            // defaultInfoState: string | null,
            getLetterDateInfoState?: (daysDiff: number) => string | null,
            getReceiptDateInfoState?: (daysDiff: number) => string | null,
            getReplyDateInfoState?: (daysDiff: number) => string | null
        ) => {
            // if (od_czego === undefined) {
            //     od_czego = actionType.toLowerCase().slice(0, -1) + "a";
            // }
            const action = pageContext.registerAdminActionsDBTable.rows.find(
                (action) =>
                    action.type === actionType &&
                    action.register_id === row.id &&
                    action.select
            );
            if (!action) {
                return;
            }
            if (action.reply_date) {
                const daysDiff = getDaysPassed(Date.now(), action.reply_date);
                if (getReplyDateInfoState) {
                    setDaysPassed(daysDiff);
                    trySetInfoState(getReplyDateInfoState?.(daysDiff));
                }
            } else if (action.receipt_date) {
                const daysDiff = getDaysPassed(Date.now(), action.receipt_date);
                if (getReceiptDateInfoState) {
                    setDaysPassed(daysDiff);
                    trySetInfoState(getReceiptDateInfoState?.(daysDiff));
                }
            } else if (action.letter_date) {
                const daysDiff = getDaysPassed(Date.now(), action.letter_date);
                if (getLetterDateInfoState) {
                    setDaysPassed(daysDiff);
                    trySetInfoState(getLetterDateInfoState?.(daysDiff));
                }
            } else {
                trySetInfoState(actionType.toLowerCase());
            }
        };

        checkAction(
            "Wezwanie",
            (daysDiff) => `${daysDiff} dni od wezwania`,
            (daysDiff) => `${daysDiff} dni - oczekiwanie na odpowiedź`,
            () => "w toku"
        );
        checkAction(
            "Zawiadomienie",
            (daysDiff) => `${daysDiff} dni od zawiadomienia`,
            (daysDiff) => `${daysDiff} dni od odebrania zawiadomienia`
        );
        checkAction(
            "Postanowienie",
            (daysDiff) => `${daysDiff} dni od postanowienia`,
            (daysDiff) => `${daysDiff} dni od odebrania postanowienia`,
            () => "w toku"
        );
        checkAction(
            "Konserwator",
            (daysDiff) => `${daysDiff} dni od pisma do konserwatora`,
            (daysDiff) => `${daysDiff} dni od odebrania pisma od konserwatora`,
            () => "w toku"
        );
    }, [pageContext.registerAdminActionsDBTable.rows, row.id]);

    return (
        <Tb {...myTableProps}>
            <Th colSpan={2}>
                {/* <HStack gap="1">
                    <FaBalanceScale /> Postępowanie administracyjne
                </HStack> */}
                Postępowanie administracyjne
            </Th>
            <Tr height={topRowHeight}>
                <Tc>Informacja o postępowaniu</Tc>
                <Tc>{infoState}</Tc>
            </Tr>
            <Tr height={topRowHeight}>
                <Tc>Upływający czas (dni)</Tc>
                <Tc>{Number.isNaN(daysPassed) ? "-" : daysPassed}</Tc>
            </Tr>
            {showMore && (
                <>
                    <Tr>
                        <Tc colSpan={2}>
                            <RegisterAdminProcedureActionsDBTableEdit
                                {...props}
                            />
                        </Tc>
                    </Tr>
                    {showConstructionJournal && (
                        <Tr>
                            <Tc colSpan={2}>
                                <Tb isCollapsible>
                                    <Th colSpan={2}>Dziennik budowy</Th>
                                    <Tr>
                                        <Tc>Numer</Tc>
                                        <Tc>
                                            {
                                                inputs.admin_construction_journal_number
                                            }
                                        </Tc>
                                    </Tr>
                                    <Tr>
                                        <Tc>Z dnia</Tc>
                                        <Tc>
                                            {
                                                inputs.admin_construction_journal_date
                                            }
                                        </Tc>
                                    </Tr>
                                </Tb>
                            </Tc>
                        </Tr>
                    )}
                    {showCharParamsTable && (
                        <Tr>
                            <Tc colSpan={2}>
                                <RegisterCharParamsTableEdit {...props} />
                            </Tc>
                        </Tr>
                    )}
                </>
            )}
        </Tb>
    );
}
