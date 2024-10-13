import { useCallback, useEffect, useState } from "react";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBTableStore";
import { Checkbox, Input } from "@mui/joy";
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
    const dbAction = registerAdminActionsDBEntries.rows.find(
        (fEntry) =>
            fEntry.register_id === entry.id && fEntry.type === actionType
    );
    const [action, setAction] = useState<DB.RegisterAdminAction>(
        dbAction
            ? { ...dbAction }
            : {
                  id: registerAdminActionsDBEntries.totalRowCount + 1,
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
            registerAdminActionsDBEntries.saveRow(action);
        });
    }, [eventEmitter, action]);

    useEffect(() => {
        if (dbAction) {
            setAction({ ...dbAction });
        }
    }, [dbAction]);

    return (
        <tr>
            <td>{actionType}</td>
            <td>
                <Checkbox
                    checked={action.select}
                    disabled={!editable}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            select: e.target.checked,
                        }))
                    }
                />
            </td>
            <td>
                <Input
                    type="number"
                    value={action.deadline}
                    disabled={!editable}
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
                    disabled={!editable}
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
                    disabled={!editable}
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
                    disabled={!editable}
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
