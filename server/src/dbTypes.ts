export type DBRow = {
    id: number;
    [key: string]: any;
};

export namespace DB {
    //
    // Investors
    //

    export type Investor = {
        id: number;
        name: string;
        address: string;
        info: string;
    };

    //
    // Geodesy
    //

    export type Commune = {
        id: number;
        name: string;
    };
    export type Place = {
        id: number;
        name: string;
        commune_id: number;
        area_place_id: number;
        cad_unit: string;
    };
    export type Street = {
        id: number;
        name: string;
        place_id: number;
    };

    //
    // PKOB
    //

    export type ConstructionSection = {
        id: number;
        name: string;
    };
    export type ConstructionDivision = {
        id: number;
        name: string;
        section_id: number;
    };
    export type ConstructionGroup = {
        id: number;
        name: string;
        division_id: number;
    };
    export type ConstructionClass = {
        id: number;
        name: string;
        group_id: number;
        pkob: number;
    };
    export type ConstructionSpec = {
        id: number;
        name: string;
        class_id: number;
        zl_class: string;
        ob_cat: string;
    };

    //
    // Registers
    //

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

    export type RegisterSubtype = "Mayor" | "Cert"; // starosta / zaświadczenie

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

    export type RegisterTypeInfo = {
        subtype: RegisterSubtype;
        actionTypes: RegisterAdminActionType[];
        showAdminConstructionJournal: boolean;
    };
    export const REGISTER_TYPE_INFOS: {
        [key in RegisterType]: RegisterTypeInfo;
    } = {
        "PnB (6740)": {
            subtype: "Mayor",
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
            subtype: "Mayor",
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
            subtype: "Cert",
            actionTypes: ["Postanowienie", "Przedłużenie terminu"],
            showAdminConstructionJournal: false,
        },
        "Zg. Zwykłe (6743.2)": {
            subtype: "Cert",
            actionTypes: ["Postanowienie", "Przedłużenie terminu"],
            showAdminConstructionJournal: false,
        },
        "Zm. Sp. Użytk. (6743.3)": {
            subtype: "Cert",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
        "BiP (6743.4)": {
            subtype: "Cert",
            actionTypes: ["Postanowienie", "Przedłużenie terminu"],
            showAdminConstructionJournal: true,
        },
        "ZRiD (7012)": {
            subtype: "Mayor",
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
            subtype: "Mayor",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
        "Samodz. Lokali (705)": {
            subtype: "Mayor",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
        "Dz. bud": {
            subtype: "Mayor",
            actionTypes: [],
            showAdminConstructionJournal: false,
        },
    } as const;

    export const REGISTER_SUBTYPE_INFOS = {
        Mayor: {
            decisions: [
                "Pozytywna",
                "Sprzeciwu",
                "Umarzająca",
                "Inne rozstrzygnięcie",
            ] as const,
            resolutions: [
                "Wygaśnięcia",
                "Bez rozpatrzenia",
                "Uchylająca",
                "Utrzymana w mocy",
            ] as const,
        } as const,
        Cert: {
            decisions: [
                "Brak Sprzeciwu",
                "Sprzeciwu",
                "Inne rozstrzygnięcie",
            ] as const,
            resolutions: [
                "Wycofanie zgłoszenia",
                "Bez rozpatrzenia",
                "Uchylająca",
                "Utrzymana w mocy",
            ] as const,
        } as const,
    } as const satisfies Record<
        RegisterSubtype,
        Record<string, readonly string[]>
    >;
    export type RegisterDecision =
        (typeof REGISTER_SUBTYPE_INFOS)[RegisterSubtype]["decisions"];
    export type RegisterResolution =
        (typeof REGISTER_SUBTYPE_INFOS)[RegisterSubtype]["resolutions"];

    export const REGISTER_CONSTRUCTION_FORMS = [
        "Indywidualne",
        "Spółdzielcze",
        "Sprzedaż",
        "Wynajem",
        "Komunalne",
        "Społeczne czynszowe",
        "Zakładowe",
    ] as const;
    export type RegisterConstructionForm =
        (typeof REGISTER_CONSTRUCTION_FORMS)[number];

    export const REGISTER_SPATIAL_PLANS = ["MPZP", "WZ"] as const;
    export type RegisterSpatialPlan = (typeof REGISTER_SPATIAL_PLANS)[number];

    export type Register = {
        id: number;
        type: RegisterType;

        app_number: number;
        app_submission_date: string;
        app_investor_id: number;
        app_decision_type?: RegisterDecision;
        app_decision_number: number;
        app_decision_issue_date: string;
        app_resolution_type?: RegisterResolution;
        app_resolution_number: number;
        app_resolution_issue_date: string;

        object_construction_spec_id: number;
        object_construction_form_type?: RegisterConstructionForm;
        object_spatial_plan_type?: RegisterSpatialPlan;
        object_street_id: number;
        object_number: string;
        object_pnb_acc_infra: boolean;
        object_demo_under_conservation_protection: boolean;
        object_demo_building_area: number;
        object_demo_usable_area: number;
        object_demo_volume: number;
        object_demo_building_count: number;

        // client-only helpers
        _object_construction_section_id: number;
        _object_construction_division_id: number;
        _object_construction_group_id: number;
        _object_construction_class_id: number;
        _object_commune_id: number;
        _object_place_id: number;

        admin_construction_journal_number: number;
        admin_construction_journal_date: string;
    };
    export type RegisterInvestPlot = {
        id: number;
        plot: string;
        register_id: number;
    };
    export type RegisterAdminAction = {
        id: number;
        type: RegisterAdminActionType;
        register_id: number;
        select: boolean;
        deadline: number;
        letter_date: string;
        receipt_date: string;
        reply_date: string;
    };

    //
    // Employee
    //

    export type Employee = {
        id: number;
        name: string;
        password: string;
        admin: boolean;
    };

    //
    // Home
    //

    export type InfoBoard = {
        id: number;
        contents: string;
    };
}
