import { Table } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";

export function MyTableCell({ children, ...props }: Table.CellProps) {
    const colorContext = useContext(ColorContext);

    return (
        <Table.Cell
            borderColor={colorContext.border}
            fontSize="inherit"
            _selection={{ backgroundColor: colorContext.bg2 }}
            padding="1 !important"
            // height="40px"
            {...props}
        >
            {children}
        </Table.Cell>
    );
}
