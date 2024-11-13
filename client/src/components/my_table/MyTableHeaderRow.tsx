import React, { ComponentProps, useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";
import { MyTableCell } from "./MyTableCell";

export function MyTableHeaderRow({
    children,
    ...props
}: ComponentProps<typeof MyTableCell>) {
    const colorContext = useContext(ColorContext);

    return (
        <MyTableCell
            backgroundColor={colorContext.bg2}
            _selection={{
                backgroundColor: colorContext.border,
            }}
            {...props}
        >
            {children}
        </MyTableCell>
    );
}
