import { Input, Table } from "@mui/joy";
import {
    Register,
    REGISTER_TYPE_INFOS,
    RegisterAdminActions,
} from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { useEffect } from "react";
import RegisterAdminProcedureActionsTableRow from "./RegisterAdminProcedureActionsTableRow";

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentProps<Register>
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
                {REGISTER_TYPE_INFOS[entry.typ].actionTypes.map(
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
