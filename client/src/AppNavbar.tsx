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
import { FaFileWord, FaFilePdf } from "react-icons/fa6";
import {
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalDialog,
    Option,
    Select,
    Stack,
    Tooltip,
    Typography,
} from "@mui/joy";
import React, { useCallback, useState } from "react";
import useAuthEmployee from "./hooks/useAuthEmployee";
import { DBRows } from "../../server/src/dbTypes";
import useDBTable from "./hooks/useDBTable";
import { MdLogout } from "react-icons/md";
import {
    Construction as ConstructionIcon,
    SyncAlt as SyncAltIcon,
} from "@mui/icons-material";

// TODO: make it so u can pass in password (mui modal)
function AppNavbar() {
    const employeeDBTable = useDBTable<DBRows.Employee>("employees");
    const {
        employee,
        login: employeeLogin,
        logout: employeeLogout,
    } = useAuthEmployee();

    const [modalEmployee, setModalEmployee] = useState<DBRows.Employee | null>(
        null
    );

    // const employeeName = useMemo(() => employee?.name, [employee]);

    const handleEmployeeLogin = useCallback(
        (employee?: DBRows.Employee) => {
            if (!employee) {
                return;
            }
            if (employee.hasPassword) {
                setModalEmployee(employee);
            } else {
                employeeLogin({
                    employeeName: employee.name,
                    employeePassword: "",
                });
            }
        },
        [employeeLogin]
    );

    const handleEmployeeModalClosed = useCallback(() => {
        if (modalEmployee === null) {
            return;
        }
        employeeLogin({
            employeeName: modalEmployee.name,
            employeePassword: modalEmployee?.password,
        });
        setModalEmployee(null);
    }, [employeeLogin, modalEmployee]);

    // <nav className="w-full flex flex-row p-2 bg-blue-600 text-white font-semibold text-xs">
    return (
        <>
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
                            <Tooltip
                                variant="soft"
                                title="Sprawozdanie o wydanych pozwoleniach na budowę i zgłoszeniach z projektem budowlanym budowy obiektów budowlanych"
                                placement="right"
                            >
                                <MenuItem>
                                    <Link
                                        to="/formularze/b05"
                                        className="flex flex-row items-center gap-0.5 hover:underline"
                                    >
                                        B-05
                                    </Link>
                                </MenuItem>
                            </Tooltip>
                            <Tooltip
                                variant="soft"
                                title="Meldunek o budownictwie mieszkaniowym"
                                placement="right"
                            >
                                <MenuItem>
                                    <Link
                                        to="/formularze/b06"
                                        className="flex flex-row items-center gap-0.5 hover:underline"
                                    >
                                        B-06
                                    </Link>
                                </MenuItem>
                            </Tooltip>
                            <Tooltip
                                variant="soft"
                                title="coś"
                                placement="right"
                            >
                                <MenuItem>
                                    <Link
                                        to="/formularze/gunb3"
                                        className="flex flex-row items-center gap-0.5 hover:underline"
                                    >
                                        GUNB-3
                                    </Link>
                                </MenuItem>
                            </Tooltip>
                        </Menu>
                    </Dropdown>
                    <Dropdown>
                        <MenuButton variant="solid" color="primary" size="sm">
                            <ConstructionIcon fontSize="small" />
                            Narzędzia
                        </MenuButton>
                        <Menu>
                            <Tooltip
                                variant="soft"
                                title="Zmiana rozszerzenia dokumentu"
                                placement="right"
                            >
                                <MenuItem>
                                    <Link
                                        to="https://cloudconvert.com/document-converter"
                                        target="_blank"
                                        className="flex flex-row items-center gap-0.5 hover:underline"
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={0.5}
                                        >
                                            <Typography level="body-sm">
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <FaFilePdf />
                                                    <SyncAltIcon fontSize="small" />
                                                    <FaFileWord />
                                                </Stack>
                                            </Typography>
                                            <Typography level="title-sm">
                                                Konwerter dokumentów
                                            </Typography>
                                        </Stack>
                                    </Link>
                                </MenuItem>
                            </Tooltip>
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
                        // value={employeeName ?? null}
                        value={employee?.name}
                        placeholder="Pracownik"
                        onChange={(_, value) =>
                            handleEmployeeLogin(
                                employeeDBTable.rows.find(
                                    (employee) => employee.name === value
                                )
                            )
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
                    {employee && (
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
            <Modal
                open={modalEmployee !== null}
                onClose={handleEmployeeModalClosed}
            >
                <ModalDialog>
                    <DialogTitle>Logowanie</DialogTitle>
                    <DialogContent>
                        Konto użytkownika &quot;{modalEmployee?.name}&quot;
                        wymaga hasła
                    </DialogContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEmployeeModalClosed();
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Hasło</FormLabel>
                                {/* just to prompt the save with correct username */}
                                <Input
                                    type="username"
                                    className="hidden"
                                    value={modalEmployee?.name}
                                />
                                <Input
                                    type="password"
                                    autoFocus
                                    required
                                    value={modalEmployee?.password}
                                    onChange={(e) =>
                                        setModalEmployee(
                                            (modalEmployee) =>
                                                modalEmployee && {
                                                    ...modalEmployee,
                                                    password: e.target.value,
                                                }
                                        )
                                    }
                                />
                            </FormControl>
                            <Button type="submit">Zaloguj</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default AppNavbar;
