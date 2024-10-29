import React, { ReactNode } from "react";
import PageHomeIcon from "@mui/icons-material/Home";
import PageRegistersIcon from "@mui/icons-material/Description";
import PageGeodesyIcon from "@mui/icons-material/Public";
import PageInvestorsIcon from "@mui/icons-material/Payments";
import PageEmployeesIcon from "@mui/icons-material/Person";
import PageHelpIcon from "@mui/icons-material/Help";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
    Chip,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    // Tooltip,
    Typography,
} from "@mui/joy";
import { FaFilePdf, FaFileWord } from "react-icons/fa6";
import { AppNavbarLink } from "./AppNavbarLink";

export const AppNavbarLinks: React.FC<{ divider: ReactNode }> = ({
    divider,
}) => {
    return (
        <Stack direction="row" spacing={1} className="w-full" divider={divider}>
            <AppNavbarLink to="/">
                <PageHomeIcon fontSize="inherit" /> Główna
            </AppNavbarLink>
            <AppNavbarLink to="/registers">
                <PageRegistersIcon fontSize="inherit" />
                Rejestry
            </AppNavbarLink>
            <AppNavbarLink to="/geodesy">
                <PageGeodesyIcon fontSize="inherit" />
                Geodezja
            </AppNavbarLink>
            <AppNavbarLink to="/investors">
                <PageInvestorsIcon fontSize="inherit" />
                Inwestorzy
            </AppNavbarLink>
            <Chip
                variant="solid"
                color="primary"
                size="sm"
                startDecorator={<PageEmployeesIcon fontSize="inherit" />}
            >
                <AppNavbarLink to="/employees">Użytkownicy</AppNavbarLink>
            </Chip>
            <Dropdown>
                <MenuButton
                    variant="solid"
                    color="primary"
                    size="sm"
                    sx={{
                        fontWeight: "inherit",
                    }}
                >
                    <ArrowDownwardIcon fontSize="inherit" />
                    Budowlany
                </MenuButton>
                <Menu variant="soft" color="primary" size="sm">
                    {/* <Tooltip
                        variant="soft"
                        title="Polska Klasyfikacja Obiektów Budowlanych"
                        placement="right"
                    > */}
                    <AppNavbarLink to="/construction/pkob">
                        <MenuItem sx={{ width: "100%" }}>PKOB</MenuItem>
                    </AppNavbarLink>
                    {/* </Tooltip> */}
                    <AppNavbarLink to="/construction/art29-common">
                        <MenuItem sx={{ width: "100%" }}>
                            art. 29 Pr.bud. Zwykłe (6743.2)
                        </MenuItem>
                    </AppNavbarLink>
                    <AppNavbarLink to="/construction/art29-bip">
                        <MenuItem sx={{ width: "100%" }}>
                            art. 29 Pr.bud. BiP (6743.4)
                        </MenuItem>
                    </AppNavbarLink>
                </Menu>
            </Dropdown>
            <Dropdown>
                <MenuButton
                    variant="solid"
                    color="primary"
                    size="sm"
                    sx={{
                        padding: "0",
                        fontWeight: "inherit",
                    }}
                >
                    <ArrowDownwardIcon fontSize="inherit" />
                    Statystyka
                </MenuButton>
                <Menu variant="soft" color="primary" size="sm">
                    {/* <Tooltip
                        variant="soft"
                        title="Sprawozdanie o wydanych pozwoleniach na budowę i zgłoszeniach z projektem budowlanym budowy obiektów budowlanych"
                        placement="right"
                    > */}
                    <AppNavbarLink to="/stats/b05">
                        <MenuItem sx={{ width: "100%" }}>B-05</MenuItem>
                    </AppNavbarLink>
                    {/* </Tooltip> */}
                    {/* <Tooltip
                        variant="soft"
                        title="Meldunek o budownictwie mieszkaniowym"
                        placement="right"
                    > */}
                    <AppNavbarLink to="/stats/b06">
                        <MenuItem sx={{ width: "100%" }}>B-06</MenuItem>
                    </AppNavbarLink>
                    {/* </Tooltip> */}
                    {/* <Tooltip variant="soft" title="coś" placement="right"> */}
                    <AppNavbarLink to="/stats/gunb3">
                        <MenuItem sx={{ width: "100%" }}>GUNB-3</MenuItem>
                    </AppNavbarLink>
                    {/* </Tooltip> */}
                </Menu>
            </Dropdown>
            <Dropdown>
                <MenuButton
                    variant="solid"
                    color="primary"
                    size="sm"
                    sx={{
                        padding: "0",
                        fontWeight: "inherit",
                    }}
                >
                    <ArrowDownwardIcon fontSize="inherit" />
                    Narzędzia
                </MenuButton>
                <Menu variant="soft" color="primary" size="sm">
                    {/* <Tooltip
                        variant="soft"
                        title="Zmiana rozszerzenia dokumentu"
                        placement="right"
                    > */}
                    <AppNavbarLink
                        to="https://cloudconvert.com/document-converter"
                        target="_blank"
                    >
                        <MenuItem>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                            >
                                <Typography level="body-sm" color="primary">
                                    <Stack
                                        direction="row"
                                        sx={{
                                            alignItems: "center",
                                        }}
                                    >
                                        <FaFilePdf />
                                        <SyncAltIcon fontSize="inherit" />
                                        <FaFileWord />
                                    </Stack>
                                </Typography>
                                <Typography level="title-sm" color="primary">
                                    Konwerter dokumentów
                                </Typography>
                            </Stack>
                        </MenuItem>
                    </AppNavbarLink>
                    {/* </Tooltip> */}
                </Menu>
            </Dropdown>
            <AppNavbarLink to="/help">
                <PageHelpIcon fontSize="inherit" />
                Pomoc
            </AppNavbarLink>
        </Stack>
    );
};
