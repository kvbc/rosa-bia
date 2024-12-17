import { ColorPalette } from "@chakra-ui/react";
import { ContextType, createContext } from "react";

export const chakraColorToCSS = (chakraColor: string): string => {
    return `var(--chakra-colors-${chakraColor.replace(".", "-")})`;
};

export const ColorContext = createContext<{
    bg1: string;
    bg2: string;
    border: string;
    palette: ColorPalette;
}>({
    bg1: "white",
    bg2: "gray.100",
    border: "gray.200",
    palette: "gray",
});

export const createColorContextFromPalette = (
    colorPalette: ColorPalette
): ContextType<typeof ColorContext> => {
    return {
        bg1: colorPalette + ".100",
        bg2: colorPalette + ".100",
        border: colorPalette + ".100",
        palette: colorPalette,
    };
};
