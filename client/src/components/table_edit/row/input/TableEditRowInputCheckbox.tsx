// 1

import { TableEditRowType } from "../../TableEdit";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { Checkbox } from "../../../ui/checkbox";
import React, { useContext } from "react";
import { ColorContext } from "../../../../contexts/ColorContext";

export function TableEditRowInputCheckbox<TRow extends TableEditRowType>({
    disabled,
    row,
    onFocusOut,
    setRow,
    rowKey,
}: TableEditRowInputProps<TRow>) {
    const colorContext = useContext(ColorContext);

    return (
        <Checkbox
            size="sm"
            colorPalette={colorContext.palette}
            checked={Boolean(row[rowKey])}
            border="1px solid"
            borderRadius="xs"
            borderColor={colorContext.border}
            variant="subtle"
            onCheckedChange={(e) => {
                setRow((row) => ({
                    ...row,
                    [rowKey]: Number(e.checked),
                }));
            }}
            onBlur={onFocusOut}
            disabled={disabled}
        />
    );
}
