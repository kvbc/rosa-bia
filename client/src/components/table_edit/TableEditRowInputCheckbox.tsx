import {
    getTableEditColor,
    nextTableEditColorValue,
    TableEditRowType,
} from "./TableEdit";
import { TableEditRowInputProps } from "./TableEditRowInput";
import { Checkbox } from "../ui/checkbox";
import React from "react";

export function TableEditRowInputCheckbox<TRow extends TableEditRowType>({
    disabled,
    row,
    onBlur,
    setRow,
    rowKey,
    primaryBgColorValue,
}: TableEditRowInputProps<TRow>) {
    return (
        <Checkbox
            size="sm"
            checked={Boolean(row[rowKey])}
            onCheckedChange={(e) => {
                setRow((row) => ({
                    ...row,
                    [rowKey]: Number(e.checked),
                }));
            }}
            onBlur={onBlur}
            disabled={disabled}
            backgroundColor={getTableEditColor(primaryBgColorValue)}
            borderColor={getTableEditColor(
                nextTableEditColorValue(primaryBgColorValue, 2)
            )}
        />
    );
}
