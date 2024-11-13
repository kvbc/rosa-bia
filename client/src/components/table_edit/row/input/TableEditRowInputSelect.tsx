// 1

import React, { useEffect, useState } from "react";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { TableEditRowType } from "@/components/table_edit/TableEdit";
import { MySelect, MySelectOption } from "@/components/MySelect";

export function TableEditRowInputSelect<TRow extends TableEditRowType>({
    row,
    setRow,
    rowKey,
    disabled,
    onFocusOut,
    getSelectOptions,
}: TableEditRowInputProps<TRow>) {
    const [selectOptions, setSelectOptions] = useState<MySelectOption[]>([]);

    useEffect(() => {
        if (getSelectOptions) {
            setSelectOptions(getSelectOptions(row));
        }
    }, [getSelectOptions, row]);

    return (
        <MySelect
            options={selectOptions}
            value={String(row[rowKey])}
            fontSize="inherit"
            onValueChanged={(value) =>
                setRow((row) => ({
                    ...row,
                    [rowKey]:
                        typeof row[rowKey] === "number" ? Number(value) : value,
                }))
            }
            disabled={disabled}
            onBlur={onFocusOut}
        />
    );
}
