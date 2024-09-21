export enum WSSBCMessageType {
    EntryAdded,
    EntryUpdated,
    EntryDeleted,
}
export type DBEntry = {
    id: number;
    [key: string]: any;
};
export type WSSBCMessage<TEntry = DBEntry> = {
    type: WSSBCMessageType;
    entry: TEntry;
    endpoint: string;
};

export type HTTPFetchResponse<T> = {
    liczba: number;
    results: T[];
};

//
// Inwestorzy
//

export type Inwestor = {
    id: number;
    nazwa: string;
    adres: string;
};

//
// Geodezja
//

export type Gmina = {
    id: number;
    nazwa: string;
};

export type Miejscowosc = {
    id: number;
    nazwa: string;
    gmina_id: number;
    obreb_id: number;
    jedn_ewid: string;
};

export type Ulica = {
    id: number;
    nazwa: string;
    miejscowosc_id: number;
};
