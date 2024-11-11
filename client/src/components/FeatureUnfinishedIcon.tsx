import React from "react";
import { Center, Icon } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { LuAlertCircle } from "react-icons/lu";

export const FeatureUnfinishedIcon = () => {
    return (
        <Tooltip content="Funkcja nieukończona">
            <Center>
                <Icon size="lg" color="fg.error">
                    <LuAlertCircle />
                </Icon>
            </Center>
        </Tooltip>
    );
};
