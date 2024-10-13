//
// App.tsx
// Application entry component
//
// TODO: Review
//

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/glowna/GlownaStrona";
import RegistersPage from "./pages/rejestry/RejestryStrona";
import GeodesyPage from "./pages/geodesy/GeodezjaStrona";
import InvestorsPage from "./pages/investors/InwestorzyStrona";
import AppNavbar from "./AppNavbar";
import PKOBStrona from "./pages/pkob/PKOBStrona";
import WebSocketContext from "./contexts/WebSocketContext";
import { useState } from "react";
import EmployeesPage from "./pages/employees/EmployeesPage";
import PageFormsB05 from "./pages/forms/PageFormsB05";
import PageFormsB06 from "./pages/forms/PageFormsB06";
import { WS_SERVER_URL } from "../../config";
import axios from "axios";
import React from "react";

axios.interceptors.request.use((req) => {
    req.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiJ9.VG9tYXN6IERvbWFzeg.SHErRrON-bZmfsPgA50P19c2IFLESGmU3k5S_OEQj2o";
    return req;
});

axios.interceptors.response.use(
    (res) => {
        // TODO: Message error handling
        return res;
    },
    (err) => {
        // TODO: Error handling
        throw err;
    }
);

function App() {
    const [webSocket] = useState<WebSocket>(new WebSocket(WS_SERVER_URL));

    return (
        <BrowserRouter>
            <WebSocketContext.Provider value={webSocket}>
                <div className="flex flex-col justify-stretch h-full">
                    <AppNavbar />
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
