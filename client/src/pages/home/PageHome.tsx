import PageRegisters from "../registers/PageRegisters";
import InfoBoard from "./InfoBoard";
import React from "react";

export default function PageHome() {
    return (
        <div className="flex flex-row w-full h-full text-center gap-2">
            <div className="w-10/12">
                <PageRegisters />
            </div>
            <InfoBoard />
        </div>
    );
}
