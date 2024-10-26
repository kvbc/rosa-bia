//
// db_types.ts
// database table typings
//

import { Database } from "sqlite3";
import { z, ZodObject } from "zod";

export namespace DB {
    export const load = () => new Database("db/db.db");

    export type Row = Record<string, any> & {
        id: number;
    };

    export const TABLE_NAMES = [
        "investors",
        "communes",
        "places",
        "streets",
        "construction_sections",
        "construction_divisions",
        "construction_groups",
        "construction_classes",
        "construction_specs",
        "registers",
        "registers_plots",
        "registers_admin_actions",
        "employees",
        "info_boards",
    ] as const;
    export type TableName = (typeof TABLE_NAMES)[number];

    export const TABLE_NAMES_MODIFY_ADMIN_ONLY: readonly DB.TableName[] = [
        "construction_sections",
        "construction_divisions",
        "construction_groups",
        "construction_classes",
        "construction_specs",
        "employees",
        "info_boards",
    ];

    export namespace Rows {
        //
        // Investors
        //

        export const ZInvestor = z.object({
            id: z.number(),
            name: z.string(),
            address: z.string(),
        });
        export type Investor = z.infer<typeof ZInvestor>;

        //
        // Geodesy
        //

        export const ZCommune = z.object({
            id: z.number(),
            name: z.string(),
        });
        export type Commune = z.infer<typeof ZCommune>;

        export const ZPlace = z.object({
            id: z.number(),
            name: z.string(),
            commune_id: z.number(),
            area_place_id: z.number(),
            cad_unit: z.string(),
        });
        export type Place = z.infer<typeof ZPlace>;

        export const ZStreet = z.object({
            id: z.number(),
            name: z.string(),
            place_id: z.number(),
        });
        export type Street = z.infer<typeof ZStreet>;

        //
        // PKOB
        //

        export const ZConstructionSection = z.object({
            id: z.number(),
            name: z.string(),
        });
        export type ConstructionSection = z.infer<typeof ZConstructionSection>;

        export const ZConstructionDivision = z.object({
            id: z.number(),
            name: z.string(),
            section_id: z.number(),
        });
        export type ConstructionDivision = z.infer<
            typeof ZConstructionDivision
        >;

        export const ZConstructionGroup = z.object({
            id: z.number(),
            name: z.string(),
            division_id: z.number(),
        });
        export type ConstructionGroup = z.infer<typeof ZConstructionGroup>;

        export const ZConstructionClass = z.object({
            id: z.number(),
            name: z.string(),
            group_id: z.number(),
            pkob: z.number(),
        });
        export type ConstructionClass = z.infer<typeof ZConstructionClass>;

        export const ZConstructionSpec = z.object({
            id: z.number(),
            name: z.string(),
            class_id: z.number(),
            zl_class: z.string(),
            ob_cat: z.string(),
        });
        export type ConstructionSpec = z.infer<typeof ZConstructionSpec>;

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

        export type RegisterSubtype = "Mayor" | "Cert"; // decyzja starosty / zaświadczenie

        export const REGISTER_ADMIN_ACTION_TYPES = [
            "Wezwanie",
            "Zawiadomienie",
            "Postanowienie",
            "Konserwator",
            "Zawieszenie postępowania",
            "Przedłużenie terminu",
        ] as const;
        export type RegisterAdminActionType = (typeof REGISTER_ADMIN_ACTION_TYPES)[number]; // prettier-ignore

        export type RegisterTypeInfo = {
            subtype: RegisterSubtype;
            actionTypes: RegisterAdminActionType[];
            showAdminConstructionJournal: boolean;
        };
        export const REGISTER_TYPE_INFOS: Record<
            RegisterType,
            RegisterTypeInfo
        > = {
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
                actionTypes: ["Postanowienie", "Przedłużenie terminu"],
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
                actionTypes: ["Wezwanie"],
                showAdminConstructionJournal: false,
            },
            "Samodz. Lokali (705)": {
                subtype: "Mayor",
                actionTypes: ["Wezwanie"],
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
        export type RegisterDecision = (typeof REGISTER_SUBTYPE_INFOS)[RegisterSubtype]["decisions"][number]; // prettier-ignore
        export type RegisterResolution = (typeof REGISTER_SUBTYPE_INFOS)[RegisterSubtype]["resolutions"][number]; // prettier-ignore

        export const REGISTER_CONSTRUCTION_FORMS = [
            "Indywidualne",
            "Spółdzielcze",
            "Sprzedaż",
            "Wynajem",
            "Komunalne",
            "Społeczne czynszowe",
            "Zakładowe",
        ] as const;
        export type RegisterConstructionForm = (typeof REGISTER_CONSTRUCTION_FORMS)[number]; // prettier-ignore

        export const REGISTER_SPATIAL_PLANS = ["MPZP", "WZ"] as const;
        export type RegisterSpatialPlan =
            (typeof REGISTER_SPATIAL_PLANS)[number];

        export const REGISTER_CONSTRUCTION_JOURNAL_TYPES = [
            "DB/A",
            "DB/B",
            "DB/C",
            "Własny",
            "Elektroniczny",
        ] as const;
        export type RegisterConstructionJournalType = (typeof REGISTER_CONSTRUCTION_JOURNAL_TYPES)[number]; // prettier-ignore

        const ZRegisterDecision = z.enum(REGISTER_SUBTYPE_INFOS.Mayor.decisions).or(z.enum(REGISTER_SUBTYPE_INFOS.Cert.decisions)) // prettier-ignore
        const ZRegisterResolution = z.enum(REGISTER_SUBTYPE_INFOS.Mayor.resolutions).or(z.enum(REGISTER_SUBTYPE_INFOS.Cert.resolutions)) // prettier-ignore

        // prettier-ignore
        export const ZRegister = z.object({
        id: z.number(),
        type: z.enum(REGISTER_TYPES),

        app_number: z.number(),
        app_submission_date: z.string(),
        app_investor_id: z.number(),
        app_decision_type: ZRegisterDecision.optional(),
        app_decision_number: z.number(),
        app_decision_issue_date: z.string(),
        app_resolution_type: ZRegisterResolution.optional(),
        app_resolution_number: z.number(),
        app_resolution_issue_date: z.string(),
        app_construction_journal_type: z.enum(REGISTER_CONSTRUCTION_JOURNAL_TYPES),

        object_construction_spec_id: z.number(),
        object_construction_form_type: z.enum(REGISTER_CONSTRUCTION_FORMS).optional(),
        object_spatial_plan_type: z.enum(REGISTER_SPATIAL_PLANS).optional(),
        object_street_id: z.number(),
        object_number: z.string(),
        object_pnb_acc_infra: z.number(),
        object_demo_under_conservation_protection: z.number(),
        object_demo_building_area: z.number(),
        object_demo_usable_area: z.number(),
        object_demo_volume: z.number(),
        object_demo_building_count: z.number(),
        object_usage_change_from: z.string(),
        object_usage_change_to: z.string(),

        admin_construction_journal_number: z.number(),
        admin_construction_journal_date: z.string(),
        admin_construction_journal_tome: z.number()
    });
        export type Register = z.infer<typeof ZRegister> & {
            // client-only helpers
            _object_construction_section_id: number;
            _object_construction_division_id: number;
            _object_construction_group_id: number;
            _object_construction_class_id: number;
            _object_commune_id: number;
            _object_place_id: number;
        };

        const REGISTER_PLOT_TYPES = [
            "app", // dzialki objete wnioskiem
            "invest", // dzialki objete inwestycja
            "road", // dzialki w pasie drogowym
            "limited", // dzialki z ograniczonym korzystaniem
        ] as const;
        export type RegisterPlotType = (typeof REGISTER_PLOT_TYPES)[number];
        export const ZRegisterPlot = z.object({
            id: z.number(),
            plot: z.string(),
            type: z.enum(REGISTER_PLOT_TYPES),
            register_id: z.number(),
        });
        export type RegisterPlot = z.infer<typeof ZRegisterPlot>;

        export const ZRegisterAdminAction = z.object({
            id: z.number(),
            type: z.enum(REGISTER_ADMIN_ACTION_TYPES),
            register_id: z.number(),
            select: z.number(),
            deadline: z.number(),
            letter_date: z.string(),
            receipt_date: z.string(),
            reply_date: z.string(),
        });
        export type RegisterAdminAction = z.infer<typeof ZRegisterAdminAction>;

        //
        // Employee
        //

        export const ZEmployee = z.object({
            id: z.number(),
            name: z.string(),
            password: z.string(),
            admin: z.number(),
        });
        export const EMPLOYEE_ADMIN_PROPS: readonly (keyof Employee)[] = ['password'] // prettier-ignore
        export type Employee = z.infer<typeof ZEmployee> & {
            // client-only
            has_password: boolean;
        };

        //
        // Home
        //

        export const ZInfoBoard = z.object({
            id: z.number(),
            contents: z.string(),
        });
        export type InfoBoard = z.infer<typeof ZInfoBoard>;

        //
        //
        //

        export const INFOS: {
            [key in TableName]: {
                zod: ZodObject<any>;
                adminProps?: readonly string[];
            };
        } = {
            investors: { zod: ZInvestor },
            communes: { zod: ZCommune },
            places: { zod: ZPlace },
            streets: { zod: ZStreet },
            construction_sections: { zod: ZConstructionSection },
            construction_divisions: { zod: ZConstructionDivision },
            construction_groups: { zod: ZConstructionGroup },
            construction_classes: { zod: ZConstructionClass },
            construction_specs: { zod: ZConstructionSpec },
            registers: { zod: ZRegister },
            registers_plots: { zod: ZRegisterPlot },
            registers_admin_actions: { zod: ZRegisterAdminAction },
            employees: {
                zod: ZEmployee,
                adminProps: EMPLOYEE_ADMIN_PROPS,
            },
            info_boards: { zod: ZInfoBoard },
        };
    }
}
