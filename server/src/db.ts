//
// db_types.ts
// database table typings
//

import { Database } from "sqlite3";
import { AnyZodObject, z } from "zod";

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

    //
    // Tables that can only be modified by an employee of admin privilages
    //
    export const TABLE_NAMES_MODIFY_ADMIN_ONLY: readonly TableName[] = [
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

        export const InvestorShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            address: z.string(),
        });
        export type Investor = z.infer<typeof InvestorShape>;

        //
        // Geodesy
        //

        export const CommuneShape = z.strictObject({
            id: z.number(),
            name: z.string(),
        });
        export type Commune = z.infer<typeof CommuneShape>;

        export const PlaceShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            commune_id: z.number(),
            area_place_id: z.number(),
            cad_unit: z.string(),
        });
        export type Place = z.infer<typeof PlaceShape>;
        export const PLACE_KEY_RELATIONS = {
            commune_id: "communes",
        } as const satisfies Partial<Record<keyof Place, DB.TableName>>;

        export const StreetShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            place_id: z.number(),
        });
        export type Street = z.infer<typeof StreetShape>;
        export const STREET_KEY_RELATIONS = {
            place_id: "places",
        } as const satisfies Partial<Record<keyof Street, DB.TableName>>;

        //
        // PKOB
        //

        export const ConstructionSectionShape = z.strictObject({
            id: z.number(),
            name: z.string(),
        });
        export type ConstructionSection = z.infer<
            typeof ConstructionSectionShape
        >;

        export const ConstructionDivisionShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            section_id: z.number(),
        });
        export type ConstructionDivision = z.infer<
            typeof ConstructionDivisionShape
        >;
        export const CONSTRUCTION_DIVISION_KEY_RELATIONS = {
            section_id: "construction_sections",
        } as const satisfies Partial<
            Record<keyof ConstructionDivision, DB.TableName>
        >;

        export const ConstructionGroupShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            division_id: z.number(),
        });
        export type ConstructionGroup = z.infer<typeof ConstructionGroupShape>;
        export const CONSTRUCTION_GROUP_KEY_RELATIONS = {
            division_id: "construction_divisions",
        } as const satisfies Partial<
            Record<keyof ConstructionGroup, DB.TableName>
        >;

        export const ConstructionClassShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            group_id: z.number(),
            pkob: z.number(),
        });
        export type ConstructionClass = z.infer<typeof ConstructionClassShape>;
        export const CONSTRUCTION_CLASS_KEY_RELATIONS = {
            group_id: "construction_groups",
        } as const satisfies Partial<
            Record<keyof ConstructionClass, DB.TableName>
        >;

        export const ConstructionSpecShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            class_id: z.number(),
            zl_class: z.string(),
            ob_cat: z.string(),
        });
        export type ConstructionSpec = z.infer<typeof ConstructionSpecShape>;
        export const CONSTRUCTION_SPEC_KEY_RELATIONS = {
            class_id: "construction_classes",
        } as const satisfies Partial<
            Record<keyof ConstructionSpec, DB.TableName>
        >;

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
        export const RegisterShape = z.strictObject({
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
        export type Register = z.infer<typeof RegisterShape> & {
            // client-only helpers
            _object_construction_section_id: number;
            _object_construction_division_id: number;
            _object_construction_group_id: number;
            _object_construction_class_id: number;
            _object_commune_id: number;
            _object_place_id: number;
        };
        export const REGISTER_KEY_RELATIONS = {
            app_investor_id: "investors",
            object_construction_spec_id: "construction_specs",
            object_street_id: "streets",
        } as const satisfies Partial<Record<keyof Register, DB.TableName>>;

        const REGISTER_PLOT_TYPES = [
            "app", // dzialki objete wnioskiem
            "invest", // dzialki objete inwestycja
            "road", // dzialki w pasie drogowym
            "limited", // dzialki z ograniczonym korzystaniem
        ] as const;
        export type RegisterPlotType = (typeof REGISTER_PLOT_TYPES)[number];
        export const RegisterPlotShape = z.strictObject({
            id: z.number(),
            plot: z.string(),
            type: z.enum(REGISTER_PLOT_TYPES),
            register_id: z.number(),
        });
        export type RegisterPlot = z.infer<typeof RegisterPlotShape>;
        export const REGISTER_PLOT_KEY_RELATIONS = {
            register_id: "registers",
        } as const satisfies Partial<Record<keyof RegisterPlot, DB.TableName>>;

        export const RegisterAdminActionShape = z.strictObject({
            id: z.number(),
            type: z.enum(REGISTER_ADMIN_ACTION_TYPES),
            register_id: z.number(),
            select: z.number(),
            deadline: z.number(),
            letter_date: z.string(),
            receipt_date: z.string(),
            reply_date: z.string(),
        });
        export type RegisterAdminAction = z.infer<
            typeof RegisterAdminActionShape
        >;
        export const REGISTER_ADMIN_ACTION_KEY_RELATIONS = {
            register_id: "registers",
        } as const satisfies Partial<
            Record<keyof RegisterAdminAction, DB.TableName>
        >;

        //
        // Employee
        //

        export const EmployeeShape = z.strictObject({
            id: z.number(),
            name: z.string(),
            password: z.string(),
            admin: z.number(),
        });
        export const EMPLOYEE_ADMIN_KEYS: (keyof Employee)[] = ['password'] as const // prettier-ignore
        export type Employee = z.infer<typeof EmployeeShape> & {
            // client-only
            has_password: boolean;
        };

        //
        // InfoBoard
        //

        export const InfoBoardShape = z.strictObject({
            id: z.number(),
            contents: z.string(),
        });
        export type InfoBoard = z.infer<typeof InfoBoardShape>;

        //
        //
        //

        export function getMeta(tableName: TableName) {
            return META[tableName];
        }

        const META: Record<
            TableName,
            {
                shape: AnyZodObject;
                keys: readonly string[];
                keyRelations?: Record<string, TableName>;
                adminKeys?: readonly string[];
            }
        > = {
            investors: {
                shape: InvestorShape,
                keys: InvestorShape.keyof().options,
            },
            communes: {
                shape: CommuneShape,
                keys: CommuneShape.keyof().options,
            },
            places: {
                shape: PlaceShape,
                keys: PlaceShape.keyof().options,
                keyRelations: PLACE_KEY_RELATIONS,
            },
            streets: {
                shape: StreetShape,
                keys: StreetShape.keyof().options,
                keyRelations: STREET_KEY_RELATIONS,
            },
            construction_sections: {
                shape: ConstructionSectionShape,
                keys: ConstructionSectionShape.keyof().options,
            },
            construction_divisions: {
                shape: ConstructionDivisionShape,
                keys: ConstructionDivisionShape.keyof().options,
                keyRelations: CONSTRUCTION_DIVISION_KEY_RELATIONS,
            },
            construction_groups: {
                shape: ConstructionGroupShape,
                keys: ConstructionGroupShape.keyof().options,
                keyRelations: CONSTRUCTION_GROUP_KEY_RELATIONS,
            },
            construction_classes: {
                shape: ConstructionClassShape,
                keys: ConstructionClassShape.keyof().options,
                keyRelations: CONSTRUCTION_CLASS_KEY_RELATIONS,
            },
            construction_specs: {
                shape: ConstructionSpecShape,
                keys: ConstructionSpecShape.keyof().options,
                keyRelations: CONSTRUCTION_SPEC_KEY_RELATIONS,
            },
            registers: {
                shape: RegisterShape,
                keys: RegisterShape.keyof().options,
                keyRelations: REGISTER_KEY_RELATIONS,
            },
            registers_plots: {
                shape: RegisterPlotShape,
                keys: RegisterPlotShape.keyof().options,
                keyRelations: REGISTER_PLOT_KEY_RELATIONS,
            },
            registers_admin_actions: {
                shape: RegisterAdminActionShape,
                keys: RegisterAdminActionShape.keyof().options,
                keyRelations: REGISTER_ADMIN_ACTION_KEY_RELATIONS,
            },
            employees: {
                shape: EmployeeShape,
                adminKeys: EMPLOYEE_ADMIN_KEYS,
                keys: EmployeeShape.keyof().options,
            },
            info_boards: {
                shape: InfoBoardShape,
                keys: InfoBoardShape.keyof().options,
            },
        };
        // satisfies Record<DB.TableName, any>;
    }
}
