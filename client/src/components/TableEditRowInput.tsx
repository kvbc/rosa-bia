//
// TableEditRowInput.tsx
// Input component to be used inside of a TableEditRow
//

import React, { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Checkbox } from "@mui/joy";
import { TableEditRowType } from "./TableEdit";

export type TableEditRowInputSelectOption = {
    value: string | number;
    name: string;
};

export type TableEditRowInputProps<TRow extends TableEditRowType> = {
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    type: HTMLInputTypeAttribute | "select";
    rowKey: keyof TRow & string;
    selectOptions?: TableEditRowInputSelectOption[];
    placeholder?: string;
    disabled?: boolean;
    onBlur: () => void;
};

export default function TableEditRowInput<TRow extends TableEditRowType>({
    row,
    setRow,
    type,
    rowKey,
    selectOptions,
    placeholder,
    disabled,
    onBlur,
}: TableEditRowInputProps<TRow>) {
    return (
        <>
            {type === "select" && (
                <Select
                    value={row[rowKey]}
                    onChange={(_, value) =>
                        selectOptions &&
                        selectOptions.length > 0 &&
                        setRow((row) => ({
                            ...row,
                            [rowKey]: value,
                        }))
                    }
                    onBlur={onBlur}
                    disabled={disabled}
                >
                    {selectOptions &&
                        selectOptions.map((selectOption) => (
                            <Option
                                value={selectOption.value}
                                key={selectOption.value}
                            >
                                {selectOption.name}
                            </Option>
                        ))}
                </Select>
            )}
            {type !== "select" &&
                (type === "checkbox" ? (
                    <Checkbox
                        size="sm"
                        checked={row[rowKey] as boolean}
                        onChange={(e) => {
                            setRow((row) => ({
                                ...row,
                                [rowKey]: e.target.checked,
                            }));
                        }}
                        onBlur={onBlur}
                        disabled={disabled}
                    />
                ) : (
                    <Input
                        size="sm"
                        type={type}
                        value={row[rowKey] as string | number}
                        onChange={(e) => {
                            setRow((row) => ({
                                ...row,
                                [rowKey]: e.target.value,
                            }));
                        }}
                        onBlur={onBlur}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                ))}
        </>
    );
}
