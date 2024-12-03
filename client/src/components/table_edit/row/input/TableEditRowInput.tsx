//
// TableEditRowInput.tsx
// Input component to be used inside of a TableEditRow
//
// 1
//

import React, {
    ComponentProps,
    Dispatch,
    HTMLInputTypeAttribute,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { TableEditRowType } from "@/components/table_edit/TableEdit";
import { Center, HStack } from "@chakra-ui/react";
import { TableEditRowInputSelect } from "./TableEditRowInputSelect";
import { TableEditRowInputCheckbox } from "./TableEditRowInputCheckbox";
import { MySelectOption } from "@/components/my_input/MyInputSelect";
import MyInput from "@/components/my_input/MyInput";
import { Range } from "@/utils/types";

export type TableEditRowInputProps<
    TRow extends TableEditRowType,
    _TType = HTMLInputTypeAttribute | "select"
> = {
    type?: _TType;
    getType?: (row: TRow) => _TType;
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    rowKey: keyof TRow & string;
    placeholder?: string;
    isFilterable?: boolean;
    displayName?: string;
    disabled?: boolean;
    onFocusOut: () => void;
    getSelectOptions?: (row: TRow) => MySelectOption[];
    getIsDisabled?: (row: TRow) => boolean;
} & Omit<ComponentProps<typeof MyInput>, "value" | "onValueChanged">;

export function TableEditRowInput<TRow extends TableEditRowType>(
    props: TableEditRowInputProps<TRow> & {
        isLocked?: boolean;
        onLockClicked?: () => void;
        _rangeKey?: keyof Range<string | number>;
    }
) {
    const {
        row,
        setRow,
        type: typeProp,
        rowKey,
        getType,
        placeholder,
        getIsDisabled,
        disabled: disabledProp,
        onFocusOut,
        _rangeKey,
        ...inputProps
    } = props;

    const [type, setType] = useState<typeof typeProp>(typeProp);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const value = row[rowKey];
    const isValueRange =
        typeof value === "object" && value && "from" in value && "to" in value;

    useEffect(() => {
        if (disabledProp === true) {
            setIsDisabled(true);
        } else if (getIsDisabled) {
            setIsDisabled(getIsDisabled(row));
        } else {
            setIsDisabled(false);
        }
    }, [row, getIsDisabled, disabledProp]);

    useEffect(() => {
        if (typeProp) {
            setType(typeProp);
        } else {
            setType(getType!(row));
        }
    }, [typeProp, getType, row]);

    const setValue = useCallback(
        (newStringValue: string) => {
            const newValue =
                type === "number" ? Number(newStringValue) : newStringValue;
            if (isValueRange) {
                // range
                setRow((row) => ({
                    ...row,
                    [rowKey]: { ...value, [_rangeKey!]: newValue },
                }));
            } else {
                setRow((row) => ({
                    ...row,
                    [rowKey]: newValue,
                }));
            }
        },
        [_rangeKey, rowKey, setRow, type, value, isValueRange]
    );

    switch (type) {
        case "select":
            return <TableEditRowInputSelect {...props} disabled={isDisabled} />;
        case "checkbox":
            return (
                <Center>
                    <TableEditRowInputCheckbox
                        {...props}
                        disabled={isDisabled}
                    />
                </Center>
            );
    }

    if (!_rangeKey && typeof row[rowKey] === "object") {
        // is range and no range key
        return (
            <HStack gap="1">
                od
                <TableEditRowInput {...props} _rangeKey="from" />
                do
                <TableEditRowInput {...props} _rangeKey="to" />
            </HStack>
        );
    }

    return (
        <MyInput
            type={type}
            value={(isValueRange ? value[_rangeKey!] : value) as string}
            onValueChanged={setValue}
            disabled={isDisabled}
            onBlur={onFocusOut}
            placeholder={placeholder}
            {...inputProps}
        />
    );
}
