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
import React, { useCallback, useEffect, useState } from "react";
import WebSocketContext from "./contexts/WebSocketContext";
import PageFormsGUNB3 from "./pages/forms/PageFormsGUNB3";
import PageHelp from "./pages/help/PageHelp";
import PageHome from "./pages/home/PageHome";
import useAuthEmployee from "./hooks/useAuthEmployee";
import {
    DialogTitle,
    IconButton,
    Modal,
    ModalClose,
    ModalDialog,
    Snackbar,
    Stack,
    Typography,
} from "@mui/joy";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import { HTTPResponse } from "../../server/src/types";
import { DialogContent } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import AppErrorFallback from "./AppErrorFallback";
// import { CssVarsProvider } from "@mui/joy";
// import { appTheme } from "./AppTheme";

type AppError = {
    brief: string;
    details: string;
};

export default function App() {
    const [webSocket] = useState(new WebSocket(WS_SERVER_URL));
    const authEmployee = useAuthEmployee();
    const [errors, setErrors] = useState<AppError[]>([]);
    const [openedError, setOpenedError] = useState<AppError | null>(null);

    const addError = useCallback((error: AppError) => {
        try {
            // error.details = JSON.stringify(JSON.parse(error.details), null, 4);
        } finally {
            setErrors((errors) => [...errors, error]);
        }
    }, []);

    const removeError = useCallback((error: AppError) => {
        setErrors((errors) => errors.filter((fError) => fError !== error));
    }, []);

    useEffect(() => {
        const id = axios.interceptors.request.use((req) => {
            req.headers.Authorization = `Bearer ${authEmployee.jwtToken}`;
            return req;
        });
        return () => {
            axios.interceptors.request.eject(id);
        };
    }, [authEmployee.jwtToken]);

    useEffect(() => {
        axios.interceptors.response.use(null, (error) => {
            const req: XMLHttpRequest = error.request;
            const res: HTTPResponse = error.response.data;
            if (res.responseType === "error") {
                addError({
                    brief: error.message,
                    details: req.responseURL + "\n" + res.message,
                });
                return Promise.reject(error);
            }
            // return Promise.reject(error);
        });
    }, [addError]);

    return (
        <WebSocketContext.Provider value={webSocket}>
            <BrowserRouter>
                <div className="flex flex-col justify-stretch h-full">
                    <ErrorBoundary FallbackComponent={AppErrorFallback}>
                        <Modal
                            open={openedError !== null}
                            onClose={() => setOpenedError(null)}
                        >
                            <ModalDialog>
                                <ModalClose />
                                <DialogTitle>Error</DialogTitle>
                                <DialogContent>
                                    {openedError?.brief}
                                    <br />
                                    <pre>
                                        <code>{openedError?.details}</code>
                                    </pre>
                                </DialogContent>
                            </ModalDialog>
                        </Modal>
                        <AppNavbar />
                        <br />
                        <main className="flex-1 p-4">
                            <Routes>
                                <Route path="/" element={<PageHome />} />
                                <Route
                                    path="/rejestry"
                                    element={<RegistersPage />}
                                />
                                <Route
                                    path="/geodezja"
                                    element={<GeodesyPage />}
                                />
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
                        {errors.map((error, errorIndex) => (
                            <Snackbar
                                key={errorIndex}
                                open={true}
                                color="danger"
                                variant="solid"
                                onClose={() => removeError(error)}
                                autoHideDuration={3000}
                                startDecorator={<ErrorIcon />}
                                endDecorator={
                                    <IconButton
                                        color="danger"
                                        size="sm"
                                        variant="solid"
                                        onClick={() => removeError(error)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            >
                                <Stack spacing={2} alignItems="start">
                                    {error.brief}
                                    <Typography
                                        className="text-slate-300 text-xs"
                                        component="button"
                                        onClick={() => setOpenedError(error)}
                                    >
                                        Pokaż więcej
                                    </Typography>
                                </Stack>
                            </Snackbar>
                        ))}
                    </ErrorBoundary>
                </div>
            </BrowserRouter>
        </WebSocketContext.Provider>
    );
}
