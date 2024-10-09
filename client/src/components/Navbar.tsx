import { Link } from "react-router-dom";
import { FaHome, FaGlobe, FaUser } from "react-icons/fa";
import { FaGear, FaMoneyBill1Wave, FaHelmetSafety } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { SiGoogleforms } from "react-icons/si";
import { Option, Select, Tooltip } from "@mui/joy";
import useDBEntriesStore from "../hooks/useDBEntriesStore";
import { useState } from "react";
import { DB } from "../../../server/src/dbTypes";

function Navbar() {
    const employeeDBEntries = useDBEntriesStore<DB.Employee>('employees')(); // prettier-ignore
    const [employeeID, setEmployeeID] = useState<number>(0);

    return (
        <nav className="w-full flex flex-row p-2 bg-blue-600 text-white font-semibold text-xs">
            <div className="gap-4 w-8/12 flex flex-row">
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
                    </Menu>
                </Dropdown>
            </div>
            <div className="flex flex-row w-4/12 justify-end gap-2">
                <Select
                    size="sm"
                    value={employeeID}
                    placeholder="... Pracownik"
                    onChange={(_, value) => setEmployeeID(value ?? 0)}
                >
                    {employeeDBEntries.entries.map((entry) => (
                        <Option key={entry.id} value={entry.id}>
                            {entry.name}
                        </Option>
                    ))}
                </Select>
                <img src="logo.svg" width={24} />
            </div>
        </nav>
    );
}

export default Navbar;
