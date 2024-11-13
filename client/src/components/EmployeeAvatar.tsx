import React from "react";
import {
    AvatarFallback,
    AvatarRoot,
    AvatarRootProps,
    ColorPalette,
} from "@chakra-ui/react";

export function EmployeeAvatar({
    fullName,
    children,
    ...props
}: { fullName: string } & AvatarRootProps) {
    const colorPalettes: ColorPalette[] = [
        "red",
        "orange",
        "yellow",
        "green",
        // "teal",
        // "blue",
        "cyan",
        "purple",
        "pink",
    ];

    let fallback = "";
    const nameWords = fullName.split(" ");
    if (nameWords.length >= 2) {
        fallback = nameWords[0][0] + nameWords[1][0];
    } else {
        fallback = fullName[0] + fullName[1];
    }

    return (
        <AvatarRoot
            size="sm"
            colorPalette={
                colorPalettes[fullName.charCodeAt(0) % colorPalettes.length]
            }
            {...props}
        >
            <AvatarFallback>{fallback}</AvatarFallback>
            {children}
        </AvatarRoot>
    );
}