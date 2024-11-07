import { Table } from "@chakra-ui/react";
import React, { ComponentProps, useContext } from "react";
import { ColorContext } from "../../contexts/ColorContext";

export function MyTableHeader({
    children,
    ...props
}: ComponentProps<typeof Table.ColumnHeader>) {
    const colorContext = useContext(ColorContext);

    return (
        <Table.ColumnHeader borderColor={colorContext.border} {...props}>
            {children}
        </Table.ColumnHeader>
    );
}
