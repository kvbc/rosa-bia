//
// AppNavbar.tsx
// Application navigation bar
//

import { Link } from "react-router-dom";
import { FaHome, FaGlobe, FaUser, FaQuestionCircle } from "react-icons/fa";
import { FaMoneyBill1Wave, FaHelmetSafety } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { SiGoogleforms } from "react-icons/si";
import { IconButton, Option, Select, Stack, Tooltip } from "@mui/joy";
import React, { useMemo } from "react";
import useEmployee from "./hooks/useEmployee";
import { DBRows } from "../../server/src/dbTypes";
import useDBTable from "./hooks/useDBTable";
import { MdLogout } from "react-icons/md";

function AppNavbar() {
    const employeeDBTable = useDBTable<DBRows.Employee>("employees");
    const { employee, employeeLogin, employeeLogout } = useEmployee();
    const employeeName = useMemo(() => employee?.name, [employee]);

    // <nav className="w-full flex flex-row p-2 bg-blue-600 text-white font-semibold text-xs">
    return (
        <Stack
            component="nav"
            className="bg-blue-600 p-2 font-semibold text-xs text-white"
            direction="row"
        >
            <Stack direction="row" spacing={2} className="w-full">
                <img src="logo.svg" width={24} />
                <Link
                    to="/"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <FaHome /> Główna
                </Link>
                <Link
                    to="/rejestry"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <BiSolidNotepad />
                    Rejestry
                </Link>
                <Link
                    to="/geodezja"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <FaGlobe />
                    Geodezja
                </Link>
                <Link
                    to="/inwestorzy"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <FaMoneyBill1Wave />
                    Inwestorzy
                </Link>
                <Link
                    to="/pkob"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <FaHelmetSafety />
                    PKOB
                </Link>
                <Link
                    to="/pracownicy"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <FaUser />
                    Pracownicy
                </Link>
                <Dropdown>
                    <MenuButton variant="solid" color="primary" size="sm">
                        <SiGoogleforms />
                        Formularze
                    </MenuButton>
                    <Menu>
                        <MenuItem>
                            <Tooltip
                                variant="soft"
                                title="Sprawozdanie o wydanych pozwoleniach na budowę i zgłoszeniach z projektem budowlanym budowy obiektów budowlanych"
                                placement="top"
                            >
                                <Link
                                    to="/formularze/b05"
                                    className="flex flex-row items-center gap-0.5 hover:underline"
                                >
                                    B-05
                                </Link>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip
                                variant="soft"
                                title="Meldunek o budownictwie mieszkaniowym"
                            >
                                <Link
                                    to="/formularze/b06"
                                    className="flex flex-row items-center gap-0.5 hover:underline"
                                >
                                    B-06
                                </Link>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip variant="soft" title="nie wiem">
                                <Link
                                    to="/formularze/gunb3"
                                    className="flex flex-row items-center gap-0.5 hover:underline"
                                >
                                    GUNB-3
                                </Link>
                            </Tooltip>
                        </MenuItem>
                    </Menu>
                </Dropdown>
                <Link
                    to="/help"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <FaQuestionCircle />
                    Pomoc
                </Link>
            </Stack>
            <Stack direction="row">
                <Select
                    size="sm"
                    variant="solid"
                    color="primary"
                    value={employeeName ?? null}
                    placeholder="Pracownik"
                    onChange={(_, value) =>
                        value === null
                            ? employeeLogout()
                            : employeeLogin({
                                  employeeName: value,
                                  employeePassword: "",
                              })
                    }
                >
                    {employeeDBTable.rows.map((employee) => (
                        <Option
                            variant="soft"
                            key={employee.id}
                            value={employee.name}
                            color={employee.admin ? "danger" : "primary"}
                        >
                            {employee.name}
                        </Option>
                    ))}
                </Select>
                {employeeName && (
                    <IconButton
                        onClick={employeeLogout}
                        size="sm"
                        variant="solid"
                        color="danger"
                    >
                        <MdLogout />
                    </IconButton>
                )}
            </Stack>
        </Stack>
    );
}

export default AppNavbar;
