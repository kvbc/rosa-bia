import { Table } from "@chakra-ui/react";
import { ComponentProps, useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";

export function MyTableHeader({
    children,
    ...props
}: ComponentProps<typeof Table.ColumnHeader>) {
    const colorContext = useContext(ColorContext);

    return (
        <Table.ColumnHeader
            borderColor={colorContext.border}
            _selection={{
                backgroundColor: colorContext.border,
            }}
            padding="0.5"
            {...props}
        >
            {children}
        </Table.ColumnHeader>
    );
}
