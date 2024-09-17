import { Dispatch, SetStateAction } from "react";
import { Inwestor } from "../../../../server/src/types";
import "./InwestorComponent.css";

export default function InwestorKomponent({
    inwestor,
    setInwestor,
}: {
    inwestor: Inwestor;
    setInwestor: (inwestor: Inwestor) => void;
}) {
    // if (editable) {
    return (
        <table className="inwestor">
            <tbody>
                <tr>
                    <td>
                        <input type="text" value={inwestor.id} disabled />
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder="Inwestor"
                            value={inwestor.nazwa}
                            onChange={(e) =>
                                setInwestor({
                                    ...inwestor,
                                    nazwa: e.target.value,
                                })
                            }
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            placeholder="Adres"
                            value={inwestor.adres}
                            onChange={(e) =>
                                setInwestor({
                                    ...inwestor,
                                    adres: e.target.value,
                                })
                            }
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
    // }

    // return (
    //     <tr>
    //         <td>{inwestor.id}</td>
    //         <td>{inwestor.nazwa}</td>
    //         <td>{inwestor.adres}</td>
    //     </tr>
    // );
}
