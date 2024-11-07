// 1

import { NumberInputField, NumberInputRoot } from "../../../ui/number-input";
import { TableEditRowType } from "../../TableEdit";
import React, { useContext } from "react";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { ColorContext } from "../../../../contexts/ColorContext";

export function TableEditRowInputNumber<TRow extends TableEditRowType>({
    disabled,
    row,
    onFocusOut,
    setRow,
    rowKey,
}: TableEditRowInputProps<TRow>) {
    const colorContext = useContext(ColorContext);

    return (
        <NumberInputRoot
            size="sm"
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
                backgroundColor={colorContext.bg2}
                borderColor={colorContext.border}
                _selection={{
                    backgroundColor: colorContext.border,
                }}
            />
        </NumberInputRoot>
    );
}
