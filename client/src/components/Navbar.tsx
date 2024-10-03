import { Link } from "react-router-dom";
import { FaHome, FaGlobe } from "react-icons/fa";
import { FaGear, FaMoneyBill1Wave, FaHelmetSafety } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";

function Navbar() {
    return (
        <nav className="w-full flex flex-row p-2 bg-blue-600 text-white font-semibold text-xs">
            <div className="gap-4 w-11/12 flex flex-row">
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
                    to="/konfiguracja"
                    className="flex flex-row items-center gap-0.5 hover:underline"
                >
                    <FaGear />
                    Konfiguracja
                </Link>
            </div>
            <div className="flex flex-row w-1/12 justify-end">
                <img src="logo.svg" width={24} />
            </div>
        </nav>
    );
}

export default Navbar;
