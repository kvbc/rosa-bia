import { ColorContext } from "@/contexts/ColorContext";
import { Input, InputProps } from "@chakra-ui/react";
import React, { HTMLInputTypeAttribute, useContext } from "react";
import { MyInputLock } from "./MyInputLock";

export default function MyInput({
    type,
    value,
    onValueChanged,
    isLocked,
    onLockClicked,
    ...inputProps
}: {
    type?: Omit<HTMLInputTypeAttribute, "checkbox">; // there's a custom component for checkbox (MyInputCheckbox.tsx)
    value: string;
    onValueChanged: (value: string) => void;
    isLocked?: boolean;
    onLockClicked?: () => void;
} & InputProps) {
    type = type ?? "text";

    const colorContext = useContext(ColorContext);

    if (isLocked) {
        return <MyInputLock onLockClicked={onLockClicked} />;
    }

    return (
        <Input
            size="sm"
            fontSize="2xs"
            type={type === "number" ? "text" : type}
            // padding="0.5 !important"
            margin="0 !important"
            paddingLeft={type === "date" ? "0 !important" : "0.5 !important"}
            height="100% !important"
            value={String(value)}
            backgroundColor={colorContext.bg2}
            borderRadius="none"
            borderColor={colorContext.border}
            variant="outline"
            onChange={(e) => onValueChanged(e.target.value)}
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
