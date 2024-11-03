import { FallbackProps } from "react-error-boundary";
import React from "react";
import { ContactInformationBox } from "../../components/ContactInformationBox";
import { Heading, Stack, Text } from "@chakra-ui/react";

export const AppErrorFallback: React.FC<FallbackProps> = (
    props: FallbackProps
) => {
    return (
        <Stack width="full" height="full" align="center" justify="center">
            <Heading fontSize="xl" fontWeight="bold" color="red.500">
                Błąd Krytyczny
            </Heading>
            <Text color="gray.500">&quot;{props.error}&quot;</Text>
            <ContactInformationBox />
        </Stack>
    );
};
