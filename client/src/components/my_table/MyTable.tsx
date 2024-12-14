// 1

import { ColorPalette, Float, Icon, IconButton, Table } from "@chakra-ui/react";
import React, {
    ComponentProps,
    ContextType,
    ReactElement,
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
import { MyTableHeader } from "./MyTableHeader";
import { MyTableFooter } from "./MyTableFooter";

const colorPalettes: (ColorPalette | [ColorPalette, number /* level */])[] = [
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

// FIXME header color should indent up
export function MyTable({
    isCollapsible,
    defaultIsCollapsed,
    children,
    customIndentLevel,
    keepIndentLevel,
    isEmpty,
    showBody: showBodyProp,
    ...tableRootProps
}: {
    showBody?: boolean;
    isCollapsible?: boolean;
    defaultIsCollapsed?: boolean;
    isEmpty?: boolean;
    customIndentLevel?: number;
    keepIndentLevel?: boolean;
} & ComponentProps<typeof Table.Root>) {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(
        defaultIsCollapsed ?? false
    );

    //

    const contextIndentLevel = useContext(MyTableContext);
    const indentLevel = customIndentLevel ?? contextIndentLevel;
    const lowerColorContext = useMemo<ContextType<typeof ColorContext>>(() => {
        let colorPalette: ColorPalette;
        let lvl = 0;
        const info = colorPalettes[indentLevel];
        if (Array.isArray(info)) {
            colorPalette = info[0];
            lvl = info[1] * 100;
        } else {
            colorPalette = info;
        }
        return {
            bg1: colorPalette + "." + (lvl + 100),
            bg2: colorPalette + "." + (lvl + 200),
            border: colorPalette + "." + (lvl + 300),
            palette: colorPalette,
        };
    }, [indentLevel]);

    //

    const filterChildrenByType = useCallback(
        (type: ReactElement["type"]) =>
            React.Children.toArray(children).filter(
                (child) => React.isValidElement(child) && child.type === type
            ),
        [children]
    );

    const headers = filterChildrenByType(MyTableHeader);
    const footer = filterChildrenByType(MyTableFooter);
    const rows = React.Children.toArray(children).filter(
        (child) =>
            React.isValidElement(child) &&
            child.type !== MyTableHeader &&
            child.type !== MyTableFooter
    );
    const hasRows = rows.length > 0;
    const showBody = showBodyProp ?? (isCollapsible ? !isCollapsed : true);

    //

    const handleCollapseButtonClicked = useCallback(() => {
        setIsCollapsed((isCollapsed) => !isCollapsed);
    }, []);

    //

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
                <MyTableContext.Provider
                    value={keepIndentLevel ? indentLevel : indentLevel + 1}
                >
                    <Table.Header position="relative">
                        <Table.Row
                            zIndex={999}
                            backgroundColor={lowerColorContext.bg2}
                        >
                            {headers}
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
                                            !isCollapsed
                                                ? "rotate(180deg)"
                                                : "rotate(0.1deg)"
                                        }
                                    >
                                        <LuArrowDown />
                                    </Icon>
                                </IconButton>
                            </Float>
                        )}
                    </Table.Header>

                    {/* <Table.Body
                        fontSize="inherit"
                        display={showBody ? "table-row-group" : "none"}
                    >
                        {hasRows ? (
                            rows
                        ) : (
                            <MyTableRow padding="0">
                                <MyTableCell colSpan={999} padding="0">
                                    <EmptyState
                                        icon={<LuInbox />}
                                        title="Brak danych"
                                        description="Tabela jest pusta"
                                    />
                                </MyTableCell>
                            </MyTableRow>
                        )}
                    </Table.Body> */}

                    {showBody && (
                        <Table.Body fontSize="inherit">
                            {hasRows && rows}
                            {(isEmpty || !hasRows) && (
                                <MyTableRow padding="0">
                                    <MyTableCell colSpan={999} padding="0">
                                        <EmptyState
                                            icon={<LuInbox />}
                                            title="Brak danych"
                                            description="Tabela jest pusta"
                                        />
                                    </MyTableCell>
                                </MyTableRow>
                            )}
                        </Table.Body>
                    )}

                    {footer}
                </MyTableContext.Provider>
            </ColorContext.Provider>
        </Table.Root>
    );
}
