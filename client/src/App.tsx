//
// App.tsx
// Application entry component
//

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/glowna/GlownaStrona";
import RegistersPage from "./pages/rejestry/RejestryStrona";
import GeodesyPage from "./pages/geodesy/PageGeodesy";
import InvestorsPage from "./pages/investors/PageInvestors";
import AppNavbar from "./AppNavbar";
import PKOBStrona from "./pages/pkob/PKOBStrona";
import PageEmployees from "./pages/employees/PageEmployees";
import PageFormsB05 from "./pages/forms/PageFormsB05";
import PageFormsB06 from "./pages/forms/PageFormsB06";
import { WS_SERVER_URL } from "../../config";
import axios from "axios";
import React, { useState } from "react";
import WebSocketContext from "./contexts/WebSocketContext";
import PageFormsGUNB3 from "./pages/forms/PageFormsGUNB3";

axios.interceptors.request.use((req) => {
    req.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiJ9.VG9tYXN6IEpvbWFzeg.q_m8qen8Eo3NOzYp8JxFdjq-yNO8j6SQUHTBnG2pcs4";
    return req;
});

axios.interceptors.response.use(
    (res) => {
        // TODO: Message error handling
        // res.type == error etc
        return res;
    },
    (_error) => {
        // TODO: Error handling
        // if (error.code === "ERR_CANCELED") {
        //     // aborted in useEffect cleanup
        //     return Promise.resolve({ status: 499 });
        // }
        // return Promise.reject(
        //     (error.response && error.response.data) || "Error"
        // );
        // throw err;
    }
);

export default function App() {
    const [webSocket] = useState(new WebSocket(WS_SERVER_URL));

    return (
        <WebSocketContext.Provider value={webSocket}>
            <BrowserRouter>
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
                                element={<PageEmployees />}
                            />
                            <Route
                                path="/formularze/b05"
                                element={<PageFormsB05 />}
                            />
                            <Route
                                path="/formularze/b06"
                                element={<PageFormsB06 />}
                            />
                            <Route
                                path="/formularze/gunb3"
                                element={<PageFormsGUNB3 />}
                            />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </WebSocketContext.Provider>
    );
}
