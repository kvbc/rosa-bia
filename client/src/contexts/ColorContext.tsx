import { ColorPalette } from "@chakra-ui/react";
import { createContext } from "react";

export const chakraColorToCSS = (chakraColor: string): string => {
    return `var(--chakra-colors-${chakraColor.replace(".", "-")})`;
};

export const ColorContext = createContext<{
    bg1: string;
    bg2: string;
    darkFg: string;
    border: string;
    palette: ColorPalette;
}>({
    bg1: "white",
    bg2: "gray.100",
    border: "gray.200",
    darkFg: "gray.600",
    palette: "gray",
});
