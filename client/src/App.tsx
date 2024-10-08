import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/glowna/GlownaStrona";
import RegistersPage from "./pages/rejestry/RejestryStrona";
import GeodesyPage from "./pages/geodesy/GeodezjaStrona";
import InvestorsPage from "./pages/investors/InwestorzyStrona";
import Navbar from "./components/Navbar";
import "./App.css";
import PKOBStrona from "./pages/pkob/PKOBStrona";
import WebSocketContext from "./contexts/WebSocketContext";
import { useState } from "react";
import EmployeesPage from "./pages/employees/EmployeesPage";

export const DB_ENTRY_ENDPOINTS = [
    "inwestorzy",
    "gminy",
    "miejscowosci",
    "ulice",
    "typy_czynnosci_admin",
    "sekcje_budowlane",
    "dzialy_budowlane",
    "grupy_budowlane",
    "klasy_budowlane",
    "typy_budowy",
    "formy_budownictwa",
    "planowania_przestrzenne",
    "rejestry",
    "rejestry_typy_budowy",
    "rejestry_dzialki_objete_inwestycja",
    "rejestry_czynnosci_admin",
    "tablice_informacyjne",
    "wyszczegolnienia_budowlane",
] as const;
export type DBEntryEndpoint = (typeof DB_ENTRY_ENDPOINTS)[number];

function App() {
    const [webSocket, _] = useState<WebSocket>(
        new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER_HOSTNAME)
    );

    return (
        <BrowserRouter>
            <div className="flex flex-col justify-stretch h-full">
                <Navbar />
                <br />
                <main className="flex-1 p-4">
                    <WebSocketContext.Provider value={webSocket}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/rejestry"
                                element={<RegistersPage />}
                            />
                            <Route path="/geodezja" element={<GeodesyPage />} />
                            <Route
                                path="/inwestorzy"
                                element={<InvestorsPage />}
                            />
                            <Route path="/pkob" element={<PKOBStrona />} />
                            <Route
                                path="/pracownicy"
                                element={<EmployeesPage />}
                            />
                        </Routes>
                    </WebSocketContext.Provider>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
