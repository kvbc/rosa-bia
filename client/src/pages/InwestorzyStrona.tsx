import { ReactNode, useEffect, useState } from "react";
import Wyszukiwarka from "../components/Wyszukiwarka";
import axios from "axios";
import {
    GetInwestorzyOdpowiedz,
    GetInwestorzyZadanie,
    Inwestor,
} from "../../../server/src/types";
import InwestorKomponent from "../components/inwestorzy_strona/InwestorComponent";

export default function InwestorzyStrona() {
    const [liczbaInwestorow, setLiczbaInwestorow] = useState<number>(0);
    const [inwestorzy, setInwestorzy] = useState<Inwestor[]>([]);
    const [inwestorzyNode, setInwestorzyNode] = useState<ReactNode>(null);
    const [nowyInwestor, setNowyInwestor] = useState<Inwestor>({
        id: 0,
        nazwa: "",
        adres: "",
    });

    const fetchInwestorzy = (
        startIndex: number,
        endIndex: number
    ): (() => void) => {
        const abortController = new AbortController();
        axios
            .post<GetInwestorzyOdpowiedz>(
                import.meta.env.VITE_SERVER_HOSTNAME + "/inwestorzy",
                {
                    startIndex,
                    endIndex,
                },
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                console.log(startIndex, endIndex, res.data);

                setLiczbaInwestorow(res.data.liczba);
                setInwestorzy(res.data.inwestorzy);
                setInwestorzyNode(
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Inwestor</th>
                                <th>Adres</th>
                            </tr>
                        </thead>
                        <tbody>
                            {res.data.inwestorzy.map((inwestor) => (
                                <tr>
                                    <InwestorKomponent
                                        inwestor={inwestor}
                                        setInwestor={function (nowyInwestor) {
                                            setInwestorzy(
                                                inwestorzy.map((inwestor) =>
                                                    inwestor.id ===
                                                    nowyInwestor.id
                                                        ? nowyInwestor
                                                        : inwestor
                                                )
                                            );
                                        }}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            });

        return () => {
            abortController.abort();
        };
    };

    return (
        <>
            <h1>Inwestorzy</h1>
            <Wyszukiwarka
                liczbaWynikow={liczbaInwestorow}
                fetchWyniki={fetchInwestorzy}
                wyniki={inwestorzyNode}
            >
                <InwestorKomponent
                    inwestor={nowyInwestor}
                    setInwestor={setNowyInwestor}
                />
            </Wyszukiwarka>
        </>
    );
}
