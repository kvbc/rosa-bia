//
// AppNavbar.tsx
// Application navigation bar
//

import React from "react";
import { AppNavbarLinks } from "./AppNavbarLinks";
import { AppNavbarEmployee } from "./AppNavbarEmployee";
import { HStack, Image, Link, StackSeparator } from "@chakra-ui/react";
import { AppNavbarEmployeeDialog } from "./AppNavbarEmployeeLoginDialog";
import { REGISTER_TYPES } from "@shared/db/rows";
import { AppNavbarLink } from "./AppNavbarLink";
import { useLocation } from "react-router-dom";

export const AppNavbar: React.FC = () => {
    const location = useLocation();
    const showRegisterTypes = location.pathname.startsWith("/registers");

    return (
        <AppNavbarEmployeeDialog>
            <HStack
                as="nav"
                position="sticky"
                top="0"
                zIndex={50000}
                backgroundColor="blue.700"
                color="white"
                fontWeight="light"
                fontSize="xs"
                width="full"
                padding="2"
                separator={<StackSeparator borderColor="blue.800" />}
            >
                <Link
                    target="_blank"
                    href="https://www.starostwo.czluchow.org.pl/"
                >
                    <Image src="/logo.svg" height="32px" />
                </Link>
                <AppNavbarLinks />
                <AppNavbarEmployee />
            </HStack>
            {showRegisterTypes && (
                <HStack
                    backgroundColor="blue.800"
                    separator={<StackSeparator borderColor="blue.900" />}
                    fontSize="2xs"
                    padding="2"
                    position="sticky"
                    zIndex={40000}
                    top="52px"
                >
                    {["Wszystkie", ...REGISTER_TYPES].map(
                        (registerType, index) => {
                            const path =
                                index === 0
                                    ? "/registers"
                                    : `/registers/${index - 1}`;
                            const isCurrent = location.pathname === path;
                            return (
                                <AppNavbarLink
                                    key={registerType}
                                    color="blue.200"
                                    to={path}
                                    {...(isCurrent && {
                                        color: "blue.50",
                                        textDecoration: "underline",
                                    })}
                                >
                                    {registerType}
                                </AppNavbarLink>
                            );
                        }
                    )}
                </HStack>
            )}
        </AppNavbarEmployeeDialog>
    );
};
