export type TypDecyzjiStarosty =
    | "Pozytywna"
    | "Sprzeciwu"
    | "Umarzająca"
    | "Inne rozstrzygnięcie";

export type TypRozstrzygniecia =
    | "Wygaśnięcia"
    | "Bez rozpatrzenia"
    | "Uchylająca"
    | "Utrzymana w mocy";

export type TypStatusuObiektu =
    | "Budowa"
    | "Rozbudowa"
    | "Nadbudowa"
    | "Odbudowa"
    | "Wykonanie robót budowlanych"
    | "Remont"
    | "Zmiana sposobu użytkowania"
    | "Rozbiórka"
    | "Przebudowa";

export type TypSekcjiObiektu =
    | "Budynki"
    | "Obiekty inżynierii lądowej i wodnej";

export type TypFormyBudownictwaObiektu =
    | "Indywidualna"
    | "Zakładowa"
    | "Sprzedaż / wynajem";

export type TypPlanowaniaPrzestrzennegoObiektu = "Dec WZ" | "MZPZ";

export const TypyCzynnosci = [
    "Wezwanie",
    "Zawiadomienie",
    "Postanowienie",
    "Konserwator",
    "Zawieszenie postępowania",
    "Przedłuzenie terminu",
] as const;
export type TypCzynnosci = (typeof TypyCzynnosci)[number];

export const TypyRejestru = [
    "PnB (6740)",
    "O Rozbiórkę (6741)",
    "Zgłoszenie Rozbiórki (6743.1)",
    "Zgłoszenie „zwykłe” (6743.2)",
    "Zgłoszenie ZSU (6743.3)",
    "Zgłoszenie BiP (6743.4)",
    "Zaświadczenie (705)",
    "Sprawy Różne (670)",
    "ZRiD (7012)",
    "Rejestr do Budowy",
] as const;
export type TypRejestru = (typeof TypyRejestru)[number];

export type Czynnosc = {
    wybor: boolean;
    termin?: number; // dni
    data_pisma?: string;
    data_odebrania?: string;
    data_odpowiedzi?: string;
};

export type Czynnosci = { [key in TypCzynnosci]: Czynnosc };

export type Rejestr = {
    typ: TypRejestru;

    // dane wniosku
    wniosek_numer?: number;
    wniosek_data_zlozenia?: string;
    wniosek_inwestor_id?: number;
    wniosek_decyzja_status?: TypDecyzjiStarosty;
    wniosek_decyzja_numer?: number;
    wniosek_decyzja_data_wydania?: string;
    wniosek_rozstrzygniecie_status?: TypRozstrzygniecia;
    wniosek_rozstrzygniecie_numer_pisma?: number;
    wniosek_rozstrzygniecie_data_wydania?: string;

    // dane dot. obiektu
    obiekt_nazwa_zamierzenia_budowlanego?: string;
    obiekt_statusy: TypStatusuObiektu[];
    obiekt_pkob?: number;
    obiekt_zl?: string;
    obiekt_kategoria?: string;
    obiekt_sekcja?: TypSekcjiObiektu;
    obiekt_dzial?: string;
    obiekt_klasa?: string;
    obiekt_forma_budownictwa?: TypFormyBudownictwaObiektu;
    obiekt_planowanie_przestrzenne?: TypPlanowaniaPrzestrzennegoObiektu;
    obiekt_nieruchomosc_gmina?: string;
    obiekt_nieruchomosc_miejscowosc?: string;
    obiekt_nieruchomosc_obreb?: string;
    obiekt_nieruchomosc_jednostka_ewidencyjna?: string;
    obiekt_nieruchomosc_ulica?: string;
    obiekt_nieruchomosc_nr?: string;
    obiekt_dzialki_objete_inwestycja: string[];

    admin_info_o_postepowaniu?: string;
    admin_uplywajacy_czas?: number;
    admin_czynnosci: Czynnosci;
};

export const typyRejestruTypuCzynnosci: {
    [key in TypCzynnosci]: TypRejestru[];
} = {
    Wezwanie: [
        "PnB (6740)",
        "O Rozbiórkę (6741)",
        "Zaświadczenie (705)",
        "Sprawy Różne (670)",
        "ZRiD (7012)",
        "Rejestr do Budowy",
    ],
    Zawiadomienie: ["PnB (6740)", "O Rozbiórkę (6741)", "Rejestr do Budowy"],
    Postanowienie: [
        "PnB (6740)",
        "O Rozbiórkę (6741)",
        "Zgłoszenie Rozbiórki (6743.1)",
        "Zgłoszenie „zwykłe” (6743.2)",
        "Zgłoszenie ZSU (6743.3)",
        "Rejestr do Budowy",
    ],
    Konserwator: ["PnB (6740)", "Rejestr do Budowy"],
    "Zawieszenie postępowania": [
        "PnB (6740)",
        "O Rozbiórkę (6741)",
        "Rejestr do Budowy",
    ],
    "Przedłuzenie terminu": [
        "PnB (6740)",
        "O Rozbiórkę (6741)",
        "Zgłoszenie Rozbiórki (6743.1)",
        "Zgłoszenie „zwykłe” (6743.2)",
        "Zgłoszenie ZSU (6743.3)",
        "Zgłoszenie BiP (6743.4)",
        "Rejestr do Budowy",
    ],
};

export function stworzRejestr(typ: TypRejestru): Rejestr {
    return {
        typ,
        obiekt_statusy: [],
        obiekt_dzialki_objete_inwestycja: [],
        admin_info_o_postepowaniu: "-",
        admin_czynnosci: {
            Wezwanie: { wybor: false },
            "Przedłuzenie terminu": { wybor: false },
            "Zawieszenie postępowania": { wybor: false },
            Konserwator: { wybor: false },
            Postanowienie: { wybor: false },
            Zawiadomienie: { wybor: false },
        },
    };
}
