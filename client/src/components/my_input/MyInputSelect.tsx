// 1

import React, {
    ComponentProps,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
} from "react";
import { chakraColorToCSS, ColorContext } from "@/contexts/ColorContext";
import Select, { SingleValue, StylesConfig } from "react-select";
import { MyInputSelectOption } from "./MyInputSelectOption";

export type MySelectOption = {
    value: string | number;
    preLabelNode?: ReactNode; // node displayed before the label
    label: string;
    postLabelNode?: ReactNode; // node displayed after the label
};

export function createMySelectOptions(stringArray: string[]): MySelectOption[] {
    return stringArray.map<MySelectOption>((str) => ({
        value: str,
        label: str,
    }));
}

export function MyInputSelect({
    options,
    value,
    onValueChanged,
    ...restSelectProps
}: {
    options: MySelectOption[];
    value: string | number;
    onValueChanged: (value: string | number) => void;
} & Omit<
    ComponentProps<typeof Select<MySelectOption>>,
    "options" | "value" | "onChange" | "styles"
>) {
    const colorContext = useContext(ColorContext);

    // const optionValue = options.find((option) => option.value === value);
    const optionValue = useMemo(
        () => options.find((option) => option.value == value), // TODO: "==" required instead of "==="
        [options, value]
    );

    const handleOptionChanged = useCallback(
        (option: SingleValue<MySelectOption>) => {
            if (option) {
                onValueChanged(option.value);
            }
        },
        [onValueChanged]
    );

    const styles = useMemo<StylesConfig<MySelectOption>>(
        () => ({
            container: (base) => ({
                ...base,
                width: "100%",
            }),
            menu: (base) => ({
                ...base,
                zIndex: "1000",
            }),
            menuList: (base) => ({
                ...base,
                padding: "4px",
                backgroundColor: chakraColorToCSS(colorContext.bg2),
                borderRadius: "0px",
            }),
            control: (base, state) => ({
                ...base,
                minHeight: "0px",
                borderRadius: "0px",
                borderColor: chakraColorToCSS(colorContext.border),
                backgroundColor: chakraColorToCSS(colorContext.bg2),
                ":hover": {
                    borderColor: chakraColorToCSS(colorContext.border),
                },
                boxShadow: "none",
                fontSize: "inherit",
                opacity: state.isDisabled ? "50%" : "100%",
            }),
            singleValue: (base) => ({
                ...base,
                color: "black",
            }),
            valueContainer: (base) => ({
                ...base,
                padding: "0px",
            }),
            dropdownIndicator: (base) => ({
                ...base,
                padding: "0px",
                color: chakraColorToCSS(colorContext.border),
                ":hover": {
                    color: chakraColorToCSS(colorContext.border),
                },
            }),
            input: (base) => ({
                ...base,
                margin: "0px",
            }),
            option: (base, state) => ({
                ...base,
                padding: "2px",
                backgroundColor: chakraColorToCSS(
                    state.isFocused ? colorContext.border : colorContext.bg2
                ),
                color: "black",
                ":hover": {
                    backgroundColor: chakraColorToCSS(colorContext.border),
                },
            }),
            indicatorSeparator: (base) => ({
                ...base,
                visibility: "hidden",
            }),
        }),
        [colorContext]
    );

    return (
        <Select<MySelectOption>
            options={options}
            value={optionValue}
            onChange={handleOptionChanged}
            noOptionsMessage={() => "Brak wyników"}
            styles={styles}
            components={{ Option: MyInputSelectOption }}
            placeholder="-"
            {...restSelectProps}
        />
    );
}
