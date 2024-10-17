//
// App.tsx
// Application entry component
//
// TODO: Move all contexts into the /contexts folder (not in same file as component)
//

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistersPage from "./pages/registers/PageRegisters";
import GeodesyPage from "./pages/geodesy/PageGeodesy";
import InvestorsPage from "./pages/investors/PageInvestors";
import AppNavbar from "./AppNavbar";
import PagePKOB from "./pages/pkob/PagePKOB";
import PageEmployees from "./pages/employees/PageEmployees";
import PageFormsB05 from "./pages/forms/PageFormsB05";
import PageFormsB06 from "./pages/forms/PageFormsB06";
import { WS_SERVER_URL } from "../../config";
import axios from "axios";
import React, { useState } from "react";
import WebSocketContext from "./contexts/WebSocketContext";
import PageFormsGUNB3 from "./pages/forms/PageFormsGUNB3";
import PageHelp from "./pages/help/PageHelp";
import PageHome from "./pages/home/PageHome";

axios.interceptors.request.use((req) => {
    req.headers.Authorization =
        "Bearer eyJhbGciOiJIUzI1NiJ9.QWRtaW4.vxfCzXinIrEvNkMl5TsrQ6K0X2aet0uJoKe7TSFRnp8";
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
                            <Route path="/" element={<PageHome />} />
                            <Route
                                path="/rejestry"
                                element={<RegistersPage />}
                            />
                            <Route path="/geodezja" element={<GeodesyPage />} />
                            <Route
                                path="/inwestorzy"
                                element={<InvestorsPage />}
                            />
                            <Route path="/pkob" element={<PagePKOB />} />
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
                            <Route path="/help" element={<PageHelp />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </WebSocketContext.Provider>
    );
}
