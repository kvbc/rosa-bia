import { DB } from "../../../../../server/src/db/types";
import React from "react";
import RegisterAdminProcedureActionsTableRow from "./RegisterAdminProcedureActionsTableRow";
import { MyTable as Tb } from "../../../components/my_table/MyTable";
import { MyTableHeader as Th } from "../../../components/my_table/MyTableHeader";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
) {
    const { row } = props;

    return (
        <Tb
            isCollapsible
            myHeaders={
                <>
                    <Th>Czynności</Th>
                    <Th>Wybór</Th>
                    <Th>Termin [dni]</Th>
                    <Th>Data pisma</Th>
                    <Th>Data odebrania</Th>
                    <Th>Data odpowiedzi</Th>
                </>
            }
        >
            {DB.Rows.REGISTER_TYPE_INFOS[row.type].actionTypes.map(
                (actionType) => (
                    <RegisterAdminProcedureActionsTableRow
                        key={actionType}
                        actionType={actionType}
                        {...props}
                    />
                )
            )}
        </Tb>
    );
}
