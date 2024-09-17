import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <Link to="/">Główna</Link>
            <Link to="/registers">Rejestry</Link>
            <Link to="/geodesy">Geodezja</Link>
            <Link to="/investors">Inwestorzy</Link>
        </nav>
    );
}

export default Navbar;
