// 1

import React, { ComponentProps, ReactNode, useContext, useMemo } from "react";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "./ui/select";
import { ColorContext } from "../contexts/ColorContext";
import { createListCollection, HStack } from "@chakra-ui/react";

export type MySelectOption = {
    preNameNode?: ReactNode;
    postNameNode?: ReactNode;
    value: string | number;
    name: string;
};

export function createMySelectOptions(stringArray: string[]): MySelectOption[] {
    return stringArray.map<MySelectOption>((str) => ({
        value: str,
        name: str,
    }));
}

export function MySelect({
    options,
    value,
    onValueChanged,
    ...selectRootProps
}: {
    options: MySelectOption[];
    value: string;
    onValueChanged: (value: string) => void;
} & Omit<
    ComponentProps<typeof SelectRoot>,
    "collection" | "value" | "onValueChange"
>) {
    const colorContext = useContext(ColorContext);

    const collection = useMemo(
        () =>
            createListCollection({
                items: options,
                itemToString: (option) => option.name,
                itemToValue: (option) => String(option.value),
            }),
        [options]
    );

    return (
        <SelectRoot
            size="sm"
            collection={collection}
            value={[value]}
            onValueChange={(e) => onValueChanged(e.value[0])}
            variant="outline"
            fontSize="inherit"
            {...selectRootProps}
        >
            <SelectTrigger
                fontSize="inherit"
                border="1px solid"
                borderRadius="sm"
                borderColor={colorContext.border}
                backgroundColor={colorContext.bg2}
                _disabled={{ opacity: "50%" }}
            >
                <SelectValueText
                    // FIXME: font size does not inherit?
                    // fontSize="inherit"
                    fontSize="xs" // from MyTable.tsx
                >
                    {(items) => {
                        const item = items[0];
                        return (
                            <HStack>
                                {item.preNameNode}
                                {item.name}
                                {item.postNameNode}
                            </HStack>
                        );
                    }}
                </SelectValueText>
            </SelectTrigger>
            <SelectContent
                fontSize="inherit"
                border="1px solid"
                backgroundColor={colorContext.bg2}
                borderColor={colorContext.border}
            >
                {options.map((option) => (
                    <SelectItem
                        // FIXME: same thing as above
                        fontSize="xs"
                        item={option}
                        justifyContent="flex-start"
                        key={option.name}
                        backgroundColor={colorContext.bg2}
                        _hover={{
                            backgroundColor: colorContext.border,
                        }}
                    >
                        {option.preNameNode}
                        {option.name}
                        {option.postNameNode}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
}
