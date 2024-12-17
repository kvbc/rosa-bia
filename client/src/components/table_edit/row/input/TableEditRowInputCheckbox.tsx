// 1

import { TableEditRowType } from "@/components/table_edit/TableEdit";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { MyInputCheckbox } from "@/components/my_input/MyInputCheckbox";

export function TableEditRowInputCheckbox<TRow extends TableEditRowType>({
    disabled,
    row,
    onFocusOut,
    setRow,
    rowKey,
    isLocked,
    onLockClicked,
}: TableEditRowInputProps<TRow>) {
    return (
        <MyInputCheckbox
            checked={Boolean(row[rowKey])}
            onCheckedChange={(e) =>
                setRow((row) => ({
                    ...row,
                    [rowKey]: Number(e.checked),
                }))
            }
            onBlur={onFocusOut}
            disabled={disabled}
            isLocked={isLocked}
            onLockClicked={onLockClicked}
        />
    );
}
