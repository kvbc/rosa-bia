// 1

import React, { HTMLProps, ReactNode, useContext } from "react";
import { Box, BoxProps, HStack } from "@chakra-ui/react";
import { ColorContext } from "@/contexts/ColorContext";

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

// const MyselectValueText;

export function MyInputSelect({
    options,
    value,
    onValueChanged,
    ...selectRootProps
}: {
    options: MySelectOption[];
    value: string | number;
    onValueChanged: (value: string | number) => void;
} & Omit<
    BoxProps & HTMLProps<HTMLSelectElement>,
    "collection" | "value" | "onValueChanged"
>) {
    const colorContext = useContext(ColorContext);

    return (
        <Box
            asChild
            width="full"
            backgroundColor={colorContext.bg2}
            // backgroundColor={colorContext.bg1}
            padding="1"
            border="1px solid"
            borderColor={colorContext.border}
            role="group"
            _disabled={{
                opacity: "50%",
            }}
            boxShadow="none"
            {...selectRootProps}
        >
            <select
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    return onValueChanged(typeof value === 'number' ? Number(newValue) : newValue);
                }}
            >
                {options.map((option) => (
                    <Box
                        asChild
                        key={option.name}
                        backgroundColor={colorContext.bg2}
                        borderColor={colorContext.border}
                        boxShadow="none"
                        // FIXME: this fucking background color
                        _hover={{
                            boxShadow: "0 0 10px 100px green inset",
                        }}
                        _groupHover={{
                            color: "red",
                            // backgroundColor: colorContext.border,
                        }}
                    >
                        <option value={option.value}>
                            <HStack>
                                {option.preNameNode}
                                {option.name}
                                {option.postNameNode}
                            </HStack>
                        </option>
                    </Box>
                ))}
            </select>
        </Box>
    );

    // return (
    //     <NativeSelectRoot
    //         size="sm"
    //         height="auto"
    //         icon={
    //             <Icon size="xs" bg="red">
    //                 <LuChevronDown />
    //             </Icon>
    //         }
    //         {...selectRootProps}
    //     >
    //         <NativeSelectField
    //             value={value}
    //             onChange={(e) => onValueChanged(e.currentTarget.value)}
    //             fontSize="inherit"
    //             border="1px solid"
    //             borderRadius="sm"
    //             borderColor={colorContext.border}
    //             backgroundColor={colorContext.bg2}
    //             // padding="0"
    //             // padding="0"
    //             paddingLeft="1"
    //             paddingBottom="0"
    //             paddingTop="0"
    //             _disabled={{ opacity: "50%" }}
    //         >
    //             {options.map((option) => (
    //                 <Box
    //                     as="option"
    //                     key={option.name}
    //                     fontSize="inherit"
    //                     _hover={{
    //                         backgroundColor: colorContext.border,
    //                     }}
    //                 >
    //                     {option.name}
    //                 </Box>
    //             ))}
    //         </NativeSelectField>
    //     </NativeSelectRoot>
    // );

    // const collection = useMemo(
    //     () =>
    //         createListCollection({
    //             items: options,
    //             itemToString: (option) => option.name,
    //             itemToValue: (option) => String(option.value),
    //         }),
    //     [options]
    // );

    // return (
    //     <SelectRoot
    //         size="sm"
    //         collection={collection}
    //         value={[value]}
    //         onValueChange={(e) => onValueChanged(e.value[0])}
    //         variant="outline"
    //         fontSize="inherit"
    //         {...selectRootProps}
    //     >
    //         <SelectTrigger
    //             fontSize="inherit"
    //             border="1px solid"
    //             borderRadius="sm"
    //             borderColor={colorContext.border}
    //             backgroundColor={colorContext.bg2}
    //             padding="0 !important"
    //             _disabled={{ opacity: "50%" }}
    //         >
    //             <SelectValueText
    //                 // FIXME: font size does not inherit?
    //                 // fontSize="inherit"
    //                 fontSize="xs" // from MyTable.tsx
    //                 bg="red"
    //             >
    //                 {(items) => {
    //                     const item = items[0];
    //                     return (
    //                         <HStack>
    //                             {item.preNameNode}
    //                             {item.name}
    //                             {item.postNameNode}
    //                         </HStack>
    //                     );
    //                 }}
    //             </SelectValueText>
    //         </SelectTrigger>
    //         <SelectContent
    //             fontSize="inherit"
    //             border="1px solid"
    //             backgroundColor={colorContext.bg2}
    //             borderColor={colorContext.border}
    //         >
    //             {options.map((option) => (
    //                 <SelectItem
    //                     // FIXME: same thing as above
    //                     fontSize="xs"
    //                     item={option}
    //                     justifyContent="flex-start"
    //                     key={option.name}
    //                     backgroundColor={colorContext.bg2}
    //                     _hover={{
    //                         backgroundColor: colorContext.border,
    //                     }}
    //                 >
    //                     {option.preNameNode}
    //                     {option.name}
    //                     {option.postNameNode}
    //                 </SelectItem>
    //             ))}
    //         </SelectContent>
    //     </SelectRoot>
    // );
}
