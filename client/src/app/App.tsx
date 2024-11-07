/*
 *
 * App.tsx
 * Application entry component
 *
 */

import { BrowserRouter } from "react-router-dom";
import { AppNavbar } from "./navbar/AppNavbar";
import React, { useCallback, useState } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import { ErrorBoundary } from "react-error-boundary";
import { AppErrorFallback } from "./error/AppErrorFallback";
import { WS_SERVER_URL } from "../api/ws";
import { AppErrorDialog } from "./error/AppErrorDialog";
import { AppRoutes } from "./AppRoutes";
import { Provider as UIProvider } from "../components/ui/provider";
import { Toaster, toaster } from "../components/ui/toaster";
import { Box, Stack, Table } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppEmployee } from "./AppEmployee";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TableEditRowInput } from "../components/table_edit/row/input/TableEditRowInput";
import { TableEditRowInputNumber } from "../components/table_edit/row/input/TableEditRowInputNumber";
import { TableEditRow } from "../components/table_edit/row/TableEditRow";
import { MyTable } from "../components/my_table/MyTable";

const queryClient = new QueryClient();

export type AppError = {
    brief: string;
    details: string;
    url: string;
};

const Test = () => {
    const [row, setRow] = useState({ id: 1, test: 123 });
    return (
        <>
            <MyTable
                headers={["test"]}
                rows={[
                    [
                        <MyTable
                            key="1"
                            headers={["test", "test 2"]}
                            rows={[
                                [
                                    <TableEditRowInputNumber
                                        type="number"
                                        key="1"
                                        row={row}
                                        rowKey="test"
                                        setRow={(row) => setRow(row)}
                                        onFocusOut={() => {}}
                                        // disabled
                                        getSelectOptions={() => ["1", "2", "3"]}
                                    />,
                                    <MyTable
                                        key="1"
                                        headers={["test", "mm"]}
                                        rows={[
                                            [
                                                <TableEditRowInput
                                                    type="text"
                                                    key="1"
                                                    row={row}
                                                    rowKey="test"
                                                    setRow={(row) =>
                                                        setRow(row)
                                                    }
                                                    onFocusOut={() => {}}
                                                    // disabled
                                                    getSelectOptions={() => [
                                                        "1",
                                                        "2",
                                                        "3",
                                                    ]}
                                                />,
                                                <Table.Root key="2">
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <TableEditRow
                                                                row={row}
                                                                editable
                                                                stateProp="viewing"
                                                                inputsProps={[
                                                                    {
                                                                        rowKey: "test",
                                                                        type: "text",
                                                                    },
                                                                ]}
                                                                saveOnInputFocusOut
                                                                showSaveAction
                                                                onAddClicked={() => {}}
                                                                onDeleteClicked={() => {}}
                                                                onSaveClicked={() => {}}
                                                            />
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table.Root>,
                                            ],
                                        ]}
                                    />,
                                ],
                            ]}
                        />,
                    ],
                ]}
            />
        </>
    );
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
                                <ReactQueryDevtools buttonPosition="bottom-left" />
                                <Toaster />
                                <AppErrorDialog
                                    error={openedError}
                                    onClose={() => setOpenedError(null)}
                                />
                                <Stack height="full" gap="0">
                                    <AppNavbar />
                                    <Box as="main" padding="4">
                                        <AppRoutes />
                                    </Box>
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
