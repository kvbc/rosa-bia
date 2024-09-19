import { ReactNode, useContext, useEffect, useState } from "react";
import Wyszukiwarka from "../components/Wyszukiwarka";
import axios from "axios";
import {
    Inwestor,
    InwestorRequestPost,
    InwestorRequestPut,
    InwestorResponseGet,
    WSSBCMessage,
    WSSBCMessageInvestor,
    WSSBCMessageType,
} from "../../../server/src/types";
import InwestorKomponent from "../components/inwestorzy_strona/InwestorComponent";
import WebSocketContext from "../contexts/WebSocketContext";

export default function InwestorzyStrona() {
    const [liczbaInwestorow, setLiczbaInwestorow] = useState<number>(0);
    const [inwestorzy, setInwestorzy] = useState<Inwestor[]>([]);
    const [nowyInwestor, setNowyInwestor] = useState<Inwestor>({
        id: 0,
        nazwa: "",
        adres: "",
    });
    const webSocket = useContext(WebSocketContext);

    useEffect(() => {
        if (!webSocket) return;
        const onMessage: WebSocket["onmessage"] = (event) => {
            const message: WSSBCMessage = JSON.parse(event.data);
            const investorMessage = message as WSSBCMessageInvestor;
            switch (message.type) {
                case WSSBCMessageType.InvestorAdded: {
                    const newInvestor = investorMessage.investor;
                    console.log("new:", newInvestor);
                    setInwestorzy((investors) => [...investors, newInvestor]);
                    setLiczbaInwestorow(
                        (liczbaInwestorow) => liczbaInwestorow + 1
                    );
                    break;
                }
                case WSSBCMessageType.InvestorDeleted: {
                    const deletedInvestor = investorMessage.investor;
                    setInwestorzy((investors) =>
                        investors.filter(
                            (investor) => investor.id !== deletedInvestor.id
                        )
                    );
                    setLiczbaInwestorow(
                        (liczbaInwestorow) => liczbaInwestorow - 1
                    );
                    break;
                }
                case WSSBCMessageType.InvestorUpdated: {
                    const updatedInvestor = investorMessage.investor;
                    setInwestorzy((investors) =>
                        investors.map((investor) =>
                            investor.id === updatedInvestor.id
                                ? updatedInvestor
                                : investor
                        )
                    );
                    break;
                }
            }
        };
        webSocket.addEventListener("message", onMessage);
        return () => {
            webSocket.removeEventListener("message", onMessage);
        };
    }, [webSocket]);

    const fetchInwestorzy = (
        startIndex: number,
        endIndex: number
    ): (() => void) => {
        const abortController = new AbortController();
        axios
            .get<InwestorResponseGet>(
                import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                    `/inwestorzy/${startIndex}-${endIndex}`,
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                console.log(startIndex, endIndex, res.data);
                setLiczbaInwestorow(res.data.liczba);
                setInwestorzy(res.data.inwestorzy);
            });

        return () => {
            abortController.abort();
        };
    };

    const onInwestorDodajClicked = (inwestor: Inwestor): void => {
        var req: InwestorRequestPost = inwestor;
        axios.post(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME + "/inwestorzy",
            req
        );
    };

    const onInwestorUsunClicked = (inwestor: Inwestor): void => {
        axios.delete(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                `/inwestorzy/${inwestor.id}`
        );
    };

    const onInwestorZapiszClicked = (inwestor: Inwestor): void => {
        var req: InwestorRequestPut = inwestor;
        axios.put(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME + `/inwestorzy`,
            req
        );
    };

    return (
        <>
            <h1>Inwestorzy</h1>
            <Wyszukiwarka
                liczbaWynikow={liczbaInwestorow}
                fetchWyniki={fetchInwestorzy}
            >
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Inwestor</th>
                            <th>Adres</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inwestorzy.map((inwestor) => (
                            <InwestorKomponent
                                key={inwestor.id}
                                startInwestor={inwestor}
                                onUsunClicked={onInwestorUsunClicked}
                                onZapiszClicked={onInwestorZapiszClicked}
                            />
                        ))}
                        <InwestorKomponent
                            onDodajClicked={onInwestorDodajClicked}
                        />
                    </tbody>
                </table>
            </Wyszukiwarka>
        </>
    );
}
