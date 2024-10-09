import { useEffect, useState } from "react";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { Input } from "@mui/joy";
import { DB } from "../../../../server/src/dbTypes";

export default function RegisterAdminProcedureActionsTableRow({
    inputs,
    entry,
    editable,
    setEntry,
    actionType,
    eventEmitter,
}: {
    actionType: DB.RegisterAdminActionType;
} & TableEditRowContentProps<DB.Register>) {
    const registerAdminActionsDBEntries = useDBEntriesStore<DB.RegisterAdminAction>('registers_admin_actions')(); // prettier-ignore
    const dbAction = registerAdminActionsDBEntries.entries.find(
        (fEntry) =>
            fEntry.register_id === entry.id && fEntry.type === actionType
    );
    const [action, setAction] = useState<DB.RegisterAdminAction>(
        dbAction
            ? { ...dbAction }
            : {
                  id: registerAdminActionsDBEntries.entryCount + 1,
                  receipt_date: "",
                  reply_date: "",
                  letter_date: "",
                  register_id: entry.id,
                  deadline: 0,
                  type: actionType,
                  select: false,
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
                    value={action.select ? "yes" : "no"}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            select: e.target.value === "yes",
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="number"
                    value={action.deadline}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            deadline: e.target.valueAsNumber,
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="date"
                    value={action.letter_date}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            letter_date: e.target.value,
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="date"
                    value={action.receipt_date}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            receipt_date: e.target.value,
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="date"
                    value={action.reply_date}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            reply_date: e.target.value,
                        }))
                    }
                />
            </td>
        </tr>
    );
}
