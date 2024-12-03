import React from "react";
import { SingleValueProps, components } from "react-select";
import { MySelectOption } from "./MyInputSelect";
import { HStack } from "@chakra-ui/react";

export const MyInputSingleValue = (props: SingleValueProps<MySelectOption>) => (
    <components.SingleValue {...props}>
        <HStack alignItems="center" gap="1">
            {props.data.preLabelNode}
            {props.data.label}
            {props.data.postLabelNode}
        </HStack>
    </components.SingleValue>
);
