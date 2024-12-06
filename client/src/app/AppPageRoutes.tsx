import React from "react";
import { Route, Routes } from "react-router-dom";
import PageHome from "../pages/home/PageHome";
import PageRegisters from "../pages/registers/PageRegisters";
import PageGeodesy from "../pages/geodesy/PageGeodesy";
import PageInvestors from "../pages/investors/PageInvestors";
import PagePKOB from "../pages/pkob/PagePKOB";
import PageEmployees from "../pages/employees/PageEmployees";
import PageStatsB05 from "../pages/stats/PageStatsB05";
import PageStatsB06 from "../pages/stats/PageStatsB06";
import PageStatsGUNB3 from "../pages/stats/PageStatsGUNB3";
import PageHelpContact from "../pages/help/PageHelpContact";
import { PageDatabase } from "../pages/database/PageDatabase";
import { PageConstructionLaws } from "../pages/construction_laws/PageConstructionLaws";
import { PageSystem } from "../pages/system/PageSystem";
import { AppPage } from "./AppPage";
import { PageHelpUserManual } from "../pages/help/PageHelpUserManual";
import PageHelpProgramInfo from "@/pages/help/PageHelpProgramInfo";
import { PageEventLog } from "@/pages/eventlog/PageEventLog";

export const AppPageRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppPage dontRequireLogin>
                        <PageHome />
                    </AppPage>
                }
            />
            <Route
                path="/registers"
                element={
                    <AppPage>
                        <PageRegisters />
                    </AppPage>
                }
            />
            <Route
                path="/geodesy"
                element={
                    <AppPage>
                        <PageGeodesy />
                    </AppPage>
                }
            />
            <Route
                path="/investors"
                element={
                    <AppPage>
                        <PageInvestors />
                    </AppPage>
                }
            />
            <Route
                path="/stats/b05"
                element={
                    <AppPage>
                        <PageStatsB05 />
                    </AppPage>
                }
            />
            <Route
                path="/stats/b06"
                element={
                    <AppPage>
                        <PageStatsB06 />
                    </AppPage>
                }
            />
            <Route
                path="/stats/gunb3"
                element={
                    <AppPage>
                        <PageStatsGUNB3 />
                    </AppPage>
                }
            />
            <Route
                path="/help/contact"
                element={
                    <AppPage dontRequireLogin>
                        <PageHelpContact />
                    </AppPage>
                }
            />
            <Route
                path="/help/user_manual"
                element={
                    <AppPage dontRequireLogin>
                        <PageHelpUserManual />
                    </AppPage>
                }
            />
            <Route
                path="/help/program_info"
                element={
                    <AppPage dontRequireLogin>
                        <PageHelpProgramInfo />
                    </AppPage>
                }
            />
            {/*
             *
             * Admin-only
             *
             */}
            <Route
                path="/construction/pkob"
                element={
                    <AppPage>
                        <PagePKOB />
                    </AppPage>
                }
            />
            <Route
                path="/construction/construction_laws"
                element={
                    <AppPage>
                        <PageConstructionLaws />
                    </AppPage>
                }
            />
            <Route
                path="/employees"
                element={
                    <AppPage isAdminOnly>
                        <PageEmployees />
                    </AppPage>
                }
            />
            <Route
                path="/database"
                element={
                    <AppPage isAdminOnly>
                        <PageDatabase />
                    </AppPage>
                }
            />
            <Route
                path="/system"
                element={
                    <AppPage isAdminOnly>
                        <PageSystem />
                    </AppPage>
                }
            />
            <Route
                path="/event_log"
                element={
                    <AppPage isAdminOnly>
                        <PageEventLog />
                    </AppPage>
                }
            />
        </Routes>
    );
};
