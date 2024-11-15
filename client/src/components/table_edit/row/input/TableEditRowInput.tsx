//
// TableEditRowInput.tsx
// Input component to be used inside of a TableEditRow
//
// 1
//

import React, {
    ComponentProps,
    Dispatch,
    HTMLInputTypeAttribute,
    SetStateAction,
} from "react";
import { TableEditRowType } from "@/components/table_edit/TableEdit";
import { Center } from "@chakra-ui/react";
import { TableEditRowInputSelect } from "./TableEditRowInputSelect";
import { TableEditRowInputCheckbox } from "./TableEditRowInputCheckbox";
import { MySelectOption } from "@/components/my_input/MyInputSelect";
import MyInput from "@/components/my_input/MyInput";

export type TableEditRowInputProps<TRow extends TableEditRowType> = {
    type: HTMLInputTypeAttribute | "select";
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    rowKey: keyof TRow & string;
    placeholder?: string;
    disabled?: boolean;
    onFocusOut: () => void;
    getSelectOptions?: (row: TRow) => MySelectOption[];
};

export function TableEditRowInput<TRow extends TableEditRowType>(
    props: TableEditRowInputProps<TRow> &
        Omit<ComponentProps<typeof MyInput>, "value" | "onValueChanged">
) {
    const {
        row,
        setRow,
        type,
        rowKey,
        placeholder,
        disabled,
        onFocusOut,
        ...inputProps
    } = props;

    switch (type) {
        case "select":
            return <TableEditRowInputSelect {...props} />;
        case "checkbox":
            return (
                <Center>
                    <TableEditRowInputCheckbox {...props} />
                </Center>
            );
        // case "number":
        //     return <TableEditRowInputNumber {...props} />;
    }

    return (
        <MyInput
            type={type}
            value={row[rowKey] as string}
            onValueChanged={(value) =>
                setRow((row) => ({
                    ...row,
                    [rowKey]: type === "number" ? Number(value) : value,
                }))
            }
            disabled={disabled}
            onBlur={onFocusOut}
            placeholder={placeholder}
            {...inputProps}
        />
    );
}
