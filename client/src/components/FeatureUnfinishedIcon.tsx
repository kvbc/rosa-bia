// Icon used to mark yet unfinished features

import React from "react";
import { Center, Icon } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { LuAlertCircle } from "react-icons/lu";

export const FeatureUnfinishedIcon = () => {
    return (
        <Tooltip content="Funkcja nieukończona">
            <Center>
                <Icon size="md" color="fg.error">
                    <LuAlertCircle />
                </Icon>
            </Center>
        </Tooltip>
    );
};
