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
import { Entries } from "../hooks/useEntries";

export default function Listing<TEntry extends DBEntry>({
    endpoint,
    entries,
    renderTableEdit,
}: {
    endpoint: string;
    entries: Entries<TEntry>;
    renderTableEdit: ({
        entries,
        events,
    }: {
        entries: TEntry[];
        events: Events<TEntry>;
    }) => ReactNode;
}) {
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
            <Wyszukiwarka
                liczbaWynikow={entries.entryCount}
                fetchWyniki={entries.fetchEntries}
            >
                {renderTableEdit({ events, entries: entries.entries })}
            </Wyszukiwarka>
        </div>
    );
}
