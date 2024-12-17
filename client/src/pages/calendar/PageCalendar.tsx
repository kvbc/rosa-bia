import { Heading, HStack, Text } from "@chakra-ui/react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export function PageCalendar() {
    return (
        <>
            <Heading>
                <HStack>
                    <FeatureUnfinishedIcon />
                    Kalendarz
                </HStack>
            </Heading>
            <Text>Do zrobienia ...</Text>
        </>
    );
}
