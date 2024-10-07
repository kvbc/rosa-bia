import { HTMLInputTypeAttribute } from "react";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

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
    placeholder?: string;
    disabled?: boolean;
};

export default function MyInput<TEntry extends { [key: string]: any }>({
    entry,
    setEntry,
    type,
    entryKey,
    uneditable,
    selectOptions,
    placeholder,
    disabled,
}: MyInputProps<TEntry>) {
    return (
        <>
            {type === "select" && (
                <Select
                    value={entry[entryKey]}
                    onChange={(e, v) =>
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
            {type !== "select" && (
                <Input
                    size="sm"
                    type={type}
                    value={entry[entryKey]}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            [entryKey]: e.target.value,
                        })
                    }
                    disabled={uneditable ? true : disabled}
                    placeholder={placeholder}
                />
            )}
        </>
    );
}
