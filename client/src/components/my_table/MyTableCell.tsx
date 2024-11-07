import { Table } from "@chakra-ui/react";
import React, { PropsWithChildren, useContext } from "react";
import { ColorContext } from "../../contexts/ColorContext";

export function MyTableCell({ children }: PropsWithChildren) {
    const colorContext = useContext(ColorContext);

    return (
        <Table.Cell borderColor={colorContext.border}>{children}</Table.Cell>
    );
}
