import { useRef } from "react";
import {
    Czynnosc,
    Rejestr,
    TypCzynnosci,
    TypyCzynnosci,
    TypyRejestru,
    typyRejestruTypuCzynnosci,
} from "../../Rejestr";
import "./Rejestr.css";

export default function RejestrComponent({
    rejestr,
    setRejestr,
}: {
    rejestr: Rejestr;
    setRejestr?: React.Dispatch<React.SetStateAction<Rejestr>>;
}) {
    const refRozwijacz = useRef<HTMLDivElement>(null);

    const setRejestrProperty = (
        prop: keyof Rejestr,
        value: Rejestr[keyof Rejestr]
    ) => {
        if (setRejestr)
            setRejestr((rejestr) => ({ ...rejestr, [prop]: value }));
    };

    const setRejestrCzynnoscProperty = (
        typCzynnosci: TypCzynnosci,
        prop: keyof Czynnosc,
        value: Czynnosc[keyof Czynnosc]
    ) => {
        setRejestrProperty("admin_czynnosci", {
            ...rejestr.admin_czynnosci,
            [typCzynnosci]: {
                ...rejestr.admin_czynnosci[typCzynnosci],
                [prop]: value,
            },
        });
    };

    const onRozwijaczClicked = () => {
        const rozwijacz = refRozwijacz.current!;
        rozwijacz.toggleAttribute("data-rozwiniety");
    };

    function DzialkaInwestycja({ index }: { index: number }) {
        return (
            <input
                type="text"
                value={rejestr.obiekt_dzialki_objete_inwestycja[index]}
                onChange={(e) =>
                    setRejestrProperty(
                        "obiekt_dzialki_objete_inwestycja",
                        rejestr.obiekt_dzialki_objete_inwestycja.map(
                            (dzialka, i) =>
                                i == index ? e.target.value : dzialka
                        )
                    )
                }
                disabled={!setRejestr}
            />
        );
    }

    function StatusObiektu({ index }: { index: number }) {
        return (
            <select
                value={rejestr.obiekt_statusy[index]}
                onChange={(e) =>
                    setRejestrProperty(
                        "obiekt_statusy",
                        rejestr.obiekt_statusy.map((status, i) =>
                            i == index ? e.target.value : status
                        )
                    )
                }
                disabled={!setRejestr}
            >
                <option>Budowa</option>
                <option>Rozbudowa</option>
                <option>Nadbudowa</option>
                <option>Odbudowa</option>
                <option>Wykonanie robót budowlanych</option>
                <option>Remont</option>
                <option>Zmiana sposobu użytkowania</option>
                <option>Rozbiórka</option>
                <option>Przebudowa</option>
            </select>
        );
    }

    return (
        <>
            {/* Typ Rejestru */}
            <table>
                <thead>
                    <tr>
                        <th>Typ Rejestru</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select
                                value={rejestr.typ}
                                onChange={(e) =>
                                    setRejestrProperty("typ", e.target.value)
                                }
                                disabled={!setRejestr}
                            >
                                {TypyRejestru.map((typ) => (
                                    <option>{typ}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="rejestr">
                {/* Góra */}
                <div id="gora">
                    {/* Góra : dane wniosku */}
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>Dane Wniosku</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Numer wniosku</td>
                                <td>
                                    <input
                                        type="number"
                                        value={rejestr.wniosek_numer}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "wniosek_numer",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Złożony w dniu</td>
                                <td>
                                    <input
                                        type="date"
                                        value={rejestr.wniosek_data_zlozenia}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "wniosek_data_zlozenia",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Góra : dane obiektu */}
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={6}>Dane dot. obiektu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={3}>
                                    Nazwa zamierzenia budowlanego
                                </td>
                                <td colSpan={3}>
                                    <select
                                        value={
                                            rejestr.obiekt_nazwa_zamierzenia_budowlanego
                                        }
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_nazwa_zamierzenia_budowlanego",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>Forma budownictwa</td>
                                <td colSpan={3}>
                                    <select
                                        value={rejestr.obiekt_forma_budownictwa}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_forma_budownictwa",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    >
                                        <option>Indywidualna</option>
                                        <option>Zakładowa</option>
                                        <option>Sprzedaż / wynajem</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Góra : postępowanie administracyjne */}
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={6}>
                                    Postępowanie administracyjne
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>Informacja o postępowaniu </td>
                                <td colSpan={4}>
                                    {rejestr.admin_info_o_postepowaniu}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Upływający czas (w dniach)</td>
                                <td colSpan={4}>
                                    <input
                                        type="number"
                                        value={rejestr.admin_uplywajacy_czas}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "admin_uplywajacy_czas",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div
                    id="rozwijacz"
                    data-rozwiniety
                    onClick={onRozwijaczClicked}
                    ref={refRozwijacz}
                >
                    <button>V</button>
                    <div />
                </div>
                {/* <button id="rozwijacz">V</button> */}

                {/* Dół */}
                <div id="dol">
                    {/* Dół : dane wniosku */}
                    <table>
                        <tr>
                            <th colSpan={2}>Inwestor</th>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <select
                                    value={rejestr.wniosek_inwestor_id}
                                    onChange={(e) =>
                                        setRejestrProperty(
                                            "wniosek_inwestor_id",
                                            e.target.value
                                        )
                                    }
                                    disabled={!setRejestr}
                                >
                                    <option>-</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Informacje ...</td>
                        </tr>
                        <tr>
                            <th colSpan={2}>Decyzja starosty Człuchowskiego</th>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <select
                                    value={rejestr.wniosek_decyzja_status}
                                    onChange={(e) =>
                                        setRejestrProperty(
                                            "wniosek_decyzja_status",
                                            e.target.value
                                        )
                                    }
                                    disabled={!setRejestr}
                                >
                                    <option>-</option>
                                    <option>Pozytywna</option>
                                    <option>Sprzeciwu</option>
                                    <option>Umarzająca</option>
                                    <option>Inne rozstrzygnięcie</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Numer decyzji</td>
                            <td>
                                <input
                                    type="number"
                                    value={rejestr.wniosek_decyzja_numer}
                                    onChange={(e) =>
                                        setRejestrProperty(
                                            "wniosek_decyzja_numer",
                                            e.target.value
                                        )
                                    }
                                    disabled={!setRejestr}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Wydana w dniu</td>
                            <td>
                                <input
                                    type="date"
                                    value={rejestr.wniosek_decyzja_data_wydania}
                                    onChange={(e) =>
                                        setRejestrProperty(
                                            "wniosek_decyzja_data_wydania",
                                            e.target.value
                                        )
                                    }
                                    disabled={!setRejestr}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}>Inne rozstrzygnięcia</th>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <select
                                    value={
                                        rejestr.wniosek_rozstrzygniecie_status
                                    }
                                    onChange={(e) =>
                                        setRejestrProperty(
                                            "wniosek_rozstrzygniecie_status",
                                            e.target.value
                                        )
                                    }
                                    disabled={!setRejestr}
                                >
                                    <option>-</option>
                                    <option>Wygaśnięcia</option>
                                    <option>Bez rozpatrzenia</option>
                                    <option>Uchylająca</option>
                                    <option>Utrzymana w mocy</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Numer pisma</td>
                            <td>
                                <input
                                    type="number"
                                    value={
                                        rejestr.wniosek_rozstrzygniecie_numer_pisma
                                    }
                                    onChange={(e) =>
                                        setRejestrProperty(
                                            "wniosek_rozstrzygniecie_numer_pisma",
                                            e.target.value
                                        )
                                    }
                                    disabled={!setRejestr}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Wydane w dniu</td>
                            <td>
                                <input
                                    type="date"
                                    value={
                                        rejestr.wniosek_rozstrzygniecie_data_wydania
                                    }
                                    onChange={(e) =>
                                        setRejestrProperty(
                                            "wniosek_rozstrzygniecie_data_wydania",
                                            e.target.value
                                        )
                                    }
                                    disabled={!setRejestr}
                                />
                            </td>
                        </tr>
                    </table>
                    {/* Dół : dane obiektu */}
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan={3}>Planowanie przestrzenne</td>
                                <td colSpan={3}>
                                    <select
                                        value={
                                            rejestr.obiekt_planowanie_przestrzenne
                                        }
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_planowanie_przestrzenne",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    >
                                        <option>Dec WZ</option>
                                        <option>MPZP</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={2}>PKOB</th>
                                <th colSpan={2}>ZL</th>
                                <th colSpan={2}>Kat.</th>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <input
                                        type="number"
                                        value={rejestr.obiekt_pkob}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_pkob",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <input
                                        type="text"
                                        value={rejestr.obiekt_zl}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_zl",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <input
                                        type="text"
                                        value={rejestr.obiekt_kategoria}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_kategoria",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={2}>Sekcja</th>
                                <th colSpan={2}>Dział</th>
                                <th colSpan={2}>Klasa</th>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <select
                                        value={rejestr.obiekt_sekcja}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_sekcja",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    >
                                        <option>Budynki</option>
                                        <option>
                                            Obiekty inżynierii lądowej i wodnej
                                        </option>
                                    </select>
                                </td>
                                <td colSpan={2}>
                                    <input
                                        type="text"
                                        value={rejestr.obiekt_dzial}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_dzial",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <input
                                        type="text"
                                        value={rejestr.obiekt_klasa}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_klasa",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={6}>Dane nieruchomości</th>
                            </tr>
                            <tr>
                                <td>Gmina</td>
                                <td>Miejscowość</td>
                                <td>Obręb</td>
                                <td>Jedn.ewid</td>
                                <td>Ulica</td>
                                <td>Nr</td>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        value={
                                            rejestr.obiekt_nieruchomosc_gmina
                                        }
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_nieruchomosc_gmina",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={
                                            rejestr.obiekt_nieruchomosc_miejscowosc
                                        }
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_nieruchomosc_miejscowosc",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={
                                            rejestr.obiekt_nieruchomosc_obreb
                                        }
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_nieruchomosc_obreb",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={
                                            rejestr.obiekt_nieruchomosc_jednostka_ewidencyjna
                                        }
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_nieruchomosc_jednostka_ewidencyjna",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={
                                            rejestr.obiekt_nieruchomosc_ulica
                                        }
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_nieruchomosc_ulica",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={rejestr.obiekt_nieruchomosc_nr}
                                        onChange={(e) =>
                                            setRejestrProperty(
                                                "obiekt_nieruchomosc_nr",
                                                e.target.value
                                            )
                                        }
                                        disabled={!setRejestr}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={6}>Działki objęte inwestycją</th>
                            </tr>
                            <tr>
                                <td>
                                    <DzialkaInwestycja index={0} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={1} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={2} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={3} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={4} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={5} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <DzialkaInwestycja index={6} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={7} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={8} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={9} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={10} />
                                </td>
                                <td>
                                    <DzialkaInwestycja index={11} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Dół : postępowanie administracyjne */}
                    <table>
                        <tbody>
                            <tr>
                                <td>Czynności</td>
                                <td>Wybór</td>
                                <td>Termin [dni]</td>
                                <td>Data pisma</td>
                                <td>Data odebrania</td>
                                <td>Data odpowiedzi</td>
                            </tr>
                            {TypyCzynnosci.map(
                                (typCzynnosci) =>
                                    typyRejestruTypuCzynnosci[
                                        typCzynnosci
                                    ].includes(rejestr.typ) && (
                                        <tr>
                                            <td>
                                                <strong>{typCzynnosci}</strong>
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    value={String(
                                                        rejestr.admin_czynnosci[
                                                            typCzynnosci
                                                        ].wybor
                                                    )}
                                                    onChange={(e) =>
                                                        setRejestrCzynnoscProperty(
                                                            typCzynnosci,
                                                            "wybor",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!setRejestr}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={String(
                                                        rejestr.admin_czynnosci[
                                                            typCzynnosci
                                                        ].termin
                                                    )}
                                                    onChange={(e) =>
                                                        setRejestrCzynnoscProperty(
                                                            typCzynnosci,
                                                            "termin",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!setRejestr}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={String(
                                                        rejestr.admin_czynnosci[
                                                            typCzynnosci
                                                        ].data_pisma
                                                    )}
                                                    onChange={(e) =>
                                                        setRejestrCzynnoscProperty(
                                                            typCzynnosci,
                                                            "data_pisma",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!setRejestr}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={String(
                                                        rejestr.admin_czynnosci[
                                                            typCzynnosci
                                                        ].data_odebrania
                                                    )}
                                                    onChange={(e) =>
                                                        setRejestrCzynnoscProperty(
                                                            typCzynnosci,
                                                            "data_odebrania",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!setRejestr}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    value={String(
                                                        rejestr.admin_czynnosci[
                                                            typCzynnosci
                                                        ].data_odpowiedzi
                                                    )}
                                                    onChange={(e) =>
                                                        setRejestrCzynnoscProperty(
                                                            typCzynnosci,
                                                            "data_odpowiedzi",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!setRejestr}
                                                />
                                            </td>
                                        </tr>
                                    )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
