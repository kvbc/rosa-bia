/*
 *
 * App.tsx
 * Application entry component
 *
 */

import { BrowserRouter } from "react-router-dom";
import { AppNavbar } from "./navbar/AppNavbar";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import useAuthEmployee from "../hooks/useAuthEmployee";
import { HTTP } from "../../../server/src/http/types";
import { ErrorBoundary } from "react-error-boundary";
import { AppErrorFallback } from "./error/AppErrorFallback";
import { WS_SERVER_URL } from "../api/ws";
import { AppErrorModal } from "./error/AppErrorModal";
import { AppRoutes } from "./AppRoutes";
import { AppErrorSnackbar } from "./error/AppErrorSnackbar";

export type AppError = {
    brief: string;
    details: string;
    url: string;
};

export const App: React.FC = () => {
    const [webSocket] = useState(new WebSocket(WS_SERVER_URL));
    const authEmployee = useAuthEmployee();
    const [errors, setErrors] = useState<AppError[]>([]);
    const [openedError, setOpenedError] = useState<AppError | null>(null);

    //
    // Errors
    //

    const addError = useCallback((error: AppError) => {
        setErrors((errors) => [...errors, error]);
    }, []);

    const removeError = useCallback((error: AppError) => {
        setErrors((errors) => errors.filter((fError) => fError !== error));
    }, []);

    const openError = useCallback((error: AppError) => {
        setOpenedError(error);
    }, []);

    //
    // Auth Employee
    //

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
            const res: HTTP.Response = error.response.data;
            if (res.type === "error") {
                addError({
                    brief: error.message,
                    url: req.responseURL,
                    details: res.message,
                });
                return Promise.reject(error);
            }
        });
    }, [addError]);

    //
    // Render
    //

    return (
        <WebSocketContext.Provider value={webSocket}>
            <BrowserRouter>
                <div className="flex flex-col justify-stretch h-full">
                    <ErrorBoundary FallbackComponent={AppErrorFallback}>
                        <AppErrorModal
                            error={openedError}
                            onClose={() => setOpenedError(null)}
                        />
                        <AppNavbar />
                        <br />
                        <main className="flex-1 p-4">
                            <AppRoutes />
                        </main>
                        <AppErrorSnackbar
                            errors={errors}
                            onClose={removeError}
                            onOpen={openError}
                        />
                    </ErrorBoundary>
                </div>
            </BrowserRouter>
        </WebSocketContext.Provider>
    );
};
