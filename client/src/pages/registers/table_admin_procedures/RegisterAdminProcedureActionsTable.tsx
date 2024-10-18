import { DBRows } from "../../../../../server/src/dbTypes";
import { Table } from "@mui/joy";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import RegisterAdminProcedureActionsTableRow from "./RegisterAdminProcedureActionsTableRow";

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { row } = props;

    return (
        <Table size="sm">
            <thead>
                <tr>
                    <th>Czynności</th>
                    <th>Wybór</th>
                    <th>Termin [dni]</th>
                    <th>Data pisma</th>
                    <th>Data odebrania</th>
                    <th>Data odpowiedzi</th>
                </tr>
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
        </Table>
    );
}
