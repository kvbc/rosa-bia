//
// types.ts
// HTTP and WebSocket server types
//

import internal from "stream";
import { DBRow } from "./dbTypes";

export enum WSSBCMessageType {
    EntryAdded,
    EntryUpdated,
    EntryDeleted,
}
export type WSSBCMessage<TRow extends DBRow = DBRow> = {
    type: WSSBCMessageType;
    entry: TRow;
    endpoint: string;
};

export type HTTPFetchResponse<T> = {
    liczba: number;
    results: T[];
};
