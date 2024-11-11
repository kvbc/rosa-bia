import { useContext, useEffect, useMemo, useState } from "react";
import { DB } from "../../../../../server/src/db/types";
import { PageRegistersContext } from "../../../contexts/pages/PageRegistersContext";
import React from "react";
import { MyTableCell as Tc } from "../../../components/my_table/MyTableCell";
import { MyTableRow as Tr } from "../../../components/my_table/MyTableRow";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";
import { TableEditRowInputCheckbox } from "../../../components/table_edit/row/input/TableEditRowInputCheckbox";
import { TableEditRowInput } from "../../../components/table_edit/row/input/TableEditRowInput";
import { TableEditRowInputNumber } from "../../../components/table_edit/row/input/TableEditRowInputNumber";

export default function RegisterAdminProcedureActionsTableRow({
    row,
    editable,
    actionType,
    eventTarget,
    onInputFocusOut,
}: {
    actionType: DB.Rows.RegisterAdminActionType;
} & TableEditRowContentComponentProps<DB.Rows.Register>) {
    const pageContext = useContext(PageRegistersContext)!;

    const dbAction = useMemo(
        () =>
            pageContext.registerAdminActionsDBTable.rows.find(
                (fRow) =>
                    fRow.register_id === row.id && fRow.type === actionType
            ),
        [actionType, pageContext.registerAdminActionsDBTable.rows, row.id]
    );
    const [action, setAction] = useState<DB.Rows.RegisterAdminAction>(
        dbAction
            ? { ...dbAction }
            : {
                  id: pageContext.registerAdminActionsDBTable.totalRowCount + 1,
                  receipt_date: "",
                  reply_date: "",
                  letter_date: "",
                  register_id: row.id,
                  deadline: 0,
                  type: actionType,
                  select: 0,
              }
    );

    useEffect(() => {
        const onRowSaved = () => {
            console.log("nigga?");
            if (dbAction) {
                pageContext.registerAdminActionsDBTable.updateRowMutation.mutate(
                    action
                );
            } else {
                pageContext.registerAdminActionsDBTable.addRowMutation.mutate(
                    action
                );
            }
        };
        eventTarget.addEventListener("saved", onRowSaved);
        return () => {
            eventTarget.removeEventListener("saved", onRowSaved);
        };
    }, [
        eventTarget,
        action,
        pageContext.registerAdminActionsDBTable,
        dbAction,
    ]);

    useEffect(() => {
        if (dbAction) {
            setAction({ ...dbAction });
        }
    }, [dbAction]);

    return (
        <Tr>
            <Tc className="break-all">{actionType}</Tc>
            <Tc>
                <TableEditRowInputCheckbox
                    type="checkbox"
                    row={action}
                    setRow={setAction}
                    onFocusOut={onInputFocusOut}
                    rowKey="select"
                    disabled={!editable}
                />
                {/* <Checkbox
                    size="sm"
                    onBlur={onInputFocusOut}
                    checked={Boolean(action.select)}
                    disabled={!editable}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            select: Number(e.target.checked),
                        }))
                    }
                /> */}
            </Tc>
            <Tc>
                <TableEditRowInputNumber
                    type="number"
                    row={action}
                    setRow={setAction}
                    onFocusOut={onInputFocusOut}
                    rowKey="deadline"
                    disabled={!editable}
                />

                {/* <Input
                    size="sm"
                    onBlur={onInputFocusOut}
                    type="number"
                    value={action.deadline}
                    disabled={!editable}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            deadline: e.target.valueAsNumber,
                        }))
                    }
                /> */}
            </Tc>
            <Tc>
                <TableEditRowInput
                    type="date"
                    row={action}
                    setRow={setAction}
                    onFocusOut={onInputFocusOut}
                    rowKey="letter_date"
                    disabled={!editable}
                />
                {/* <Input
                    size="sm"
                    onBlur={onInputFocusOut}
                    type="date"
                    value={action.letter_date}
                    disabled={!editable}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            letter_date: e.target.value,
                        }))
                    }
                /> */}
            </Tc>
            <Tc>
                <TableEditRowInput
                    type="date"
                    row={action}
                    setRow={setAction}
                    onFocusOut={onInputFocusOut}
                    rowKey="receipt_date"
                    disabled={!editable}
                />
                {/* <Input
                    size="sm"
                    onBlur={onInputFocusOut}
                    type="date"
                    value={action.receipt_date}
                    disabled={!editable}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            receipt_date: e.target.value,
                        }))
                    }
                /> */}
            </Tc>
            <Tc>
                <TableEditRowInput
                    type="date"
                    row={action}
                    setRow={setAction}
                    onFocusOut={onInputFocusOut}
                    rowKey="reply_date"
                    disabled={!editable}
                />
                {/* <Input
                    size="sm"
                    onBlur={onInputFocusOut}
                    type="date"
                    value={action.reply_date}
                    disabled={!editable}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            reply_date: e.target.value,
                        }))
                    }
                /> */}
            </Tc>
        </Tr>
    );
}
