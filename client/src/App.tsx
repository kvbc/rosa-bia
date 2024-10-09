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
import PageFormsB05 from "./pages/forms/PageFormsB05";
import PageFormsB06 from "./pages/forms/PageFormsB06";

export const DB_ENTRY_ENDPOINTS = [
    "investors",

    "communes",
    "places",
    "streets",

    "construction_sections",
    "construction_divisions",
    "construction_groups",
    "construction_classes",
    "construction_specs",

    "registers",
    "registers_invest_plots",
    "registers_admin_actions",

    "employees",
    "info_boards",
] as const;
export type DBEntryEndpoint = (typeof DB_ENTRY_ENDPOINTS)[number];

function App() {
    const [webSocket, _] = useState<WebSocket>(
        new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER_HOSTNAME)
    );

    return (
        <BrowserRouter>
            <WebSocketContext.Provider value={webSocket}>
                <div className="flex flex-col justify-stretch h-full">
                    <Navbar />
                    <br />
                    <main className="flex-1 p-4">
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
                            <Route
                                path="/formularze/b05"
                                element={<PageFormsB05 />}
                            />
                            <Route
                                path="/formularze/b06"
                                element={<PageFormsB06 />}
                            />
                        </Routes>
                    </main>
                </div>
            </WebSocketContext.Provider>
        </BrowserRouter>
    );
}

export default App;
