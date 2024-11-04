import { DB } from "../../../../../server/src/db/types";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/TableEditRowContentComponent";
import RegisterAdminProcedureActionsTableRow from "./RegisterAdminProcedureActionsTableRow";
import { Table } from "@mui/joy";

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
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
                {DB.Rows.REGISTER_TYPE_INFOS[row.type].actionTypes.map(
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
