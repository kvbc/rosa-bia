import {
    Context,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    DBEntry,
    HTTPFetchResponse,
    WSSBCMessage,
    WSSBCMessageType,
} from "../../../server/src/types";
import WebSocketContext from "../contexts/WebSocketContext";
import axios from "axios";

export type DBEntries<T> = {
    entries: T[];
    setEntries: Dispatch<SetStateAction<T[]>>;
    entryCount: number;
    fetchEntries: (startIndex: number, endIndex: number) => () => void;
};

export default function useDBEntries<T extends DBEntry>(
    endpoint: string,
    customWebSocket?: WebSocket
): DBEntries<T> {
    const [entries, setEntries] = useState<T[]>([]);
    const [entryCount, setEntryCount] = useState<number>(0);
    const webSocket = useContext(WebSocketContext) || customWebSocket;

    useEffect(() => {
        if (!webSocket) return;
        const onMessage: WebSocket["onmessage"] = (event) => {
            const message: WSSBCMessage<T> = JSON.parse(event.data);
            if (message.endpoint !== endpoint) return;
            switch (message.type) {
                case WSSBCMessageType.EntryAdded: {
                    const newEntry = message.entry;
                    setEntries((entries) => [...entries, newEntry]);
                    setEntryCount((entryCount) => entryCount + 1);

                    break;
                }
                case WSSBCMessageType.EntryDeleted: {
                    const deletedEntry = message.entry;
                    setEntries((entries) =>
                        entries.filter((entry) => entry.id !== deletedEntry.id)
                    );
                    setEntryCount((entryCount) => entryCount - 1);
                    break;
                }
                case WSSBCMessageType.EntryUpdated: {
                    const updatedEntry = message.entry;
                    setEntries((entries) =>
                        entries.map((entry) =>
                            entry.id === updatedEntry.id ? updatedEntry : entry
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
    }, [webSocket, entries]);

    const fetchEntries = (
        startIndex: number,
        endIndex: number
    ): (() => void) => {
        const abortController = new AbortController();
        axios
            .get<HTTPFetchResponse<T>>(
                import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                    `/${endpoint}/${startIndex}-${endIndex}`,
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                console.log(startIndex, endIndex, res.data);
                setEntries(res.data.results);
                setEntryCount(res.data.liczba);
            });

        return () => {
            abortController.abort();
        };
    };

    return { entries, setEntries, fetchEntries, entryCount };
}
