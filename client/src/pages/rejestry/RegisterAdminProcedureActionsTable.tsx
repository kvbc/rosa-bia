import { Input, Table } from "@mui/joy";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBTableStore";
import { useEffect } from "react";
import RegisterAdminProcedureActionsTableRow from "./RegisterAdminProcedureActionsTableRow";
import { DB } from "../../../../server/src/dbTypes";

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentProps<DB.Register>
) {
    const { inputs, entry, editable, setEntry } = props;

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
                {DB.REGISTER_TYPE_INFOS[entry.type].actionTypes.map(
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
