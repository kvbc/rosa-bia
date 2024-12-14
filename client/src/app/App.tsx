/*
 *
 * App.tsx
 * Application entry component
 *
 */

import { BrowserRouter } from "react-router-dom";
import { AppNavbar } from "./navbar/AppNavbar";
import React, { useCallback, useState } from "react";
import WebSocketContext from "@/contexts/WebSocketContext";
import { ErrorBoundary } from "react-error-boundary";
import { AppErrorFallback } from "./error/AppErrorFallback";
import { WS_SERVER_URL } from "@/api/ws";
import { AppErrorDialog } from "./error/AppErrorDialog";
import { AppPageRoutes } from "./AppPageRoutes";
import { Provider as UIProvider } from "@/components/ui/provider";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Box, Stack } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppEmployee } from "./AppEmployee";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppFooter } from "./AppFooter";

const queryClient = new QueryClient();

export type AppError = {
    brief: string;
    details: string;
    url: string;
};

// TODO: use Zod on client to verify responses
export const App: React.FC = () => {
    const [webSocket] = useState(new WebSocket(WS_SERVER_URL));
    const [openedError, setOpenedError] = useState<AppError | null>(null);

    //
    // Errors
    //

    const addError = useCallback((error: AppError) => {
        toaster.error({
            title: "Błąd",
            description: error.brief,
            type: "error",
            action: {
                label: "Więcej",
                onClick() {
                    setOpenedError(error);
                },
            },
        });
    }, []);

    //
    // Render
    //

    return (
        <QueryClientProvider client={queryClient}>
            <AppEmployee addError={addError}>
                <UIProvider>
                    <ErrorBoundary FallbackComponent={AppErrorFallback}>
                        <WebSocketContext.Provider value={webSocket}>
                            <BrowserRouter>
                                <ReactQueryDevtools buttonPosition="bottom-right" />
                                <Toaster />
                                <AppErrorDialog
                                    error={openedError}
                                    onClose={() => setOpenedError(null)}
                                />
                                <Stack height="full" gap="0">
                                    <AppNavbar />
                                    <Box
                                        as="main"
                                        padding="4"
                                        backgroundColor="white"
                                        flex="1"
                                        alignItems="stretch"
                                        // height="100%"
                                        fontSize="2xs"
                                    >
                                        <AppPageRoutes />
                                    </Box>
                                    <AppFooter />
                                </Stack>
                            </BrowserRouter>
                            {/* <Test /> */}
                        </WebSocketContext.Provider>
                    </ErrorBoundary>
                </UIProvider>
            </AppEmployee>
        </QueryClientProvider>
    );
};
