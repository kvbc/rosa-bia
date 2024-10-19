import { Table } from "@mui/joy";
import { ComponentProps, ContextType, useContext, useMemo } from "react";
import React from "react";
import { MyTableContext } from "../contexts/MyTableContext";

export default function MyTable(props: ComponentProps<typeof Table>) {
    const upperContext = useContext(MyTableContext);
    const context = useMemo<ContextType<typeof MyTableContext>>(() => {
        const depth = (upperContext?.depth ?? 0) + 1;
        const backgroundColors = [
            // "rgb(248 250 252)",
            "rgb(241 245 249)",
            "rgb(241 245 249)",
            "rgb(203 213 225)",
            "rgb(148 163 184)",
            "rgb(100 116 139)",
            "rgb(71 85 105)",
            "rgb(51 65 85)",
            "rgb(30 41 59)",
            "rgb(15 23 42)",
            "rgb(2 6 23)",
        ];
        return {
            depth: depth,
            // bg-slate-[50-950]
            backgroundColor: backgroundColors[depth - 1],
            elementBackgroundColor: backgroundColors[depth],
        };
    }, [upperContext?.depth]);

    return (
        <Table {...props}>
            <MyTableContext.Provider value={context}>
                {props.children}
            </MyTableContext.Provider>
        </Table>
    );
}
