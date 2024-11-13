import { Box, Heading, HStack } from "@chakra-ui/react";
import { Link } from "@mui/joy";
import React from "react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";

export default function PageStatsB06() {
    return (
        <>
            <HStack>
                <Box>
                    <FeatureUnfinishedIcon />
                </Box>
                <Heading>Formularz B-06</Heading>
            </HStack>
            <Link
                target="_blank"
                href="http://form.stat.gov.pl/formularze/2024/passive/B-06.pdf"
            >
                Plik PDF
            </Link>
        </>
    );
}
