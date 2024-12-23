import { Heading, HStack, Text } from "@chakra-ui/react";
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
            <Text> ...</Text>
        </>
    );
}
