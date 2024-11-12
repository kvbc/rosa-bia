import { z } from "zod";
import { DB } from "..";

export const GEODESY_TABLE_NAMES = ["communes", "places", "streets"] as const;

/*
 *
 * Row :: Commune
 *
 */

export const communeShape = z.strictObject({
    id: z.number(),
    name: z.string(),
});

export type Commune = z.infer<typeof communeShape>;

/*
 *
 * Row :: Place
 *
 */

export const placeShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    commune_id: z.number(),
    area_place_id: z.number(),
    cad_unit: z.string(),
});

export type Place = z.infer<typeof placeShape>;

export const PLACE_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<Place> = {
    commune_id: "communes",
} as const;

/*
 *
 * Row :: Street
 *
 */

export const streetShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    place_id: z.number(),
});

export type Street = z.infer<typeof streetShape>;

export const STREET_KEY_TABLE_RELATIONS: DB.RowKeyTableRelations<Street> = {
    place_id: "places",
} as const;

/*
 *
 * Meta
 *
 */

export const GEODESY_ROW_METAS = {
    communes: {
        shape: communeShape,
    },
    places: {
        shape: placeShape,
        keyTableRelations: PLACE_KEY_TABLE_RELATIONS,
    },
    streets: {
        shape: streetShape,
        keyTableRelations: STREET_KEY_TABLE_RELATIONS,
    },
} as const satisfies DB.RowMetas;
