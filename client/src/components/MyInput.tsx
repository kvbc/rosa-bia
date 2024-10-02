import { HTMLInputTypeAttribute } from "react";

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
                <select
                    value={entry[entryKey]}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            [entryKey]: e.target.value,
                        })
                    }
                    disabled={uneditable ? true : disabled}
                >
                    {selectOptions &&
                        selectOptions.map((selectOption) => (
                            <option
                                value={selectOption.value}
                                key={selectOption.value}
                            >
                                {selectOption.name}
                            </option>
                        ))}
                </select>
            )}
            {type !== "select" && (
                <input
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
