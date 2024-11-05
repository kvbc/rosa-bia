import React, { useEffect, useMemo, useState } from "react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "../ui/select";
import { TableEditRowInputProps } from "./TableEditRowInput";
import {
    getTableEditColor,
    nextTableEditColorValue,
    TableEditRowType,
} from "./TableEdit";
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
    primaryBgColorValue,
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
            variant="outline"
        >
            <SelectTrigger
                border="1px solid"
                borderRadius="sm"
                borderColor={getTableEditColor(
                    nextTableEditColorValue(primaryBgColorValue, 2)
                )}
                // _disabled={{
                //     borderColor: getTableEditColor(
                //         nextTableEditColorValue(primaryBgColorValue)
                //     ),
                // }}
                _disabled={{ opacity: "50%" }}
            >
                <SelectValueText />
            </SelectTrigger>
            <SelectContent
                border="1px solid"
                borderColor={getTableEditColor(
                    nextTableEditColorValue(primaryBgColorValue, 2)
                )}
                backgroundColor={getTableEditColor(primaryBgColorValue)}
            >
                {selectOptionsCollection.items.map((item) => (
                    <SelectItem
                        item={item}
                        key={item.value}
                        backgroundColor={getTableEditColor(primaryBgColorValue)}
                        _hover={{
                            backgroundColor: getTableEditColor(
                                nextTableEditColorValue(primaryBgColorValue)
                            ),
                        }}
                    >
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
}
