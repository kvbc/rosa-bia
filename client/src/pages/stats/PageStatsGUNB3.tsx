import { Box, Heading, HStack } from "@chakra-ui/react";
import { Link } from "@mui/joy";
import React from "react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export default function PageStatsGUNB3() {
    return (
        <>
            <HStack>
                <Box>
                    <FeatureUnfinishedIcon />
                </Box>
                <Heading>Formularz GUNB-3</Heading>
            </HStack>
            <Link target="_blank" href="/GUNB3.xlsx">
                Plik PDF
            </Link>
        </>
    );
}
