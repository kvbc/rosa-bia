import { HTMLInputTypeAttribute, useEffect, useReducer, useState } from "react";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Checkbox } from "@mui/joy";

export type MyInputSelectOption = {
    value: string | number;
    name: string;
};

export type MyInputProps<TEntry extends { [key: string]: any }> = {
    entry: TEntry;
    setEntry: (entry: TEntry) => void;
    type: HTMLInputTypeAttribute | "select";
    entryKey: keyof TEntry;
    uneditable?: boolean;
    selectOptions?: MyInputSelectOption[];
    getSelectOptions?: (entry: TEntry) => MyInputSelectOption[];
    placeholder?: string;
    disabled?: boolean;
};

export default function MyInput<TEntry extends { [key: string]: any }>({
    entry,
    setEntry,
    getSelectOptions,
    type,
    entryKey,
    uneditable,
    selectOptions,
    placeholder,
    disabled,
}: MyInputProps<TEntry>) {
    if (!selectOptions && getSelectOptions) {
        selectOptions = getSelectOptions(entry);
    }

    // const [, rerender] = useReducer((x) => x + 1, 0);
    // useEffect(() => {
    //     if (getSelectOptions) rerender();
    // }, [entry]);

    return (
        <>
            {type === "select" && (
                <Select
                    value={entry[entryKey]}
                    onChange={(e, v) =>
                        selectOptions &&
                        selectOptions.length > 0 &&
                        setEntry({
                            ...entry,
                            [entryKey]: v,
                        })
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
                            setEntry({
                                ...entry,
                                [entryKey]: e.target.checked,
                            });
                        }}
                        disabled={uneditable ? true : disabled}
                    />
                ) : (
                    <Input
                        size="sm"
                        type={type}
                        value={entry[entryKey]}
                        onChange={(e) => {
                            setEntry({
                                ...entry,
                                [entryKey]: e.target.value,
                            });
                        }}
                        disabled={uneditable ? true : disabled}
                        placeholder={placeholder}
                    />
                ))}
        </>
    );
}
