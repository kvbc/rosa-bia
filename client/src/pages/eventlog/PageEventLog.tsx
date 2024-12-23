import { Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export const PageEventLog: React.FC = () => {
    return (
        <>
            <Heading>
                <HStack>
                    <FeatureUnfinishedIcon />
                    Dziennik zdarzeń
                </HStack>
            </Heading>
            <Text> ...</Text>
        </>
    );
};
