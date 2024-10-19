import RegisterAdminProcedureActionsTable from "./RegisterAdminProcedureActionsTable";
import { DBRows } from "../../../../../server/src/dbTypes";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import MyTableTD from "../../../components/MyTableTD";
import MyTableTR from "../../../components/MyTableTR";
import MyTableTH from "../../../components/MyTableth";
import MyTable from "../../../components/MyTable";

export default function RegisterAdminProceduresTableEdit(
    props: TableEditRowContentComponentProps<DBRows.Register> & {
        showMore: boolean;
    }
) {
    const { inputs, row, showMore } = props;

    return (
        <MyTable size="sm" sx={{ height: "100%" }}>
            <thead>
                <MyTableTR>
                    <MyTableTH colSpan={2}>
                        Postępowanie administracyjne
                    </MyTableTH>
                </MyTableTR>
            </thead>
            <tbody>
                <MyTableTR>
                    <MyTableTD>Informacja o postępowaniu</MyTableTD>
                    <MyTableTD>...</MyTableTD>
                </MyTableTR>
                <MyTableTR>
                    <MyTableTD>Upływający czas w dniach</MyTableTD>
                    <MyTableTD>...</MyTableTD>
                </MyTableTR>
                {showMore && (
                    <>
                        <MyTableTR>
                            <MyTableTD colSpan={2}>
                                <RegisterAdminProcedureActionsTable
                                    {...props}
                                />
                            </MyTableTD>
                        </MyTableTR>
                        {DBRows.REGISTER_TYPE_INFOS[row.type]
                            .showAdminConstructionJournal && (
                            <MyTableTR>
                                <MyTableTD colSpan={2}>
                                    <MyTable size="sm">
                                        <thead>
                                            <MyTableTR>
                                                <MyTableTH colSpan={2}>
                                                    Dziennik budowy
                                                </MyTableTH>
                                            </MyTableTR>
                                        </thead>
                                        <tbody>
                                            <MyTableTR>
                                                <MyTableTD>Numer</MyTableTD>
                                                <MyTableTD>
                                                    {
                                                        inputs.admin_construction_journal_number
                                                    }
                                                </MyTableTD>
                                            </MyTableTR>
                                            <MyTableTR>
                                                <MyTableTD>Z dnia</MyTableTD>
                                                <MyTableTD>
                                                    {
                                                        inputs.admin_construction_journal_date
                                                    }
                                                </MyTableTD>
                                            </MyTableTR>
                                        </tbody>
                                    </MyTable>
                                </MyTableTD>
                            </MyTableTR>
                        )}
                    </>
                )}
            </tbody>
        </MyTable>
    );
}
