import { Heading, HStack, Text } from "@chakra-ui/react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export function PageStatsEmployees() {
    return (
        <>
            <Heading>
                <HStack>
                    <FeatureUnfinishedIcon />
                    Przydział
                </HStack>
            </Heading>
            <Text>Do zrobienia ...</Text>
        </>
    );
}
