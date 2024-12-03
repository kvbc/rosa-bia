import { Checkbox } from "@/components/ui/checkbox";
import React, { ComponentProps, useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";
import { MyInputLock } from "./MyInputLock";

export function MyInputCheckbox({
    isLocked,
    onLockClicked,
    ...checkboxProps
}: {
    isLocked?: boolean;
    onLockClicked?: () => void;
} & ComponentProps<typeof Checkbox>) {
    const colorContext = useContext(ColorContext);

    if (isLocked) {
        return (
            <MyInputLock
                onLockClicked={onLockClicked}
                // aspectRatio="square"
            />
        );
    }

    return (
        <Checkbox
            size="sm"
            colorPalette={colorContext.palette}
            border="1px solid"
            // borderRadius="xs"
            borderRadius="none"
            borderColor={colorContext.border}
            variant="subtle"
            {...checkboxProps}
        />
    );
}
