// 1

import {
    NumberInputField,
    NumberInputRoot,
} from "@/components/ui/number-input";
import { TableEditRowType } from "../../TableEdit";
import React, { useContext } from "react";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { ColorContext } from "@/contexts/ColorContext";
import { Input } from "@chakra-ui/react";

export function TableEditRowInputNumber<TRow extends TableEditRowType>({
    disabled,
    row,
    onFocusOut,
    setRow,
    rowKey,
    placeholder,
}: TableEditRowInputProps<TRow>) {
    const colorContext = useContext(ColorContext);

    return (
        <Input
            size="sm"
            fontSize="inherit"
            type="text"
            value={row[rowKey] as string}
            backgroundColor={colorContext.bg2}
            borderColor={colorContext.border}
            variant="outline"
            onChange={(e) => {
                setRow((row) => ({
                    ...row,
                    [rowKey]: e.target.valueAsNumber,
                }));
            }}
            onBlur={onFocusOut}
            disabled={disabled}
            placeholder={placeholder}
            _selection={{
                backgroundColor: colorContext.border,
            }}
            //
            // padding="0.5"
            // height="auto"
        />
    );

    return (
        <NumberInputRoot
            size="sm"
            fontSize="inherit"
            value={row[rowKey] as string}
            onValueChange={(e) => {
                setRow((row) => ({
                    ...row,
                    [rowKey]: e.valueAsNumber,
                }));
            }}
            disabled={disabled}
            onBlur={onFocusOut}
            variant="outline"
            backgroundColor={colorContext.bg2}
        >
            <NumberInputField
                fontSize="inherit"
                backgroundColor={colorContext.bg2}
                borderColor={colorContext.border}
                _selection={{
                    backgroundColor: colorContext.border,
                }}
            />
        </NumberInputRoot>
    );
}
