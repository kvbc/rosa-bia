import { Table } from "@chakra-ui/react";
import { forwardRef, useContext } from "react";
import { ColorContext } from "@/contexts/ColorContext";

export const MyTableRow = forwardRef<HTMLTableRowElement, Table.RowProps>(
    function MyTableRow({ children, ...props }: Table.RowProps, ref) {
        const colorContext = useContext(ColorContext);

        return (
            <Table.Row
                backgroundColor={colorContext.bg1}
                borderColor={colorContext.border}
                fontSize="inherit"
                ref={ref}
                {...props}
            >
                {children}
            </Table.Row>
        );
    }
);
