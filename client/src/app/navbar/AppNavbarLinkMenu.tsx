import React, {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useCallback,
} from "react";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu";
import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import { AppNavbarLink } from "./AppNavbarLink";
import { IconType } from "react-icons/lib";
import { Tooltip } from "@/components/ui/tooltip";
import { To } from "react-router-dom";

export const AppNavbarLinkMenu: React.FC<
    PropsWithChildren<{
        Icon: IconType;
        title: string;
        isOpen: boolean;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
        links: {
            to: To;
            display: string;
            tooltip?: string;
            openInNewTab?: boolean;
            Icon?: IconType;
        }[];
    }>
> = ({ Icon: MenuIcon, title, links, isOpen, setIsOpen, children }) => {
    const close = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const open = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    return (
        <Box position="relative">
            <MenuRoot
                open={isOpen}
                onPointerDownOutside={close}
                onInteractOutside={close}
                onEscapeKeyDown={close}
                onExitComplete={close}
                onFocusOutside={close}
                onOpenChange={(e) => !e.open && close()}
            >
                <MenuTrigger asChild onMouseEnter={open}>
                    <VStack gap="0.5">
                        <Icon fontSize="md">
                            <MenuIcon />
                        </Icon>
                        <HStack gap="0.5">
                            <Icon fontSize="sm">
                                <LuChevronDown />
                            </Icon>
                            {title}
                        </HStack>
                    </VStack>
                </MenuTrigger>
                <MenuContent
                    focusRing="none"
                    backgroundColor="blue.700"
                    onMouseLeave={close}
                >
                    {links.map((link, linkIndex) => {
                        const body = (
                            <AppNavbarLink
                                key={linkIndex}
                                to={link.to}
                                width="full"
                                _hover={{
                                    backgroundColor: "blue.800",
                                }}
                                target={
                                    link.openInNewTab === true
                                        ? "_blank"
                                        : "_self"
                                }
                            >
                                <MenuItem
                                    value={String(linkIndex)}
                                    color="white"
                                    fontWeight="light"
                                    _hover={{
                                        backgroundColor: "inherit",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Icon fontSize="md">
                                        {link.Icon ? (
                                            <link.Icon />
                                        ) : (
                                            <MenuIcon />
                                        )}
                                    </Icon>
                                    {link.display}
                                </MenuItem>
                            </AppNavbarLink>
                        );
                        if (link.tooltip) {
                            return (
                                <Tooltip
                                    key={linkIndex}
                                    content={link.tooltip}
                                    positioning={{ placement: "right" }}
                                >
                                    {body}
                                </Tooltip>
                            );
                        }
                        return body;
                    })}
                    {/* <AppNavbarLink
                    to="stats/b05"
                    width="full"
                    _hover={{
                        backgroundColor: "blue.800",
                    }}
                >
                    <MenuItem
                        value="1"
                        color="white"
                        fontWeight="light"
                        _hover={{
                            backgroundColor: "inherit",
                            cursor: "pointer",
                        }}
                    >
                        <Icon fontSize="md">
                            <MenuIcon />
                        </Icon>
                        nigga
                    </MenuItem>
                </AppNavbarLink> */}
                    {/* <MenuItem
                    value="1"
                    color="white"
                    fontWeight="light"
                    _hover={{
                        backgroundColor: "inherit",
                        cursor: "pointer",
                    }}
                >
                    <Icon fontSize="md">
                        <MenuIcon />
                    </Icon>
                    nigga
                </MenuItem> */}
                </MenuContent>
            </MenuRoot>
            {children}
        </Box>
    );
};
