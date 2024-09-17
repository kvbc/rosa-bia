import RejestrComponent from "../components/registers_page/Rejestr";
import { Rejestr, stworzRejestr } from "../Rejestr";
import { useState } from "react";

export default function RejestryStrona() {
    const [rejestr, setRejestr] = useState<Rejestr>(
        stworzRejestr("PnB (6740)")
    );

    return (
        <div id="registers-page">
            <RejestrComponent rejestr={rejestr} setRejestr={setRejestr} />
        </div>
    );
}
