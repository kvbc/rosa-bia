//
// TableEditRowInput.tsx
// Input component to be used inside of a TableEditRow
//

import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import {
    getTableEditColor,
    nextTableEditColorValue,
    TableEditColorValue,
    TableEditRowType,
} from "./TableEdit";
import { Input } from "@chakra-ui/react";
import {
    TableEditRowInputSelect,
    TableEditRowInputSelectOption,
} from "./TableEditRowInputSelect";
import { TableEditRowInputCheckbox } from "./TableEditRowInputCheckbox";

export type TableEditRowInputProps<TRow extends TableEditRowType> = {
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    type: HTMLInputTypeAttribute | "select";
    rowKey: keyof TRow & string;
    getSelectOptions?: (row: TRow) => TableEditRowInputSelectOption[];
    placeholder?: string;
    disabled?: boolean;
    primaryBgColorValue: TableEditColorValue;
    onBlur: () => void;
};

export function TableEditRowInput<TRow extends TableEditRowType>(
    props: TableEditRowInputProps<TRow>
) {
    const {
        row,
        setRow,
        type,
        rowKey,
        placeholder,
        disabled,
        onBlur,
        primaryBgColorValue,
    } = props;

    switch (type) {
        case "select":
            return <TableEditRowInputSelect {...props} />;
        case "checkbox":
            return <TableEditRowInputCheckbox {...props} />;
    }

    return (
        <Input
            size="sm"
            type={type}
            value={row[rowKey] as string | number}
            backgroundColor={getTableEditColor(primaryBgColorValue)}
            borderColor={getTableEditColor(
                nextTableEditColorValue(primaryBgColorValue, 2)
            )}
            onChange={(e) => {
                setRow((row) => ({
                    ...row,
                    [rowKey]:
                        type === "number"
                            ? e.target.valueAsNumber
                            : e.target.value,
                }));
            }}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
        />
    );
}