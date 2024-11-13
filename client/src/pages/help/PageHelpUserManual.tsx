import { Box, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export function PageHelpUserManual() {
    return (
        <HStack>
            <Box>
                <FeatureUnfinishedIcon />
            </Box>
            <Heading>Instrukcja obsługi</Heading>
        </HStack>
    );
}
