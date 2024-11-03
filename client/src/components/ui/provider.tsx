"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import appSystem from "../../app/theme";
import React from "react";

export function Provider(props: React.PropsWithChildren) {
    return (
        <ChakraProvider value={appSystem}>
            <ColorModeProvider>{props.children}</ColorModeProvider>
        </ChakraProvider>
    );
}
