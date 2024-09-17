import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegistersPage from "./pages/RegistersPage";
import GeodesyPage from "./pages/GeodesyPage";
import InvestorsPage from "./pages/InvestorsPage";
import Navbar from "./components/home_page/Navbar";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <br />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/registers" element={<RegistersPage />} />
                    <Route path="/geodesy" element={<GeodesyPage />} />
                    <Route path="/investors" element={<InvestorsPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
