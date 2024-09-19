import { useState } from "react";
import { Inwestor } from "../../../../server/src/types";
import "./InwestorComponent.css";

export enum Stan {
    Przegladanie,
    Edytowanie,
    Dodawanie,
}

export default function InwestorKomponent({
    startInwestor,
    onUsunClicked,
    onDodajClicked: _onDodajClicked,
    onZapiszClicked: _onZapiszClicked,
}: {
    startInwestor?: Inwestor;
    onUsunClicked?: (inwestor: Inwestor) => void;
    onDodajClicked?: (inwestor: Inwestor) => void;
    onZapiszClicked?: (inwestor: Inwestor) => void;
}) {
    const [inwestor, setInwestor] = useState<Inwestor>(
        startInwestor || {
            id: 0,
            nazwa: "",
            adres: "",
        }
    );
    const [stan, setStan] = useState<Stan>(
        _onDodajClicked ? Stan.Dodawanie : Stan.Przegladanie
    );

    const onEdytujClicked = () => {
        setStan(Stan.Edytowanie);
    };

    const onZapiszClicked = () => {
        setStan(Stan.Przegladanie);
        if (_onZapiszClicked) _onZapiszClicked(inwestor);
    };

    const onAnulujClicked = () => {
        setStan(Stan.Przegladanie);
        setInwestor(startInwestor!);
    };

    const onDodajClicked = () => {
        onWyczyscClicked();
        if (_onDodajClicked) _onDodajClicked(inwestor);
    };

    const onWyczyscClicked = () => {
        setInwestor((inwestor) => ({
            ...inwestor,
            nazwa: "",
            adres: "",
        }));
    };

    return (
        <tr className="inwestor">
            <td>
                <input
                    type="text"
                    value={inwestor.id <= 0 ? "-" : inwestor.id}
                    disabled
                />
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
                    disabled={stan == Stan.Przegladanie}
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
                    disabled={stan == Stan.Przegladanie}
                />
            </td>
            <td className="inwestor-akcje">
                {stan == Stan.Przegladanie && (
                    <>
                        <button onClick={onEdytujClicked}>Edytuj</button>
                        <button
                            onClick={() =>
                                onUsunClicked && onUsunClicked(inwestor)
                            }
                        >
                            Usuń
                        </button>
                    </>
                )}
                {stan == Stan.Edytowanie && (
                    <>
                        <button onClick={onZapiszClicked}>Zapisz</button>
                        <button onClick={onAnulujClicked}>Anuluj</button>
                    </>
                )}
                {stan == Stan.Dodawanie && (
                    <>
                        <button onClick={onDodajClicked}>Dodaj</button>
                        <button onClick={onWyczyscClicked}>Wyczyść</button>
                    </>
                )}
            </td>
        </tr>
    );
}
