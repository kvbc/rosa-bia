import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export function PageDatabase() {
    return (
        <>
            <Heading>
                <HStack>
                    <FeatureUnfinishedIcon />
                    Zarządzanie bazą danych
                </HStack>
            </Heading>
            <Text>Do zrobienia ...</Text>
        </>
    );
}
