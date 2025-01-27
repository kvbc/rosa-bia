import { z } from "zod";
import * as DB from "..";

export const INVESTORS_TABLE_NAMES = ["investors"] as const;

/*
 *
 * Row :: Investor
 *
 */

export const investorShape = z.strictObject({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    is_legal: z.boolean(),
});

export type Investor = z.infer<typeof investorShape>;

/*
 *
 * Meta
 *
 */

export const INVESTORS_ROW_METAS = {
    investors: {
        shape: investorShape,
    },
} as const satisfies DB.RowMetas;
