import { Input, Table } from "@mui/joy";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRow";
import { useEffect } from "react";
import RegisterAdminProcedureActionsTableRow from "../RegisterAdminProcedureActionsTableRow";
import { DBRows } from "../../../../../server/src/dbTypes";

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { inputs, row: entry, editable, setRow: setEntry } = props;

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
                {DBRows.REGISTER_TYPE_INFOS[entry.type].actionTypes.map(
                    (actionType) => (
                        <RegisterAdminProcedureActionsTableRow
                            {...props}
                            actionType={actionType}
                        />
                    )
                )}
            </tbody>
        </Table>
    );
}
