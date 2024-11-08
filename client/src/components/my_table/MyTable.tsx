// 1

import { ColorPalette, Table } from "@chakra-ui/react";
import React, {
    ComponentProps,
    ContextType,
    ReactNode,
    useContext,
    useMemo,
} from "react";
import { ColorContext } from "../../contexts/ColorContext";
import { MyTableContext } from "../../contexts/components/MyTableContext";

const colorPalettes: ColorPalette[] = [
    "gray",
    "blue",
    "green",
    "orange",
    // "yellow",
    "purple",
    "pink",
    // "teal",
    // "red",
];

export function MyTable(
    props: {
        myHeaders: ReactNode[];
        myRows?: ReactNode[];
        myFooter?: ReactNode;
    } & ComponentProps<typeof Table.Root>
) {
    const { myHeaders, myRows, myFooter, ...tableRootProps } = props;

    const indentLevel = useContext(MyTableContext);
    const lowerColorContext = useMemo<ContextType<typeof ColorContext>>(
        () => ({
            bg1: colorPalettes[indentLevel] + ".100",
            bg2: colorPalettes[indentLevel] + ".200",
            border: colorPalettes[indentLevel] + ".300",
            darkFg: colorPalettes[indentLevel] + ".600",
            palette: colorPalettes[indentLevel],
        }),
        [indentLevel]
    );

    return (
        <Table.Root
            size="sm"
            variant="outline"
            outline="1px solid"
            outlineColor={lowerColorContext.border}
            showColumnBorder
            {...tableRootProps}
        >
            <ColorContext.Provider value={lowerColorContext}>
                <MyTableContext.Provider value={indentLevel + 1}>
                    <Table.Header>
                        <Table.Row backgroundColor={lowerColorContext.bg2}>
                            {myHeaders}
                        </Table.Row>
                    </Table.Header>
                    {myRows && <Table.Body>{myRows}</Table.Body>}
                    {myFooter && (
                        <Table.Footer>
                            <Table.Row>{myFooter}</Table.Row>
                        </Table.Footer>
                    )}
                </MyTableContext.Provider>
            </ColorContext.Provider>
        </Table.Root>
    );
}
