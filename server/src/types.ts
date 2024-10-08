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
    export type ConstructionGroup = {
        id: number;
        grupa: string;
        dzial_id: number;
    };
    export type ConstructionClass = {
        id: number;
        klasa: string;
        pkob: number;
        grupa_id: number;
    };
    export type ConstructionSpec = {
        id: number;
        nazwa: string;
        klasa_id: number;
        klasa_zl: string;
        kat_ob: string;
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

export type RegisterDecisionType = "Mayor" | "Cert";

export type RegisterTypeInfo = {
    decisionType: RegisterDecisionType;
    actionTypes: RegisterAdminActionType[];
    showAdminConstructionJournal: boolean;
};

export const REGISTER_TYPE_INFOS: { [key in RegisterType]: RegisterTypeInfo } =
    {
        "PnB (6740)": {
            decisionType: "Mayor",
            actionTypes: [
                "Wezwanie",
                "Zawiadomienie",
                "Postanowienie",
                "Konserwator",
                "Zawieszenie postępowania",
                "Przedłużenie terminu",
            ],
            showAdminConstructionJournal: true,
        },
        "PnRozb. (6741)": {
            decisionType: "Mayor",
            actionTypes: [
                "Wezwanie",
                "Zawiadomienie",
                "Postanowienie",
                "Konserwator",
                "Zawieszenie postępowania",
                "Przedłużenie terminu",
            ],
            showAdminConstructionJournal: true,
        },
        "Zg. Rozb. (6743.1)": {
            decisionType: "Cert",
            actionTypes: ["Postanowienie", "Przedłużenie terminu"],
            showAdminConstructionJournal: false,
        },
        "Zg. Zwykłe (6743.2)": {
            decisionType: "Cert",
            actionTypes: ["Postanowienie", "Przedłużenie terminu"],
            showAdminConstructionJournal: false,
        },
        "Zm. Sp. Użytk. (6743.3)": {
            decisionType: "Cert",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
        "BiP (6743.4)": {
            decisionType: "Cert",
            actionTypes: ["Postanowienie", "Przedłużenie terminu"],
            showAdminConstructionJournal: true,
        },
        "ZRiD (7012)": {
            decisionType: "Mayor",
            actionTypes: [
                "Wezwanie",
                "Zawiadomienie",
                "Postanowienie",
                "Konserwator",
                "Zawieszenie postępowania",
                "Przedłużenie terminu",
            ],
            showAdminConstructionJournal: true,
        },
        "Pisma różne (670)": {
            decisionType: "Mayor",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
        "Samodz. Lokali (705)": {
            decisionType: "Mayor",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
        "Dz. bud": {
            decisionType: "Mayor",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
    } as const;

export const REGISTER_ADMIN_ACTION_TYPES = [
    "Wezwanie",
    "Zawiadomienie",
    "Postanowienie",
    "Konserwator",
    "Zawieszenie postępowania",
    "Przedłużenie terminu",
] as const;
export type RegisterAdminActionType =
    (typeof REGISTER_ADMIN_ACTION_TYPES)[number];

export const REGISTER_MAYOR_DECISIONS = [
    "Pozytywna",
    "Sprzeciwu",
    "Umarzająca",
    "Inne rozstrzygnięcie",
] as const;
export type RegisterMayorDecision = (typeof REGISTER_MAYOR_DECISIONS)[number];
export const REGISTER_CERT_DECISIONS = [
    "Brak Sprzeciwu",
    "Sprzeciwu",
    "Inne rozstrzygnięcie",
] as const;
export type RegisterCertDecision = (typeof REGISTER_CERT_DECISIONS)[number];

export const REGISTER_TYPES = [
    "PnB (6740)",
    "PnRozb. (6741)",
    "Zg. Rozb. (6743.1)",
    "Zg. Zwykłe (6743.2)",
    "Zm. Sp. Użytk. (6743.3)",
    "BiP (6743.4)",
    "ZRiD (7012)",
    "Pisma różne (670)",
    "Samodz. Lokali (705)",
    "Dz. bud",
] as const;
export type RegisterType = (typeof REGISTER_TYPES)[number];

export const REGISTER_MAYOR_RESOLUTIONS = [
    "Wygaśnięcia",
    "Bez rozpatrzenia",
    "Uchylająca",
    "Utrzymana w mocy",
] as const;
export type RegisterMayorResolution =
    (typeof REGISTER_MAYOR_RESOLUTIONS)[number];

export const REGISTER_CERT_RESOLUTIONS = [
    "Wycofanie zgłoszenia",
    "Bez rozpatrzenia",
    "Uchylająca",
    "Utrzymana w mocy",
] as const;
export type RegisterCertResolution = (typeof REGISTER_CERT_RESOLUTIONS)[number];

export const getRegisterDecisionsFromType = (
    registerType: RegisterType
): readonly string[] => {
    const decisionType = REGISTER_TYPE_INFOS[registerType].decisionType;
    switch (decisionType) {
        case "Mayor":
            return REGISTER_MAYOR_DECISIONS;
        case "Cert":
            return REGISTER_CERT_DECISIONS;
    }
};

export const getRegisterResolutionsFromType = (
    registerType: RegisterType
): readonly string[] => {
    const decisionType = REGISTER_TYPE_INFOS[registerType].decisionType;
    switch (decisionType) {
        case "Mayor":
            return REGISTER_MAYOR_RESOLUTIONS;
        case "Cert":
            return REGISTER_CERT_RESOLUTIONS;
    }
};

export type Register = {
    id: number;
    typ: RegisterType;

    wniosek_numer: number;
    wniosek_data_zlozenia: string;
    wniosek_inwestor_id: number;
    wniosek_decyzja_typ?: RegisterMayorDecision | RegisterCertDecision;
    wniosek_decyzja_numer: number;
    wniosek_decyzja_data_wydania: string;
    wniosek_rozstrzygniecie_typ?:
        | RegisterMayorResolution
        | RegisterCertResolution;
    wniosek_rozstrzygniecie_numer_pisma: number;
    wniosek_rozstrzygniecie_data_wydania: string;

    _obiekt_sekcja_id: number;
    _obiekt_dzial_id: number;
    _obiekt_grupa_id: number;
    _obiekt_klasa_id: number;
    obiekt_wyszczegolnienie_id: number;
    obiekt_forma_budownictwa_id: number;
    obiekt_planowanie_przestrzenne_id: number;
    _obiekt_gmina_id: number;
    _obiekt_miejscowosc_id: number;
    obiekt_ulica_id: number;
    obiekt_nr: string;
    obiekt_pnb_infrastruktura_towarzyszaca: boolean;
    obiekt_rozbiorka_objety_ochrona_konserwatorska: boolean;
    obiekt_rozbiorka_powierzchnia_zabudowy: number;
    obiekt_rozbiorka_powierzchnia_uzytkowa: number;
    obiekt_rozbiorka_kubatura: number;
    obiekt_rozbiorka_ilosc_budynkow: number;

    admin_dziennik_budowy_numer: number;
    admin_dziennik_budowy_data: string;
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
    typ: RegisterAdminActionType;
    rejestr_id: number;
    wybor: boolean;
    termin: number;
    data_pisma: string;
    data_odebrania: string;
    data_odpowiedzi: string;
};

//
// Glowna
//

export type DBInfoBoard = {
    id: number;
    zawartosc: string;
};
