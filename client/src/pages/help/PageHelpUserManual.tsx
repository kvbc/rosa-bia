import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export function PageHelpUserManual() {
    return (
        <>
            <HStack>
                <Box>
                    <FeatureUnfinishedIcon />
                </Box>
                <Heading>Instrukcja obsługi</Heading>
            </HStack>
            <Text>Do zrobienia ...</Text>
        </>
    );
}
