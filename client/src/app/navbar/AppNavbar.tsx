//
// AppNavbar.tsx
// Application navigation bar
//

import React, { useMemo } from "react";
import { AppNavbarLinks } from "./AppNavbarLinks";
import { AppNavbarEmployee } from "./AppNavbarEmployee";
import { HStack, Image, Link, StackSeparator } from "@chakra-ui/react";
import { AppNavbarEmployeeDialog } from "./AppNavbarEmployeeLoginDialog";
import { REGISTER_TYPES } from "@shared/db/rows";
import { AppNavbarLink } from "./AppNavbarLink";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@/components/ui/tooltip";

const SUBROUTES = ["registers", "help", "stats"] as const;
type SubrouteType = (typeof SUBROUTES)[number] | "none";

export const AppNavbar: React.FC = () => {
    const location = useLocation();
    const subnavType: SubrouteType = useMemo(() => {
        for (const subroute of SUBROUTES) {
            if (location.pathname.startsWith("/" + subroute)) {
                return subroute;
            }
        }
        return "none";
    }, [location.pathname]);

    const renderLink = (
        label: string,
        path: string,
        tooltip: string | undefined = undefined
    ) => {
        const isCurrent = location.pathname === path;
        const link = (
            <AppNavbarLink
                key={label}
                color="blue.200"
                to={path}
                {...(isCurrent && {
                    // color: "blue.50",
                    backgroundColor: "blue.700",
                    padding: "0.5",
                    textDecoration: "underline",
                })}
            >
                {label}
            </AppNavbarLink>
        );
        if (tooltip) {
            return <Tooltip content={tooltip}>{link}</Tooltip>;
        }
        return link;
    };

    return (
        <AppNavbarEmployeeDialog>
            <HStack
                as="nav"
                position="sticky"
                top="0"
                zIndex={1000}
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
            {subnavType !== "none" && (
                <HStack
                    backgroundColor="blue.800"
                    separator={<StackSeparator borderColor="blue.900" />}
                    fontSize="2xs"
                    padding="2"
                    position="sticky"
                    zIndex={900}
                    top="52px"
                >
                    {subnavType === "registers" &&
                        ["Wszystkie", ...REGISTER_TYPES].map(
                            (registerType, index) => {
                                const path =
                                    index === 0
                                        ? "/registers"
                                        : `/registers/${index - 1}`;
                                return renderLink(registerType, path);
                            }
                        )}
                    {subnavType === "help" &&
                        [
                            { route: "contact", display: "Kontakt" },
                            {
                                route: "user_manual",
                                display: "Instrukcja obsługi",
                            },
                            {
                                route: "program_info",
                                display: "Informacje o programie",
                            },
                        ].map((entry) =>
                            renderLink(entry.display, "/help/" + entry.route)
                        )}
                    {subnavType === "stats" &&
                        [
                            {
                                route: "b05",
                                display: "Generator B-05",
                                tooltip:
                                    "Sprawozdanie o wydanych pozwoleniach na budowę i zgłoszeniach z projektem budowlanym budowy obiektów budowlanych",
                            },
                            {
                                route: "b06",
                                display: "Generator B-06",
                                tooltip:
                                    "Meldunek o budownictwie mieszkaniowym",
                            },
                            {
                                route: "gunb3",
                                display: "Generator GUNB-03",
                            },
                            {
                                route: "assigned",
                                display: "Przydział",
                            },
                        ].map((entry) =>
                            renderLink(
                                entry.display,
                                "/stats/" + entry.route,
                                entry.tooltip
                            )
                        )}
                </HStack>
            )}
        </AppNavbarEmployeeDialog>
    );
};
