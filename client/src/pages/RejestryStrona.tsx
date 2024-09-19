import RejestrComponent from "../components/registers_page/Rejestr";
import { Rejestr, stworzRejestr } from "../Rejestr";
import { useState } from "react";

export default function RejestryStrona() {
    const [rejestr, setRejestr] = useState<Rejestr>(
        stworzRejestr("PnB (6740)")
    );

    return (
        <div id="registers-page">
            <table>
                <thead>
                    <tr>
                        <th>Rejestr</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <RejestrComponent
                                rejestr={rejestr}
                                setRejestr={setRejestr}
                            />
                        </td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>
                            <RejestrComponent
                                rejestr={rejestr}
                                setRejestr={setRejestr}
                            />
                        </td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>
                            <RejestrComponent
                                rejestr={rejestr}
                                setRejestr={setRejestr}
                            />
                        </td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>
                            <RejestrComponent
                                rejestr={rejestr}
                                setRejestr={setRejestr}
                            />
                        </td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>
                            <RejestrComponent
                                rejestr={rejestr}
                                setRejestr={setRejestr}
                            />
                        </td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>
                            <RejestrComponent
                                rejestr={rejestr}
                                setRejestr={setRejestr}
                            />
                        </td>
                        <td>123</td>
                    </tr>
                </tbody>
            </table>

            {/* <RejestrComponent rejestr={rejestr} setRejestr={setRejestr} /> */}
        </div>
    );
}
