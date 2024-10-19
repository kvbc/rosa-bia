import { DBRows } from "../../../../../server/src/dbTypes";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import RegisterAdminProcedureActionsTableRow from "./RegisterAdminProcedureActionsTableRow";
import MyTableTH from "../../../components/MyTableth";
import MyTableTR from "../../../components/MyTableTR";
import MyTable from "../../../components/MyTable";

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { row } = props;

    return (
        <MyTable size="sm">
            <thead>
                <MyTableTR>
                    <MyTableTH>Czynności</MyTableTH>
                    <MyTableTH>Wybór</MyTableTH>
                    <MyTableTH>Termin [dni]</MyTableTH>
                    <MyTableTH>Data pisma</MyTableTH>
                    <MyTableTH>Data odebrania</MyTableTH>
                    <MyTableTH>Data odpowiedzi</MyTableTH>
                </MyTableTR>
            </thead>
            <tbody>
                {DBRows.REGISTER_TYPE_INFOS[row.type].actionTypes.map(
                    (actionType) => (
                        <RegisterAdminProcedureActionsTableRow
                            key={actionType}
                            actionType={actionType}
                            {...props}
                        />
                    )
                )}
            </tbody>
        </MyTable>
    );
}
