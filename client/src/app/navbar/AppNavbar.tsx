//
// AppNavbar.tsx
// Application navigation bar
//

import React, { useMemo } from "react";
import { AppNavbarLinks } from "./AppNavbarLinks";
import { AppNavbarEmployee } from "./AppNavbarEmployee";
import { HStack, Image, Link, StackSeparator, Text } from "@chakra-ui/react";
import { AppNavbarEmployeeDialog } from "./AppNavbarEmployeeLoginDialog";
import { REGISTER_TYPES } from "@shared/db/rows";
import { useLocation } from "react-router-dom";
import { getDateNow } from "@/utils/time";
import { AppNavbarLinkEx } from "./AppNavbarLinkEx";

const SUBROUTES = ["registers", "help", "stats", "construction"] as const;
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

    const paramRegisterType = location.pathname.split("/")[2];
    const paramRegisterYear = location.pathname.split("/")[3];

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
                    color="blue.200"
                    padding="2"
                    position="sticky"
                    zIndex={901}
                    top="52px"
                >
                    {subnavType === "registers" &&
                        ["Wszystkie", ...REGISTER_TYPES].map(
                            (registerType, index) => {
                                let path =
                                    index === 0
                                        ? "/registers/0"
                                        : `/registers/${index}`;
                                if (paramRegisterYear) {
                                    path += "/" + paramRegisterYear;
                                }
                                return (
                                    <AppNavbarLinkEx
                                        key={registerType}
                                        label={registerType}
                                        path={path}
                                    />
                                );
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
                        ].map((entry) => (
                            <AppNavbarLinkEx
                                key={entry.route}
                                label={entry.display}
                                path={"/help/" + entry.route}
                            />
                        ))}
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
                                route: "employees",
                                display: "Przydział",
                            },
                        ].map((entry) => (
                            <AppNavbarLinkEx
                                key={entry.route}
                                label={entry.display}
                                tooltip={entry.tooltip}
                                path={"/stats/" + entry.route}
                            />
                        ))}
                    {subnavType === "construction" &&
                        [
                            {
                                route: "pkob",
                                display: "PKOB",
                                tooltip:
                                    "Polska Klasyfikacja Obiektów Budowlanych",
                            },
                            {
                                route: "construction_laws",
                                display: "Prawo Budowlane",
                            },
                        ].map((entry) => (
                            <AppNavbarLinkEx
                                key={entry.route}
                                label={entry.display}
                                tooltip={entry.tooltip}
                                path={"/construction/" + entry.route}
                            />
                        ))}
                </HStack>
            )}
            {subnavType === "registers" && (
                <HStack
                    backgroundColor="blue.800"
                    separator={<StackSeparator borderColor="blue.900" />}
                    fontSize="2xs"
                    padding="2"
                    // position="sticky"
                    zIndex={900}
                    color="blue.200"
                    top="98px"
                >
                    {["Wszystkie", getDateNow().getFullYear(), 0, 0, 0, 0, 0, 0, 0, 0, 0, ". . ."] // prettier-ignore
                        .map((v, i, arr) =>
                            typeof v === "number"
                                ? (arr.at(1) as number) - (i - 1)
                                : v
                        )
                        .map((v, i, arr) =>
                            i === arr.length - 1 ? (
                                <Text key={v}>{v}</Text>
                            ) : i === 0 ? (
                                <AppNavbarLinkEx
                                    key={v}
                                    label={String(v)}
                                    path={`/registers/${
                                        paramRegisterType ?? 0
                                    }`}
                                />
                            ) : (
                                <AppNavbarLinkEx
                                    key={v}
                                    label={String(v)}
                                    path={`/registers/${
                                        paramRegisterType ?? 0
                                    }/${v}`}
                                />
                            )
                        )}
                </HStack>
            )}
        </AppNavbarEmployeeDialog>
    );
};
