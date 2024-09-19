import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/GlownaStrona";
import RegistersPage from "./pages/RejestryStrona";
import GeodesyPage from "./pages/geodesy/GeodezjaStrona";
import InvestorsPage from "./pages/investors/InwestorzyStrona";
import Navbar from "./components/home_page/Navbar";
import "./App.css";
import PKOBStrona from "./pages/PKOBStrona";
import KonfiguracjaStrona from "./pages/KonfiguracjaStrona";
import WebSocketContext from "./contexts/WebSocketContext";
import { useState } from "react";

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
