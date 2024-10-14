//
// App.tsx
// Application entry component
//

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/glowna/GlownaStrona";
import RegistersPage from "./pages/rejestry/RejestryStrona";
import GeodesyPage from "./pages/geodesy/GeodezjaStrona";
import InvestorsPage from "./pages/investors/InwestorzyStrona";
import AppNavbar from "./AppNavbar";
import PKOBStrona from "./pages/pkob/PKOBStrona";
import EmployeesPage from "./pages/employees/EmployeesPage";
import PageFormsB05 from "./pages/forms/PageFormsB05";
import PageFormsB06 from "./pages/forms/PageFormsB06";
import { HTTP_SERVER_URL, WS_SERVER_URL } from "../../config";
import axios from "axios";
import React, { EffectCallback } from "react";
import { DBRow, DBRows, DBTableName } from "../../server/src/dbTypes";
import { HTTPResponse, WSMessage } from "../../server/src/types";
import Emittery from "emittery";

const webSocket = new WebSocket(WS_SERVER_URL);

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
    return (
        <BrowserRouter>
            <div className="flex flex-col justify-stretch h-full">
                <AppNavbar />
                <br />
                <main className="flex-1 p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/rejestry" element={<RegistersPage />} />
                        <Route path="/geodezja" element={<GeodesyPage />} />
                        <Route path="/inwestorzy" element={<InvestorsPage />} />
                        <Route path="/pkob" element={<PKOBStrona />} />
                        <Route path="/pracownicy" element={<EmployeesPage />} />
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
        </BrowserRouter>
    );
}

// prettier-ignore
const dbTableStores: {[key in DBTableName]: unknown} = {
    "investors": createDBTableStore<DBRows.Investor>('investors'),
    "communes": createDBTableStore<DBRows.Commune>('communes'),
    "places": createDBTableStore<DBRows.Place>('places'),
    "streets": createDBTableStore<DBRows.Street>('streets'),
    "construction_sections": createDBTableStore<DBRows.ConstructionSection>('construction_sections'),
    "construction_divisions": createDBTableStore<DBRows.ConstructionDivision>('construction_divisions'),
    "construction_groups": createDBTableStore<DBRows.ConstructionGroup>('construction_groups'),
    "construction_classes": createDBTableStore<DBRows.ConstructionClass>('construction_classes'),
    "construction_specs": createDBTableStore<DBRows.ConstructionSpec>('construction_specs'),
    "registers": createDBTableStore<DBRows.Register>('registers'),
    "registers_invest_plots": createDBTableStore<DBRows.RegisterInvestPlot>('registers_invest_plots'),
    "registers_admin_actions": createDBTableStore<DBRows.RegisterAdminAction>('registers_admin_actions'),
    "employees": createDBTableStore<DBRows.Employee>('employees'),
    "info_boards": createDBTableStore<DBRows.InfoBoard>('info_boards'),
}

// prettier-ignore
export const getDBTableStore = <TRow extends DBRow>(dbTableName: DBTableName) => {
    return dbTableStores[dbTableName] as ReturnType<typeof createDBTableStore<TRow>>;
}

function createDBTableStore<TRow extends DBRow>(tableName: DBTableName) {
    const store = {
        totalRowCount: 0,
        eventEmitter: new Emittery<{
            rowAdded: TRow;
            rowDeleted: TRow;
            rowUpdated: TRow;
        }>(),
        addRow: (_row: TRow) => {},
        deleteRow: (_row: TRow) => {},
        updateRow: (_row: TRow) => {},
        fetchRows: (
            _startIndex: number,
            _endIndex: number,
            _onFetch: (rows: TRow[]) => void
        ): ReturnType<EffectCallback> => {},
    };

    const listener: WebSocket["onmessage"] = (event) => {
        const message: WSMessage<TRow> = JSON.parse(event.data);
        if (message.tableName !== tableName) return;
        switch (message.type) {
            case "table row added":
                store.eventEmitter.emit("rowAdded", message.tableRow);
                break;
            case "table row deleted":
                store.eventEmitter.emit("rowDeleted", message.tableRow);
                break;
            case "table row updated":
                store.eventEmitter.emit("rowUpdated", message.tableRow);
                break;
        }
    };
    webSocket.addEventListener("message", listener);

    store.addRow = (row: TRow) => {
        axios.post(HTTP_SERVER_URL + "/table/" + tableName, row).then(() => {
            store.eventEmitter.emit("rowAdded", row);
            store.totalRowCount++;
        });
    };

    store.deleteRow = (row: TRow) => {
        axios
            .delete(HTTP_SERVER_URL + `/table/${tableName}/${row.id}`)
            .then(() => {
                store.eventEmitter.emit("rowDeleted", row);
                store.totalRowCount--;
            });
    };

    store.updateRow = (row: TRow) => {
        axios.put(HTTP_SERVER_URL + "/table/" + tableName, row).then(() => {
            store.eventEmitter.emit("rowUpdated", row);
        });
    };

    store.fetchRows = (
        startIndex: number,
        endIndex: number,
        onFetch: (rows: TRow[]) => void
    ): ReturnType<EffectCallback> => {
        const abortController = new AbortController();
        axios
            .get<HTTPResponse<TRow>>(
                HTTP_SERVER_URL +
                    `/table/${tableName}/${startIndex}/${endIndex}`,
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                // FIXME: why?
                if (abortController.signal.aborted) return;

                const msg = res.data;
                if (msg.responseType !== "fetch table rows") {
                    throw "Invalid response type";
                }
                store.totalRowCount = msg.totalCount;
                onFetch(msg.rows);
            });
        return () => abortController.abort();
    };

    return store;
}
