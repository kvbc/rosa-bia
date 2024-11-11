// 1

import { ColorPalette, Float, Icon, IconButton, Table } from "@chakra-ui/react";
import React, {
    ComponentProps,
    ContextType,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { ColorContext } from "../../contexts/ColorContext";
import { MyTableContext } from "../../contexts/components/MyTableContext";
import { MyTableRow } from "./MyTableRow";
import { MyTableCell } from "./MyTableCell";
import { EmptyState } from "../ui/empty-state";
import { LuArrowDown, LuInbox } from "react-icons/lu";

const colorPalettes: ColorPalette[] = [
    "gray",
    "blue",
    "green",
    "purple",
    "orange",
    "pink",
    // "yellow",
    // "teal",
    // "red",
];

export function MyTable(
    props: {
        myHeaders?: ReactNode;
        myRows?: ReactNode;
        myFooter?: ReactNode;
        isCollapsible?: boolean;
        defaultIsCollapsed?: boolean;
    } & ComponentProps<typeof Table.Root>
) {
    const {
        myHeaders,
        myRows: _myRows,
        myFooter,
        isCollapsible,
        defaultIsCollapsed,
        children,
        ...tableRootProps
    } = props;
    const myRows = _myRows ?? children;

    const [isCollapsed, setIsCollapsed] = useState<boolean>(
        defaultIsCollapsed ?? false
    );

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

    const areRowsEmpty = React.Children.count(myRows) === 0;
    const showBody = isCollapsible ? !isCollapsed : true;

    const handleCollapseButtonClicked = useCallback(() => {
        setIsCollapsed((isCollapsed) => !isCollapsed);
    }, []);

    return (
        <Table.Root
            size="sm"
            variant="outline"
            outline="1px solid"
            outlineColor={lowerColorContext.border}
            showColumnBorder
            fontSize="xs"
            overflow="visible"
            {...tableRootProps}
        >
            <ColorContext.Provider value={lowerColorContext}>
                <MyTableContext.Provider value={indentLevel + 1}>
                    <Table.Header position="relative">
                        <Table.Row
                            zIndex={999}
                            backgroundColor={lowerColorContext.bg2}
                        >
                            {myHeaders}
                        </Table.Row>
                        {isCollapsible && (
                            <Float placement="top-end" zIndex={100} offset="1">
                                <IconButton
                                    size="2xs"
                                    borderRadius="full"
                                    variant="surface"
                                    onClick={handleCollapseButtonClicked}
                                >
                                    <Icon
                                        transition="transform"
                                        transform={
                                            !isCollapsed ? "rotate(180deg)" : ""
                                        }
                                    >
                                        <LuArrowDown />
                                    </Icon>
                                </IconButton>
                            </Float>
                        )}
                    </Table.Header>
                    {showBody && myRows && !areRowsEmpty && (
                        <Table.Body fontSize="inherit">{myRows}</Table.Body>
                    )}
                    {showBody && myRows && areRowsEmpty && (
                        <Table.Body>
                            <MyTableRow padding="0">
                                <MyTableCell colSpan={3} padding="0">
                                    <EmptyState
                                        icon={<LuInbox />}
                                        title="Brak danych"
                                        // title=""
                                        // description="Edytuj tabele aby dodać dane"
                                        // description="Brak danych"
                                        description="Tabela jest pusta"
                                    />
                                </MyTableCell>
                            </MyTableRow>
                        </Table.Body>
                    )}
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
