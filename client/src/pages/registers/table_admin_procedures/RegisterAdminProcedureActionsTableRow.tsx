import { useContext, useEffect, useMemo, useState } from "react";
import { Checkbox, Input } from "@mui/joy";
import { DBRows } from "../../../../../server/src/dbTypes";
import { PageRegistersContext } from "../../../contexts/PageRegistersContext";
import React from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import MyTableTR from "../../../components/MyTableTR";
import MyTableTD from "../../../components/MyTableTD";

export default function RegisterAdminProcedureActionsTableRow({
    row,
    editable,
    actionType,
    eventTarget,
    onInputBlur,
}: {
    actionType: DBRows.RegisterAdminActionType;
} & TableEditRowContentComponentProps<DBRows.Register>) {
    const pageContext = useContext(PageRegistersContext);
    if (!pageContext) {
        throw "Error";
    }

    const dbAction = useMemo(
        () =>
            pageContext.registerAdminActionsDBTable.rows.find(
                (fRow) =>
                    fRow.register_id === row.id && fRow.type === actionType
            ),
        [actionType, pageContext.registerAdminActionsDBTable.rows, row.id]
    );
    const [action, setAction] = useState<DBRows.RegisterAdminAction>(
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
                pageContext.registerAdminActionsDBTable.requestUpdateRow(
                    action
                );
            } else {
                pageContext.registerAdminActionsDBTable.requestAddRow(action);
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
        <MyTableTR>
            <MyTableTD className="break-all">{actionType}</MyTableTD>
            <MyTableTD>
                <Checkbox
                    size="sm"
                    onBlur={onInputBlur}
                    checked={Boolean(action.select)}
                    disabled={!editable}
                    onChange={(e) =>
                        setAction((action) => ({
                            ...action,
                            select: Number(e.target.checked),
                        }))
                    }
                />
            </MyTableTD>
            <MyTableTD>
                <Input
                    size="sm"
                    onBlur={onInputBlur}
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
            </MyTableTD>
            <MyTableTD>
                <Input
                    size="sm"
                    onBlur={onInputBlur}
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
            </MyTableTD>
            <MyTableTD>
                <Input
                    size="sm"
                    onBlur={onInputBlur}
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
            </MyTableTD>
            <MyTableTD>
                <Input
                    size="sm"
                    onBlur={onInputBlur}
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
            </MyTableTD>
        </MyTableTR>
    );
}
