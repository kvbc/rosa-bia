import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <Link to="/">Główna</Link>
            <Link to="/rejestry">Rejestry</Link>
            <Link to="/geodezja">Geodezja</Link>
            <Link to="/inwestorzy">Inwestorzy</Link>
            <Link to="/pkob">PKOB</Link>
            <Link to="/konfiguracja">Konfiguracja</Link>
        </nav>
    );
}

export default Navbar;
