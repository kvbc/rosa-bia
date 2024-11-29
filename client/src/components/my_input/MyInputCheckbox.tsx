import { Checkbox } from "@/components/ui/checkbox";
import React, { ComponentProps, useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";

export function MyInputCheckbox(
    checkboxProps: ComponentProps<typeof Checkbox>
) {
    const colorContext = useContext(ColorContext);

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
