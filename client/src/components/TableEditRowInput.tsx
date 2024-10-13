//
// TableEditRowInput.tsx
// Input component to be used inside of a TableEditRow
//
// FIXME: todo
//

import React, {
    Dispatch,
    HTMLInputTypeAttribute,
    SetStateAction,
    useEffect,
    useReducer,
    useState,
} from "react";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Checkbox } from "@mui/joy";

export type TableEditRowInputSelectOption = {
    value: string | number;
    name: string;
};

export type TableEditRowInputProps<TEntry extends { [key: string]: any }> = {
    entry: TEntry;
    setEntry: Dispatch<SetStateAction<TEntry>>;
    type: HTMLInputTypeAttribute | "select";
    entryKey: keyof TEntry;
    uneditable?: boolean;
    selectOptions?: TableEditRowInputSelectOption[];
    placeholder?: string;
    disabled?: boolean;
};

export default function TableEditRowInput<
    TEntry extends { [key: string]: any }
>({
    entry,
    setEntry,
    type,
    entryKey,
    uneditable,
    selectOptions,
    placeholder,
    disabled,
}: TableEditRowInputProps<TEntry>) {
    return (
        <>
            {type === "select" && (
                <Select
                    value={entry[entryKey]}
                    onChange={(_, value) =>
                        selectOptions &&
                        selectOptions.length > 0 &&
                        setEntry((entry) => ({
                            ...entry,
                            [entryKey]: value,
                        }))
                    }
                    disabled={uneditable ? true : disabled}
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
                        checked={entry[entryKey]}
                        onChange={(e) => {
                            setEntry((entry) => ({
                                ...entry,
                                [entryKey]: e.target.checked,
                            }));
                        }}
                        disabled={uneditable ? true : disabled}
                    />
                ) : (
                    <Input
                        size="sm"
                        type={type}
                        value={entry[entryKey]}
                        onChange={(e) => {
                            setEntry((entry) => ({
                                ...entry,
                                [entryKey]: e.target.value,
                            }));
                        }}
                        disabled={uneditable ? true : disabled}
                        placeholder={placeholder}
                    />
                ))}
        </>
    );
}
