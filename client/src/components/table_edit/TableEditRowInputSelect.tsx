import React, { useEffect, useMemo, useState } from "react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "../ui/select";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { TableEditRowType } from "./TableEdit";
import { createListCollection } from "@chakra-ui/react";

export type TableEditRowInputSelectOption = {
    value: string | number;
    name: string;
};

export function TableEditRowInputSelect<TRow extends TableEditRowType>({
    row,
    setRow,
    rowKey,
    disabled,
    onBlur,
    getSelectOptions,
}: TableEditRowInputProps<TRow>) {
    const [selectOptions, setSelectOptions] = useState<
        TableEditRowInputSelectOption[]
    >([]);

    useEffect(() => {
        if (getSelectOptions) {
            setSelectOptions(getSelectOptions(row));
        }
    }, [getSelectOptions, row]);

    const selectOptionsCollection = useMemo(
        () =>
            createListCollection({
                items: selectOptions,
                itemToString: (item) => item.name,
                itemToValue: (item) => String(item.value),
            }),
        [selectOptions]
    );

    return (
        <SelectRoot
            size="sm"
            collection={selectOptionsCollection}
            disabled={disabled}
            onBlur={onBlur}
            value={[String(row[rowKey])]}
            onValueChange={(e) =>
                selectOptions &&
                selectOptions.length > 0 &&
                setRow((row) => ({
                    ...row,
                    [rowKey]: e.value,
                }))
            }
        >
            <SelectTrigger>
                <SelectValueText />
            </SelectTrigger>
            <SelectContent>
                {selectOptionsCollection.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
}
