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
import { ColorContext } from "@/contexts/ColorContext";
import { MyTableContext } from "@/contexts/components/MyTableContext";
import { MyTableRow } from "./MyTableRow";
import { MyTableCell } from "./MyTableCell";
import { EmptyState } from "@/components/ui/empty-state";
import { LuArrowDown, LuInbox } from "react-icons/lu";

const colorPalettes: (ColorPalette | [ColorPalette, number])[] = [
    "gray",
    "blue",
    "green",
    ["green", 1],
    "orange",
    ["orange", 1],
    "purple",
    ["purple", 1],
    "red",
    "yellow",
    "pink",
    "teal",
];

export function MyTable(
    props: {
        myHeaders?: ReactNode;
        myRows?: ReactNode;
        myFooter?: ReactNode;
        isCollapsible?: boolean;
        defaultIsCollapsed?: boolean;
        customIndentLevel?: number;
        dontAdvanceIndentLevel?: boolean;
    } & ComponentProps<typeof Table.Root>
) {
    const {
        myHeaders,
        myRows: _myRows,
        myFooter,
        isCollapsible,
        defaultIsCollapsed,
        children,
        customIndentLevel,
        dontAdvanceIndentLevel,
        ...tableRootProps
    } = props;
    const myRows = _myRows ?? children;

    const [isCollapsed, setIsCollapsed] = useState<boolean>(
        defaultIsCollapsed ?? false
    );

    const contextIndentLevel = useContext(MyTableContext);
    const indentLevel = customIndentLevel ?? contextIndentLevel;
    const lowerIndentLevel = dontAdvanceIndentLevel
        ? indentLevel
        : indentLevel + 1;
    const lowerColorContext = useMemo<ContextType<typeof ColorContext>>(() => {
        let colorPalette: ColorPalette;
        let lvl = 0;
        const info = colorPalettes[indentLevel];
        if (Array.isArray(info)) {
            colorPalette = info[0];
            lvl = info[1];
        } else {
            colorPalette = info;
        }
        return {
            bg1: colorPalette + "." + (100 + lvl * 100),
            bg2: colorPalette + "." + (200 + lvl * 100),
            border: colorPalette + "." + (300 + lvl * 100),
            darkFg: colorPalette + "." + (600 + lvl * 100),
            palette: colorPalette,
        };
    }, [indentLevel]);

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
            fontSize="2xs"
            overflow="visible"
            {...tableRootProps}
        >
            <ColorContext.Provider value={lowerColorContext}>
                <MyTableContext.Provider value={lowerIndentLevel}>
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
                                    minWidth="0 !important"
                                    width="16px !important"
                                    height="16px !important"
                                    onClick={handleCollapseButtonClicked}
                                >
                                    <Icon
                                        fontSize="8px !important"
                                        transition="transform"
                                        transform={
                                            !isCollapsed ? "rotate(180deg)" : ""
                                        }
                                    >
                                        <LuArrowDown />
                                    </Icon>
                                </IconButton>
                                {/* <IconButton
                                    size="2xs"
                                    borderRadius="full"
                                    variant="surface"
                                    onClick={handleCollapseButtonClicked}
                                >
                                    <Icon
                                        size="xs"
                                        transition="transform"
                                        transform={
                                            !isCollapsed ? "rotate(180deg)" : ""
                                        }
                                    >
                                        <LuArrowDown />
                                    </Icon>
                                </IconButton> */}
                            </Float>
                        )}
                    </Table.Header>
                    {showBody && myRows && !areRowsEmpty && (
                        <Table.Body fontSize="inherit">{myRows}</Table.Body>
                    )}
                    {showBody && myRows && areRowsEmpty && (
                        <Table.Body>
                            <MyTableRow padding="0">
                                <MyTableCell colSpan={999} padding="0">
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
