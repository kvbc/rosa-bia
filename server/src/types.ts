import internal from "stream";

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

//
// Configuration Page
//

export type TypeEntry = DBEntry & {
    typ: string;
};

//
// PKOB Page
//

namespace PKOB {
    export type ConstructionSection = {
        id: number;
        sekcja: string;
    };
    export type ConstructionDivision = {
        id: number;
        dzial: string;
        sekcja_id: number;
    };
    export type ConstructionIntention = {
        id: number;
        zamierzenie: string;
        pkob: number;
        klasa_zl: string;
        kat_ob: string;
        dzial_id: number;
    };
    export type ConstructionClass = {
        id: number;
        klasa: string;
        zamierzenie_id: number;
    };
    export type BuildType = {
        id: number;
        typ: string;
    };
    export type ConstructionForm = {
        id: number;
        forma: string;
    };
    export type SpatialPlans = {
        id: number;
        planowanie: string;
    };
}
