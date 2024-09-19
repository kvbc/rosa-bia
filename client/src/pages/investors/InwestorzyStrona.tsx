import { useContext, useEffect, useState } from "react";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import axios from "axios";
import {
    HTTPFetchResponse,
    Inwestor,
    InwestorRequestPost,
    InwestorRequestPut,
    WSSBCMessage,
    WSSBCMessageInvestor,
    WSSBCMessageType,
} from "../../../../server/src/types";
import WebSocketContext from "../../contexts/WebSocketContext";
import TableEdit from "../../components/TableEdit";
import InvestorTableEditRow from "./InvestorTableEditRow";

export default function InwestorzyStrona() {
    const [liczbaInwestorow, setLiczbaInwestorow] = useState<number>(0);
    const [inwestorzy, setInwestorzy] = useState<Inwestor[]>([]);
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
                    console.log(updatedInvestor);
                    // console.log(inwestorzy);
                    console.log(inwestorzy.map((inwestor) => inwestor.id));
                    console.log(
                        inwestorzy.map((investor) =>
                            investor.id === updatedInvestor.id
                                ? updatedInvestor
                                : investor
                        )
                    );
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
    }, [webSocket, inwestorzy]);

    const fetchInwestorzy = (
        startIndex: number,
        endIndex: number
    ): (() => void) => {
        const abortController = new AbortController();
        axios
            .get<HTTPFetchResponse<Inwestor>>(
                import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                    `/inwestorzy/${startIndex}-${endIndex}`,
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                console.log(startIndex, endIndex, res.data);
                setLiczbaInwestorow(res.data.liczba);
                setInwestorzy(res.data.results);
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
                <TableEdit headers={["ID", "Inwestor", "Adres"]}>
                    {inwestorzy.map((inwestor) => (
                        <InvestorTableEditRow
                            key={inwestor.id}
                            inwestor={inwestor}
                            events={{
                                onDeleteClicked: onInwestorUsunClicked,
                                onSaveClicked: onInwestorZapiszClicked,
                            }}
                        />
                    ))}
                    <InvestorTableEditRow
                        events={{
                            onAddClicked: onInwestorDodajClicked,
                        }}
                    />
                </TableEdit>
            </Wyszukiwarka>
        </>
    );
}
