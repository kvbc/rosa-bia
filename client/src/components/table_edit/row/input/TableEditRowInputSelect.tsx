// 1

import React, { useEffect, useState } from "react";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { TableEditRowType } from "@/components/table_edit/TableEdit";
import {
    MyInputSelect,
    MySelectOption,
} from "@/components/my_input/MyInputSelect";

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
    }, [getSelectOptions, row, rowKey]);

    return (
        <MyInputSelect
            options={selectOptions}
            value={row[rowKey] as string | number}
            fontSize="inherit"
            onValueChanged={(value) =>
                setRow((row) => ({
                    ...row,
                    [rowKey]: value,
                }))
            }
            disabled={disabled}
            onBlur={onFocusOut}
        />
    );
}
