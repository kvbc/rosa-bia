import { useContext } from "react";
import {
    DBEntry,
    HTTPFetchResponse,
    WSSBCMessage,
    WSSBCMessageType,
} from "../../../server/src/types";
import WebSocketContext from "../contexts/WebSocketContext";
import axios from "axios";
import { create, StoreApi, UseBoundStore } from "zustand";
import { DBEntryEndpoint } from "../App";

export type DBEntries<T extends DBEntry> = {
    entries: T[];
    setEntries: (entries: T[]) => void;
    entryCount: number;
    endpoint: DBEntryEndpoint;
    addEntry: (newEntry: T) => void;
    fetchEntries: (startIndex: number, endIndex: number) => () => void;
};

function createDBEntriesStore<T extends DBEntry>(endpoint: DBEntryEndpoint) {
    return create<DBEntries<T>>((set, get) => {
        const webSocket = useContext(WebSocketContext);
        if (!webSocket) throw "Error";
        const onMessage: WebSocket["onmessage"] = (event) => {
            const message: WSSBCMessage<T> = JSON.parse(event.data);
            if (message.endpoint !== endpoint) return;
            switch (message.type) {
                case WSSBCMessageType.EntryAdded: {
                    const newEntry = message.entry;
                    get().setEntries([...get().entries, newEntry]);
                    set((state) => ({
                        ...state,
                        entryCount: get().entryCount + 1,
                    }));
                    break;
                }
                case WSSBCMessageType.EntryDeleted: {
                    const deletedEntry = message.entry;
                    get().setEntries(
                        get().entries.filter(
                            (entry) => entry.id !== deletedEntry.id
                        )
                    );
                    set((state) => ({
                        ...state,
                        entryCount: get().entryCount - 1,
                    }));
                    break;
                }
                case WSSBCMessageType.EntryUpdated: {
                    const updatedEntry = message.entry;
                    get().setEntries(
                        get().entries.map((entry) =>
                            entry.id === updatedEntry.id ? updatedEntry : entry
                        )
                    );
                    break;
                }
            }
        };
        webSocket.addEventListener("message", onMessage);
        // return () => {
        //     webSocket.removeEventListener("message", onMessage);
        // };

        return {
            entries: [],
            setEntries: (newEntries) =>
                set((state) => ({ ...state, entries: newEntries })),
            entryCount: 0,
            endpoint,
            addEntry: (newEntry) =>
                get().setEntries([...get().entries, newEntry]),
            fetchEntries: (startIndex: number, endIndex: number) => {
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
                        get().setEntries(res.data.results);
                        set((state) => ({
                            ...state,
                            entryCount: res.data.liczba,
                        }));
                    });

                return () => {
                    abortController.abort();
                };
            },
        };
    });
}

const stores: { [key: string]: any } = {};

export default function useDBEntriesStore<TEntry extends DBEntry>(
    endpoint: DBEntryEndpoint
): UseBoundStore<StoreApi<DBEntries<TEntry>>> {
    if (!stores[endpoint]) {
        stores[endpoint] = createDBEntriesStore<TEntry>(endpoint);
    }
    return stores[endpoint];
}
