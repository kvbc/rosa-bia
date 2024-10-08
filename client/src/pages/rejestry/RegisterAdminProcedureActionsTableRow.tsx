import { useEffect, useState } from "react";
import {
    Register,
    RegisterAdminActions,
    RegisterAdminActionType,
} from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { Input } from "@mui/joy";

export default function RegisterAdminProcedureActionsTableRow({
    inputs,
    entry,
    editable,
    setEntry,
    actionType,
    eventEmitter,
}: {
    actionType: RegisterAdminActionType;
} & TableEditRowContentProps<Register>) {
    const registerAdminActionsDBEntries = useDBEntriesStore<RegisterAdminActions>('rejestry_czynnosci_admin')(); // prettier-ignore
    const dbAction = registerAdminActionsDBEntries.entries.find(
        (fEntry) => fEntry.rejestr_id === entry.id && fEntry.typ === actionType
    );
    const [action, setAction] = useState<RegisterAdminActions>(
        dbAction
            ? { ...dbAction }
            : {
                  id: registerAdminActionsDBEntries.entryCount + 1,
                  data_odebrania: "",
                  data_odpowiedzi: "",
                  data_pisma: "",
                  rejestr_id: entry.id,
                  termin: 0,
                  typ: actionType,
                  wybor: false,
              }
    );

    useEffect(() => {
        return eventEmitter.on("save", () => {
            registerAdminActionsDBEntries.saveEntry(action);
        });
    }, [eventEmitter]);

    useEffect(() => {
        if (dbAction) {
            setAction({ ...dbAction });
        }
    }, [dbAction]);

    return (
        <tr>
            <td>{actionType}</td>
            <td>
                <Input
                    type="checkbox"
                    value={action.wybor ? "yes" : "no"}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            wybor: e.target.value === "yes",
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="number"
                    value={action.termin}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            termin: e.target.valueAsNumber,
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="date"
                    value={action.data_pisma}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            data_pisma: e.target.value,
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="date"
                    value={action.data_odebrania}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            data_odebrania: e.target.value,
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="date"
                    value={action.data_odpowiedzi}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            data_odpowiedzi: e.target.value,
                        }))
                    }
                />
            </td>
        </tr>
    );
}
