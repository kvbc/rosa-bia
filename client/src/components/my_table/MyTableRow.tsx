import { Table } from "@chakra-ui/react";
import React, { PropsWithChildren, useContext } from "react";
import { ColorContext } from "../../contexts/ColorContext";

export function MyTableRow({ children }: PropsWithChildren) {
    const colorContext = useContext(ColorContext);

    return <Table.Row backgroundColor={colorContext.bg1}>{children}</Table.Row>;
}
