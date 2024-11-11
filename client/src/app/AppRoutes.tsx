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
import PageHelp from "../pages/help/PageHelp";
import { PageDatabase } from "../pages/database/PageDatabase";
import { PageArtPrBud } from "../pages/art_prbud/PageArtPrBud";
import { PageSystem } from "../pages/system/PageSystem";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/registers" element={<PageRegisters />} />
            <Route path="/geodesy" element={<PageGeodesy />} />
            <Route path="/investors" element={<PageInvestors />} />
            <Route path="/construction/pkob" element={<PagePKOB />} />
            <Route path="/construction/art-prbud" element={<PageArtPrBud />} />
            <Route path="/employees" element={<PageEmployees />} />
            <Route path="/stats/b05" element={<PageStatsB05 />} />
            <Route path="/stats/b06" element={<PageStatsB06 />} />
            <Route path="/stats/gunb3" element={<PageStatsGUNB3 />} />
            <Route path="/help" element={<PageHelp />} />
            <Route path="/database" element={<PageDatabase />} />
            <Route path="/system" element={<PageSystem />} />
        </Routes>
    );
};
