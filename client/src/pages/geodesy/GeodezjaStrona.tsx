import { useState } from "react";
import {
    Commune,
    CommuneRequestPost,
    CommuneRequestPut,
    HTTPFetchResponse,
} from "../../../../server/src/types";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import axios from "axios";
import TableEdit from "../../components/TableEdit";
import CommuneTableEditRow from "./CommuneTableEditRow";

export default function GeodezjaStrona() {
    const [communeCount, setCommuneCount] = useState<number>(0);
    const [communes, setCommunes] = useState<Commune[]>([]);

    const fetchCommunes = (
        startIndex: number,
        endIndex: number
    ): (() => void) => {
        const abortController = new AbortController();
        axios
            .get<HTTPFetchResponse<Commune>>(
                import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                    `/communes/${startIndex}-${endIndex}`,
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                console.log(startIndex, endIndex, res.data);
                setCommuneCount(res.data.liczba);
                setCommunes(res.data.results);
            });
        return () => {
            abortController.abort();
        };
    };

    const onCommuneDeleteClicked = (commune: Commune) => {
        axios.delete(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                `/communes/${commune.id}`
        );
    };

    const onCommuneSaveClicked = (commune: Commune) => {
        var req: CommuneRequestPut = commune;
        axios.put(import.meta.env.VITE_HTTP_SERVER_HOSTNAME + `/communes`, req);
    };

    const onCommuneAddClicked = (commune: Commune) => {
        var req: CommuneRequestPost = commune;
        axios.post(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME + "/communes",
            req
        );
    };

    return (
        <>
            <h1>Geodezja</h1>

            <h2>Gminy</h2>
            <Wyszukiwarka
                liczbaWynikow={communeCount}
                fetchWyniki={fetchCommunes}
            >
                <TableEdit headers={["ID", "Gmina"]}>
                    {communes.map((commune) => (
                        <CommuneTableEditRow
                            key={commune.id}
                            commune={commune}
                            events={{
                                onDeleteClicked: onCommuneDeleteClicked,
                                onSaveClicked: onCommuneSaveClicked,
                            }}
                        />
                    ))}
                    <CommuneTableEditRow
                        events={{
                            onAddClicked: onCommuneAddClicked,
                        }}
                    />
                </TableEdit>
            </Wyszukiwarka>
        </>
    );
}
