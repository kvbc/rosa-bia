import { Table } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ColorContext } from "../../contexts/ColorContext";

export function MyTableRow({ children, ...props }: Table.RowProps) {
    const colorContext = useContext(ColorContext);

    return (
        <Table.Row
            backgroundColor={colorContext.bg1}
            borderColor={colorContext.border}
            fontSize="inherit"
            {...props}
        >
            {children}
        </Table.Row>
    );
}
