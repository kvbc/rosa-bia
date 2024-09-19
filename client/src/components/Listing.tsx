import { ReactNode, useContext, useEffect, useState } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import {
    DBEntry,
    HTTPFetchResponse,
    WSSBCMessage,
    WSSBCMessageType,
} from "../../../server/src/types";
import axios from "axios";
import Wyszukiwarka from "./Wyszukiwarka";
import TableEditRow, { Events } from "./TableEditRow";
import TableEdit from "./TableEdit";
import "./Listing.css";

export default function Listing<TEntry extends DBEntry>({
    endpoint,
    renderTableEdit,
}: {
    endpoint: string;
    renderTableEdit: ({
        entries,
        events,
    }: {
        entries: TEntry[];
        events: Events<TEntry>;
    }) => ReactNode;
}) {
    const [entryCount, setEntryCount] = useState<number>(0);
    const [entries, setEntries] = useState<TEntry[]>([]);
    const webSocket = useContext(WebSocketContext);

    useEffect(() => {
        if (!webSocket) return;
        const onMessage: WebSocket["onmessage"] = (event) => {
            const message: WSSBCMessage<TEntry> = JSON.parse(event.data);
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
            .get<HTTPFetchResponse<TEntry>>(
                import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                    `/${endpoint}/${startIndex}-${endIndex}`,
                {
                    signal: abortController.signal,
                }
            )
            .then((res) => {
                console.log(startIndex, endIndex, res.data);
                setEntryCount(res.data.liczba);
                setEntries(res.data.results);
            });

        return () => {
            abortController.abort();
        };
    };

    const onEntryAddClicked = (entry: TEntry): void => {
        axios.post(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME + "/" + endpoint,
            entry
        );
    };

    const onEntryDeleteClicked = (entry: TEntry): void => {
        axios.delete(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME +
                `/${endpoint}/${entry.id}`
        );
    };

    const onEntrySaveClicked = (entry: TEntry): void => {
        axios.put(
            import.meta.env.VITE_HTTP_SERVER_HOSTNAME + "/" + endpoint,
            entry
        );
    };

    const events: Events<TEntry> = {
        onAddClicked: onEntryAddClicked,
        onDeleteClicked: onEntryDeleteClicked,
        onSaveClicked: onEntrySaveClicked,
    };

    return (
        <div className="listing">
            <Wyszukiwarka liczbaWynikow={entryCount} fetchWyniki={fetchEntries}>
                {renderTableEdit({ events, entries })}
            </Wyszukiwarka>
        </div>
    );
}
