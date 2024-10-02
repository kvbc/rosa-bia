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
    next_insert_id: number;
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

export namespace PKOB {
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
    export type SpatialPlan = {
        id: number;
        planowanie: string;
    };
}

//
// Register Page
//

export type Register = {
    id: number;
    typ_id: number;

    wniosek_numer: number;
    wniosek_data_zlozenia: string;
    wniosek_inwestor_id: number;
    wniosek_decyzja_typ_id: number;
    wniosek_decyzja_numer: number;
    wniosek_decyzja_data_wydania: string;
    wniosek_rozstrzygniecie_typ_id: number;
    wniosek_rozstrzygniecie_numer_pisma: number;
    wniosek_rozstrzygniecie_data_wydania: string;

    obiekt_klasa_id: number;
    obiekt_forma_budownictwa_id: number;
    obiekt_planowanie_przestrzenne_id: number;
    obiekt_ulica_id: number;
    obiekt_nr: string;
};
export type RegisterBuildTypes = {
    id: number;
    typ_id: number;
    rejestr_id: number;
};
export type RegisterInvestPlots = {
    id: number;
    dzialka: string;
    rejestr_id: number;
};
export type RegisterAdminActions = {
    id: number;
    typ_id: number;
    rejestr_id: number;
    wybor: boolean;
    termin: number;
    data_pisma: string;
    data_odebrania: string;
    data_odpowiedzi: string;
};
