import React, { useEffect, useState } from "react";
import { AppNavbarLink } from "./AppNavbarLink";
import { HStack, Icon, StackSeparator } from "@chakra-ui/react";
import {
    LuHome,
    LuFileArchive,
    LuFileBarChart,
    LuGlobe,
    LuBriefcase,
    LuUser,
    LuHelpCircle,
    LuConstruction,
    LuHammer,
} from "react-icons/lu";
import { AppNavbarLinkMenu } from "./AppNavbarLinkMenu";

export const AppNavbarLinks: React.FC = () => {
    const [isStatsMenuOpen, setIsStatsMenuOpen] = useState<boolean>(false);
    const [isConstructionMenuOpen, setIsConstructionMenuOpen] = useState<boolean>(false); // prettier-ignore
    const [isToolsMenuOpen, setIsToolsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isStatsMenuOpen) {
            setIsConstructionMenuOpen(false);
            setIsToolsMenuOpen(false);
        }
    }, [isStatsMenuOpen]);

    useEffect(() => {
        if (isConstructionMenuOpen) {
            setIsStatsMenuOpen(false);
            setIsToolsMenuOpen(false);
        }
    }, [isConstructionMenuOpen]);

    useEffect(() => {
        if (isToolsMenuOpen) {
            setIsStatsMenuOpen(false);
            setIsConstructionMenuOpen(false);
        }
    }, [isToolsMenuOpen]);

    return (
        <HStack
            direction="row"
            gap="2"
            width="8/12"
            separator={<StackSeparator borderColor="blue.800" />}
        >
            <AppNavbarLink to="/">
                <Icon fontSize="md">
                    <LuHome />
                </Icon>
                Główna
            </AppNavbarLink>
            <AppNavbarLink to="/registers">
                <Icon fontSize="md">
                    <LuFileArchive />
                </Icon>
                Rejestry
            </AppNavbarLink>
            <AppNavbarLink to="/geodesy">
                <Icon fontSize="md">
                    <LuGlobe />
                </Icon>
                Geodezja
            </AppNavbarLink>
            <AppNavbarLink to="/investors">
                <Icon fontSize="md">
                    <LuBriefcase />
                </Icon>
                Inwestorzy
            </AppNavbarLink>
            <AppNavbarLink to="/employees">
                <Icon fontSize="md">
                    <LuUser />
                </Icon>
                Użytkownicy
            </AppNavbarLink>
            <AppNavbarLink to="/help">
                <Icon fontSize="md">
                    <LuHelpCircle />
                </Icon>
                Pomoc
            </AppNavbarLink>
            <AppNavbarLinkMenu
                isOpen={isConstructionMenuOpen}
                setIsOpen={setIsConstructionMenuOpen}
                Icon={LuConstruction}
                title="Budowlanka"
                links={[
                    {
                        to: "/construction/pkob",
                        display: "PKOB",
                        tooltip: "Polska Klasyfikacja Obiektów Budowlanych",
                    },
                    {
                        to: "/construction/art29-common",
                        display: "art. 29 Pr.bud. Zwykłe (6743.2)",
                    },
                    {
                        to: "/construction/art29-bip",
                        display: "art. 29 Pr.bud. BiP (6743.4)",
                    },
                ]}
            />
            <AppNavbarLinkMenu
                isOpen={isStatsMenuOpen}
                setIsOpen={setIsStatsMenuOpen}
                Icon={LuFileBarChart}
                title="Statystyka"
                links={[
                    {
                        to: "/stats/b05",
                        display: "Generator B-05",
                        tooltip:
                            "Sprawozdanie o wydanych pozwoleniach na budowę i zgłoszeniach z projektem budowlanym budowy obiektów budowlanych",
                    },
                    {
                        to: "/stats/b06",
                        display: "Generator B-06",
                        tooltip: "Meldunek o budownictwie mieszkaniowym",
                    },
                    {
                        to: "/stats/gunb3",
                        display: "Generator GUNB-03",
                    },
                ]}
            />
            <AppNavbarLinkMenu
                isOpen={isToolsMenuOpen}
                setIsOpen={setIsToolsMenuOpen}
                Icon={LuHammer}
                title="Narzędzia"
                links={[
                    {
                        to: "https://cloudconvert.com/document-converter",
                        display: "Konwerter dokumentów",
                        tooltip: "Zmiana rozszerzenia dokumentu",
                        openInNewTab: true,
                    },
                ]}
            />
        </HStack>
    );
};
