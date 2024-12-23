import { z } from "zod";
import * as DB from "..";

export const REGISTERS_TABLE_NAMES = [
    "registers",
    "registers_plots",
    "registers_admin_actions",
] as const;

/*
 *
 * Row :: RegisterPlot
 *
 */

const REGISTER_PLOT_TYPES = [
    "app", // dzialki objete wnioskiem
    "invest", // dzialki objete inwestycja
    "road", // dzialki w pasie drogowym
    "limited", // dzialki z ograniczonym korzystaniem
] as const;
export type RegisterPlotType = (typeof REGISTER_PLOT_TYPES)[number];

export const registerPlotShape = z.strictObject({
    id: z.number(),
    plot: z.string(),
    type: z.enum(REGISTER_PLOT_TYPES),
    register_id: z.number(),
});
export type RegisterPlot = z.infer<typeof registerPlotShape>;
export const REGISTER_PLOT_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<RegisterPlot> =
    {
        register_id: "registers",
    } as const;

/*
 *
 * Row :: RegisterAdminAction
 *
 */

export const REGISTER_ADMIN_ACTION_TYPES = [
    "Wezwanie",
    "Zawiadomienie",
    "Postanowienie",
    "Konserwator",
    "Zawieszenie postępowania",
    "Przedłużenie terminu",
    "Publiczna informacja",
    "Zawiadomienie o kontroli",
    "Zgłoszenie rozbiórki",
    "Kontrola",
    "Wynik kontroli",
    "Upomnienie",
    "Zawiadomienie o ponownej kontroli",
] as const;
export type RegisterAdminActionType = (typeof REGISTER_ADMIN_ACTION_TYPES)[number]; // prettier-ignore
export const registerAdminActionTypeShape = z.enum(REGISTER_ADMIN_ACTION_TYPES);

export const registerAdminActionShape = z.strictObject({
    id: z.number(),
    type: z.enum(REGISTER_ADMIN_ACTION_TYPES),
    register_id: z.number(),
    select: z.number(),
    deadline: z.number(),
    letter_date: z.string(),
    receipt_date: z.string(),
    reply_date: z.string(),
});
export type RegisterAdminAction = z.infer<typeof registerAdminActionShape>;
export const REGISTER_ADMIN_ACTION_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<RegisterAdminAction> =
    {
        register_id: "registers",
    } as const;

/*
 *
 * Row :: Register
 *
 */

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
    "Tymczasowe (6743.5)",
    "Konserwator (Inne)",
    "Lokalizacja inwestycji (Inne)",
    "PiNB (Inne)",
    "Uzupełniający",
    "Wejście na dz. sąsiednią",
] as const;
export type RegisterType = (typeof REGISTER_TYPES)[number];
export const registerTypeShape = z.enum(REGISTER_TYPES);

export const REGISTER_CONSTRUCTION_FORM_TYPES = [
    "-",
    "Indywidualne",
    "Spółdzielcze",
    "Sprzedaż",
    "Wynajem",
    "Komunalne",
    "Społeczne czynszowe",
    "Zakładowe",
] as const;
export type RegisterConstructionFormType = (typeof REGISTER_CONSTRUCTION_FORM_TYPES)[number]; // prettier-ignore
export const registerConstructionFormTypeShape = z.enum(REGISTER_CONSTRUCTION_FORM_TYPES); // prettier-ignore

export const REGISTER_SPATIAL_PLAN_TYPES = ["-", "MPZP", "WZ"] as const;
export type RegisterSpatialPlanType = (typeof REGISTER_SPATIAL_PLAN_TYPES)[number]; // prettier-ignore
export const registerConstructionSpatialPlanTypeShape = z.enum(REGISTER_SPATIAL_PLAN_TYPES); // prettier-ignore

export const REGISTER_CONSTRUCTION_JOURNAL_TYPES = [
    "DB/A",
    "DB/B",
    "DB/C",
    "Własny",
    "Elektroniczny",
] as const;
export type RegisterConstructionJournalType = (typeof REGISTER_CONSTRUCTION_JOURNAL_TYPES)[number]; // prettier-ignore
export const registerConstructionJournalTypeShape = z.enum(REGISTER_CONSTRUCTION_JOURNAL_TYPES); // prettier-ignore

// prettier-ignore
const REGISTER_DECISION_TYPES = [
    // decyzja starosty
    "-",
    "Umarzająca",
    "Pozytywna",            // {
    "Sprzeciwu",            //   zaświadczenie/decyzja i odpowiedź (wniosek tymczasowy)
    "Inne rozstrzygnięcie", // }
] as const;
export type RegisterDecisionType = (typeof REGISTER_DECISION_TYPES)[number] // prettier-ignore
const registerDecisionTypeShape = z.enum(REGISTER_DECISION_TYPES);
export function getRegisterDecisionTypes(
    registerType: RegisterType
): RegisterDecisionType[] {
    const mayorRegisterTypes: RegisterType[] = [
        "PnB (6740)",
        "PnRozb. (6741)",
        "ZRiD (7012)",
        "Uzupełniający",
        "Wejście na dz. sąsiednią",
    ];
    if (mayorRegisterTypes.includes(registerType)) {
        return [
            "-",
            "Umarzająca",
            "Pozytywna",
            "Sprzeciwu",
            "Inne rozstrzygnięcie",
        ];
    }
    return ["-", "Pozytywna", "Sprzeciwu", "Inne rozstrzygnięcie"];
}

const REGISTER_RESOLUTION_TYPES = [
    "-",
    "Wygaśnięcia",
    "Bez rozpatrzenia",
    "Uchylająca",
    "Utrzymana w mocy",
    "Zmiana 155 k.pa.", // PnRozb.
    "Wycofanie zgłoszenia",
    "Uchylenie z art. 36a ust. 2",
    // tymczasowy
    "Kasacja",
    "Pozwolenie na budowę",
    "Rozebrany",
] as const;
export type RegisterResolutionType = (typeof REGISTER_RESOLUTION_TYPES)[number];
const registerResolutionTypeShape = z.enum(REGISTER_RESOLUTION_TYPES);
export function getRegisterResolutionTypes(
    registerType: RegisterType
): RegisterResolutionType[] {
    switch (registerType) {
        case "PnB (6740)":
            return [
                "-",
                "Wygaśnięcia",
                "Bez rozpatrzenia",
                "Uchylająca",
                "Utrzymana w mocy",
                "Uchylenie z art. 36a ust. 2",
            ];
        case "ZRiD (7012)":
        case "Uzupełniający":
        case "Wejście na dz. sąsiednią":
            return [
                "-",
                "Wygaśnięcia",
                "Bez rozpatrzenia",
                "Uchylająca",
                "Utrzymana w mocy",
            ];
        case "PnRozb. (6741)":
            return [
                "-",
                "Wygaśnięcia",
                "Bez rozpatrzenia",
                "Uchylająca",
                "Utrzymana w mocy",
                "Zmiana 155 k.pa.",
            ];
        case "Zg. Rozb. (6743.1)":
        case "Zg. Zwykłe (6743.2)":
        case "Zm. Sp. Użytk. (6743.3)":
        case "BiP (6743.4)":
        case "Samodz. Lokali (705)":
            return [
                "-",
                "Wycofanie zgłoszenia",
                "Bez rozpatrzenia",
                "Uchylająca",
                "Utrzymana w mocy",
            ];
        case "Pisma różne (670)":
            return ["-", "Uchylająca", "Utrzymana w mocy"];
        case "Tymczasowe (6743.5)":
            return [
                "-",
                "Wycofanie zgłoszenia",
                "Bez rozpatrzenia",
                "Kasacja",
                "Pozwolenie na budowę",
                "Rozebrany",
            ];
        case "Dz. bud":
        case "Konserwator (Inne)":
        case "Lokalizacja inwestycji (Inne)":
        case "PiNB (Inne)":
            return [];
    }
}

export const REGISTER_NEIGHBOURING_PROPERTY_TYPES = [
    "Budynek",
    "Lokal",
    "Nieruchomość",
] as const;
export type RegisterNeighbouringPropertyType = (typeof REGISTER_NEIGHBOURING_PROPERTY_TYPES)[number]; // prettier-ignore
export const registerNeighbouringPropertyTypeShape = z.enum(
    REGISTER_NEIGHBOURING_PROPERTY_TYPES
);

// prettier-ignore
export const registerShapeObject = z.strictObject({
    id: z.number(),
    type: registerTypeShape,

    assigned_employee_id: z.number(),

    app_number: z.string(),
    app_submission_date: z.string(),
    app_investor_id: z.number(),
    app_decision_type: registerDecisionTypeShape,
    app_decision_number: z.string(),
    app_decision_issue_date: z.string(),
    app_resolution_type: registerResolutionTypeShape,
    app_resolution_number: z.string(),
    app_resolution_issue_date: z.string(),
    app_construction_journal_type: registerConstructionJournalTypeShape,

    object_construction_spec_id: z.number(),
    object_custom_construction_intent: z.string(),
    object_construction_form_type: registerConstructionFormTypeShape,
    object_spatial_plan_type: registerConstructionSpatialPlanTypeShape,
    object_street_id: z.number(),
    object_number: z.string(),
    object_pnb_acc_infra: z.number(),
    object_demo_under_conservation_protection: z.number(),
    object_demo_building_area: z.number(),
    object_demo_usable_area: z.number(),
    object_demo_volume: z.number(),
    object_demo_building_count: z.number(),
    object_demo_premises_count: z.number(),
    object_usage_change_from: z.string(),
    object_usage_change_to: z.string(),
    object_construction_law_intent_id: z.number(),
    object_public_info: z.number(),
    object_localization_date_from: z.string(),
    object_localization_date_to: z.string(),
    object_neighbouring_property_type: registerNeighbouringPropertyTypeShape,

    admin_construction_journal_number: z.number(),
    admin_construction_journal_date: z.string(),
    admin_construction_journal_tome: z.number(),

    other_case_title: z.string(),
    other_case_from: z.string(),
    other_case_sign: z.string(),
    other_case_date: z.string(),
    other_case_init_date: z.string(),
    other_case_settle_date: z.string(),
    other_case_comments: z.string()
})
const registerShape = registerShapeObject
    .refine(
        (register) => {
            return getRegisterDecisionTypes(register.type).includes(
                register.app_decision_type
            );
        },
        {
            message: "Decision type is not acceptable",
            path: ["app_decision_type"],
        }
    )
    .refine(
        (register) => {
            return getRegisterResolutionTypes(register.type).includes(
                register.app_resolution_type
            );
        },
        {
            message: "Resolution type is not acceptable",
            path: ["app_decision_type"],
        }
    );
export type Register = z.infer<typeof registerShape>;
export const REGISTER_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<Register> = {
    assigned_employee_id: "employees",
    object_construction_law_intent_id: "construction_law_intents",
    app_investor_id: "investors",
    object_construction_spec_id: "construction_specs",
    object_street_id: "streets",
} as const;

/*
 *
 * Meta
 *
 */

export const REGISTERS_ROW_METAS = {
    registers: {
        shape: registerShape,
        keys: registerShapeObject.keyof().options,
        keyTableRelations: REGISTER_KEY_TABLE_RELATIONS,
    },
    registers_admin_actions: {
        shape: registerAdminActionShape,
        keyTableRelations: REGISTER_ADMIN_ACTION_KEY_TABLE_RELATIONS,
    },
    registers_plots: {
        shape: registerPlotShape,
        keyTableRelations: REGISTER_PLOT_KEY_TABLE_RELATIONS,
    },
} as const satisfies DB.RowMetas;
