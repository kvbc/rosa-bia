import { z } from "zod";
import * as DB from "..";

export const PKOB_TABLE_NAMES = [
    "construction_sections",
    "construction_divisions",
    "construction_groups",
    "construction_classes",
    "construction_specs",
] as const;

/*
 *
 * Row :: Construction Section
 *
 */

export const constructionSectionShape = z.strictObject({
    id: z.number(),
    name: z.string(),
});

export type ConstructionSection = z.infer<typeof constructionSectionShape>;

/*
 *
 * Row :: Construction Division
 *
 */

export const constructionDivisionShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    section_id: z.number(),
});

export type ConstructionDivision = z.infer<typeof constructionDivisionShape>;

export const CONSTRUCTION_DIVISION_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<ConstructionDivision> =
    {
        section_id: "construction_sections",
    } as const;

/*
 *
 * Row :: Construction Group
 *
 */

export const constructionGroupShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    division_id: z.number(),
});

export type ConstructionGroup = z.infer<typeof constructionGroupShape>;

export const CONSTRUCTION_GROUP_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<ConstructionGroup> =
    {
        division_id: "construction_divisions",
    } as const;

/*
 *
 * Row :: Construction Class
 *
 */

export const constructionClassShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    group_id: z.number(),
    pkob: z.number(),
});

export type ConstructionClass = z.infer<typeof constructionClassShape>;

export const CONSTRUCTION_CLASS_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<ConstructionClass> =
    {
        group_id: "construction_groups",
    } as const;

/*
 *
 * Row :: Construction Spec
 *
 */

export const constructionSpecShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    class_id: z.number(),
    zl_class: z.string(),
    ob_cat: z.string(),
});

export type ConstructionSpec = z.infer<typeof constructionSpecShape>;

export const CONSTRUCTION_SPEC_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<ConstructionSpec> =
    {
        class_id: "construction_classes",
    } as const;

/*
 *
 * Meta
 *
 */

export const PKOB_ROW_METAS = {
    construction_sections: {
        shape: constructionSectionShape,
    },
    construction_divisions: {
        shape: constructionDivisionShape,
        keyTableRelations: CONSTRUCTION_DIVISION_KEY_TABLE_RELATIONS,
    },
    construction_groups: {
        shape: constructionGroupShape,
        keyTableRelations: CONSTRUCTION_GROUP_KEY_TABLE_RELATIONS,
    },
    construction_classes: {
        shape: constructionClassShape,
        keyTableRelations: CONSTRUCTION_CLASS_KEY_TABLE_RELATIONS,
    },
    construction_specs: {
        shape: constructionSpecShape,
        keyTableRelations: CONSTRUCTION_SPEC_KEY_TABLE_RELATIONS,
    },
} as const satisfies DB.RowMetas;
