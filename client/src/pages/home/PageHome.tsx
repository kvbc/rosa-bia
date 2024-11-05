import { Box, HStack, StackSeparator } from "@chakra-ui/react";
import PageRegisters from "../registers/PageRegisters";
import InfoBoard from "./InfoBoard";
import React from "react";

export default function PageHome() {
    return (
        <HStack align="stretch" separator={<StackSeparator />}>
            <Box width="9/12">
                <PageRegisters />
            </Box>
            <InfoBoard />
        </HStack>
    );
}
