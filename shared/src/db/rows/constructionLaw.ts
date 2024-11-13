import { z } from "zod";
import { REGISTER_TYPES } from "./registers";
import * as DB from "..";

export const CONSTRUCTION_LAW_TABLE_NAMES = [
    "construction_law_categories",
    "construction_law_intents",
] as const;

/*
 *
 * Row :: Category
 *
 */

export const constructionLawCategoryShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    register_type: z.enum(REGISTER_TYPES),
});

export type ConstructionLawCategory = z.infer<
    typeof constructionLawCategoryShape
>;

/*
 *
 * Row :: Intent
 *
 */

export const constructionLawIntentShape = z.strictObject({
    id: z.number(),
    category_id: z.number(),
    intent: z.string(),
    legal_basis: z.string(),
    additional_requirements: z.string(),
});

export type ConstructionLawIntent = z.infer<typeof constructionLawIntentShape>;

export const CONSTRUCTION_LAW_INTENT_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<ConstructionLawIntent> =
    {
        category_id: "construction_law_categories",
    } as const;

/*
 *
 * Meta
 *
 */

export const CONSTRUCTION_LAW_ROW_METAS = {
    construction_law_categories: {
        shape: constructionLawCategoryShape,
    },
    construction_law_intents: {
        shape: constructionLawIntentShape,
        keyTableRelations: CONSTRUCTION_LAW_INTENT_KEY_TABLE_RELATIONS,
    },
} as const satisfies DB.RowMetas;
