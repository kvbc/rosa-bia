import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/glowna/GlownaStrona";
import RegistersPage from "./pages/rejestry/RejestryStrona";
import GeodesyPage from "./pages/geodesy/GeodezjaStrona";
import InvestorsPage from "./pages/investors/InwestorzyStrona";
import Navbar from "./pages/glowna/Navbar";
import "./App.css";
import PKOBStrona from "./pages/PKOBStrona";
import KonfiguracjaStrona from "./pages/config/KonfiguracjaStrona";
import WebSocketContext from "./contexts/WebSocketContext";
import { useState } from "react";
import useDBEntries from "./hooks/useDBEntries";
import {
    Gmina,
    Inwestor,
    Miejscowosc,
    TypeEntry,
    Ulica,
} from "../../server/src/types";
import CommuneEntriesContext from "./contexts/CommuneEntriesContext";
import InvestorEntriesContext from "./contexts/InvestorEntriesContext";
import PlaceEntriesContext from "./contexts/PlaceEntriesContext";
import StreetEntriesContext from "./contexts/StreetEntriesContext";
import MayorDecisionTypeDBEntriesContext from "./contexts/MayorDecisionTypeDBEntriesContext";
import ResolutionTypeDBEntriesContext from "./contexts/ResolutionTypeDBEntriesContext";
import AdminActionTypeDBEntriesContext from "./contexts/AdminActionTypeDBEntriesContext";
import RegisterTypeDBEntriesContext from "./contexts/RegisterTypeDBEntriesContext";

export enum DBEntryEndpoint {
    Investor = "inwestorzy",
    Commune = "gminy",
    Place = "miejscowosci",
    Street = "ulice",
    MayorDecisionTypes = "typy_decyzji_starosty",
    ResolutionTypes = "typy_rozstrzygniec",
    AdminActionTypes = "typy_czynnosci_admin",
    RegisterTypes = "typy_rejestrow",
}

function App() {
    const [webSocket, _] = useState<WebSocket>(
        new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER_HOSTNAME)
    );
    const communeDBEntries = useDBEntries<Gmina>(
        DBEntryEndpoint.Commune,
        webSocket
    );
    const investorDBEntries = useDBEntries<Inwestor>(
        DBEntryEndpoint.Investor,
        webSocket
    );
    const placeDBEntries = useDBEntries<Miejscowosc>(
        DBEntryEndpoint.Place,
        webSocket
    );
    const streetDBEntries = useDBEntries<Ulica>(
        DBEntryEndpoint.Street,
        webSocket
    );
    const mayorDecisionTypeDBEntries = useDBEntries<TypeEntry>(
        DBEntryEndpoint.MayorDecisionTypes
    );
    const resolutionTypeDBEntries = useDBEntries<TypeEntry>(
        DBEntryEndpoint.ResolutionTypes
    );
    const adminActionTypeDBEntries = useDBEntries<TypeEntry>(
        DBEntryEndpoint.AdminActionTypes
    );
    const registerTypeDBEntries = useDBEntries<TypeEntry>(
        DBEntryEndpoint.RegisterTypes
    );

    return (
        <BrowserRouter>
            <Navbar />
            <br />
            <main>
                <WebSocketContext.Provider value={webSocket}>
                    <CommuneEntriesContext.Provider value={communeDBEntries}>
                        <InvestorEntriesContext.Provider
                            value={investorDBEntries}
                        >
                            <PlaceEntriesContext.Provider
                                value={placeDBEntries}
                            >
                                <StreetEntriesContext.Provider
                                    value={streetDBEntries}
                                >
                                    <MayorDecisionTypeDBEntriesContext.Provider
                                        value={mayorDecisionTypeDBEntries}
                                    >
                                        <ResolutionTypeDBEntriesContext.Provider
                                            value={resolutionTypeDBEntries}
                                        >
                                            <AdminActionTypeDBEntriesContext.Provider
                                                value={adminActionTypeDBEntries}
                                            >
                                                <RegisterTypeDBEntriesContext.Provider
                                                    value={
                                                        registerTypeDBEntries
                                                    }
                                                >
                                                    <Routes>
                                                        <Route
                                                            path="/"
                                                            element={
                                                                <HomePage />
                                                            }
                                                        />
                                                        <Route
                                                            path="/rejestry"
                                                            element={
                                                                <RegistersPage />
                                                            }
                                                        />
                                                        <Route
                                                            path="/geodezja"
                                                            element={
                                                                <GeodesyPage />
                                                            }
                                                        />
                                                        <Route
                                                            path="/inwestorzy"
                                                            element={
                                                                <InvestorsPage />
                                                            }
                                                        />
                                                        <Route
                                                            path="/pkob"
                                                            element={
                                                                <PKOBStrona />
                                                            }
                                                        />
                                                        <Route
                                                            path="/konfiguracja"
                                                            element={
                                                                <KonfiguracjaStrona />
                                                            }
                                                        />
                                                    </Routes>
                                                </RegisterTypeDBEntriesContext.Provider>
                                            </AdminActionTypeDBEntriesContext.Provider>
                                        </ResolutionTypeDBEntriesContext.Provider>
                                    </MayorDecisionTypeDBEntriesContext.Provider>
                                </StreetEntriesContext.Provider>
                            </PlaceEntriesContext.Provider>
                        </InvestorEntriesContext.Provider>
                    </CommuneEntriesContext.Provider>
                </WebSocketContext.Provider>
            </main>
        </BrowserRouter>
    );
}

export default App;
