import React from "react";
import { OptionProps, components } from "react-select";
import { MySelectOption } from "./MyInputSelect";
import { HStack } from "@chakra-ui/react";

export const MyInputSelectOption = (props: OptionProps<MySelectOption>) => (
    <components.Option {...props}>
        <HStack alignItems="center" gap="1">
            {props.data.preLabelNode}
            {props.data.label}
            {props.data.postLabelNode}
        </HStack>
    </components.Option>
);
