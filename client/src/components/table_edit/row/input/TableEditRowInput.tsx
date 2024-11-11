//
// TableEditRowInput.tsx
// Input component to be used inside of a TableEditRow
//
// 1
//

import React, {
    Dispatch,
    HTMLInputTypeAttribute,
    SetStateAction,
    useContext,
} from "react";
import { TableEditRowType } from "../../TableEdit";
import { Center, Input, InputProps } from "@chakra-ui/react";
import { TableEditRowInputSelect } from "./TableEditRowInputSelect";
import { TableEditRowInputCheckbox } from "./TableEditRowInputCheckbox";
import { ColorContext } from "../../../../contexts/ColorContext";
import { TableEditRowInputNumber } from "./TableEditRowInputNumber";
import { MySelectOption } from "../../../MySelect";

export type TableEditRowInputProps<TRow extends TableEditRowType> = {
    type: HTMLInputTypeAttribute | "select";
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    rowKey: keyof TRow & string;
    placeholder?: string;
    disabled?: boolean;
    onFocusOut: () => void;
    getSelectOptions?: (row: TRow) => MySelectOption[];
};

export function TableEditRowInput<TRow extends TableEditRowType>(
    props: TableEditRowInputProps<TRow> & InputProps
) {
    const {
        row,
        setRow,
        type,
        rowKey,
        placeholder,
        disabled,
        onFocusOut,
        ...inputProps
    } = props;

    const colorContext = useContext(ColorContext);

    switch (type) {
        case "select":
            return <TableEditRowInputSelect {...props} />;
        case "checkbox":
            return (
                <Center>
                    <TableEditRowInputCheckbox {...props} />
                </Center>
            );
        case "number":
            return <TableEditRowInputNumber {...props} />;
    }

    return (
        <Input
            size="sm"
            fontSize="inherit"
            type={type}
            value={row[rowKey] as string}
            backgroundColor={colorContext.bg2}
            borderColor={colorContext.border}
            variant="outline"
            onChange={(e) => {
                setRow((row) => ({
                    ...row,
                    [rowKey]: e.target.value,
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
            //
            {...inputProps}
        />
    );
}
