import { Table } from "@chakra-ui/react";
import React, { ComponentProps } from "react";

export function MyTableFooter({
    children,
    ...props
}: ComponentProps<typeof Table.Footer>) {
    return <Table.Footer {...props}>{children}</Table.Footer>;
}
