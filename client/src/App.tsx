import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/glowna/GlownaStrona";
import RegistersPage from "./pages/rejestry/RejestryStrona";
import GeodesyPage from "./pages/geodesy/GeodezjaStrona";
import InvestorsPage from "./pages/investors/InwestorzyStrona";
import Navbar from "./pages/glowna/Navbar";
import "./App.css";
import PKOBStrona from "./pages/pkob/PKOBStrona";
import KonfiguracjaStrona from "./pages/config/KonfiguracjaStrona";
import WebSocketContext from "./contexts/WebSocketContext";
import { useState } from "react";

export const DB_ENTRY_ENDPOINTS = [
    "inwestorzy",
    "gminy",
    "miejscowosci",
    "ulice",
    "typy_decyzji_starosty",
    "typy_rozstrzygniec",
    "typy_czynnosci_admin",
    "typy_rejestrow",
    "sekcje_budowlane",
    "dzialy_budowlane",
    "zamierzenia_budowlane",
    "klasy_budowlane",
    "typy_budowy",
    "formy_budownictwa",
    "planowania_przestrzenne",
    "rejestry",
    "rejestry_typy_budowy",
    "rejestry_dzialki_objete_inwestycja",
    "rejestry_czynnosci_admin",
] as const;
export type DBEntryEndpoint = (typeof DB_ENTRY_ENDPOINTS)[number];

function App() {
    const [webSocket, _] = useState<WebSocket>(
        new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER_HOSTNAME)
    );

    return (
        <BrowserRouter>
            <Navbar />
            <br />
            <main>
                <WebSocketContext.Provider value={webSocket}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/rejestry" element={<RegistersPage />} />
                        <Route path="/geodezja" element={<GeodesyPage />} />
                        <Route path="/inwestorzy" element={<InvestorsPage />} />
                        <Route path="/pkob" element={<PKOBStrona />} />
                        <Route
                            path="/konfiguracja"
                            element={<KonfiguracjaStrona />}
                        />
                    </Routes>
                </WebSocketContext.Provider>
            </main>
        </BrowserRouter>
    );
}

export default App;
