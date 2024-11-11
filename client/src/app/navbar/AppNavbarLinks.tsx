import React, { useEffect, useState } from "react";
import { AppNavbarLink } from "./AppNavbarLink";
import { Float, HStack, Icon, StackSeparator } from "@chakra-ui/react";
import {
    LuHome,
    LuFileBarChart,
    LuGlobe,
    LuBriefcase,
    LuUser,
    LuHelpCircle,
    LuHammer,
    LuDatabase,
    LuKey,
    LuFileText,
    LuHardHat,
    LuLaptop,
} from "react-icons/lu";
import { AppNavbarLinkMenu } from "./AppNavbarLinkMenu";
import useAuthEmployee from "../../hooks/useAuthEmployee";
import { Tooltip } from "../../components/ui/tooltip";

export const AppNavbarLinks: React.FC = () => {
    const authEmployee = useAuthEmployee();
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

    const adminAccessIcon = (
        <Tooltip
            content="Dostęp tylko dla administratorów"
            showArrow
            openDelay={100}
            closeDelay={100}
        >
            <Float placement="bottom-center" offsetX="0" offsetY="-1.5">
                <Icon bg="red" padding="0.5" fontSize="md" rounded="full">
                    <LuKey />
                </Icon>
            </Float>
        </Tooltip>
    );

    const isAdmin: boolean = Boolean(authEmployee.query.data?.employee?.admin);

    return (
        <HStack
            direction="row"
            gap="2"
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
                    <LuFileText />
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
            <AppNavbarLink to="/help">
                <Icon fontSize="md">
                    <LuHelpCircle />
                </Icon>
                Pomoc
            </AppNavbarLink>
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
            {isAdmin && (
                <AppNavbarLinkMenu
                    isOpen={isConstructionMenuOpen}
                    setIsOpen={setIsConstructionMenuOpen}
                    Icon={LuHardHat}
                    title="Budowlanka"
                    links={[
                        {
                            to: "/construction/pkob",
                            display: "PKOB",
                            tooltip: "Polska Klasyfikacja Obiektów Budowlanych",
                        },
                        {
                            to: "/construction/art-prbud",
                            display: "Art. 29 Pr.bud.",
                        },
                    ]}
                >
                    {adminAccessIcon}
                </AppNavbarLinkMenu>
            )}
            {isAdmin && (
                <AppNavbarLink to="/employees" position="relative">
                    <Icon fontSize="md">
                        <LuUser />
                    </Icon>
                    Użytkownicy
                    {adminAccessIcon}
                </AppNavbarLink>
            )}
            {isAdmin && (
                <AppNavbarLink to="/database" position="relative">
                    <Icon fontSize="md">
                        <LuDatabase />
                    </Icon>
                    Baza Danych
                    {adminAccessIcon}
                </AppNavbarLink>
            )}
            {isAdmin && (
                <AppNavbarLink to="/system" position="relative">
                    <Icon fontSize="md">
                        <LuLaptop />
                    </Icon>
                    System
                    {adminAccessIcon}
                </AppNavbarLink>
            )}
        </HStack>
    );
};
