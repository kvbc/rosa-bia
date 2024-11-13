import { Box, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export function PageDatabase() {
    return (
        <HStack>
            <Box>
                <FeatureUnfinishedIcon />
            </Box>
            <Heading>Zarządzanie bazą danych</Heading>
        </HStack>
    );
}
