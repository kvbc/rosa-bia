import { z } from "zod";
import * as DB from "..";

export const INFO_BOARDS_TABLE_NAMES = ["info_boards"] as const;

/*
 *
 * Row :: Info Board
 *
 */

export const infoBoardShape = z.strictObject({
    id: z.number(),
    contents: z.string(),
});

export type InfoBoard = z.infer<typeof infoBoardShape>;

/*
 *
 * Meta
 *
 */

export const INFO_BOARDS_ROW_METAS = {
    info_boards: {
        shape: infoBoardShape,
    },
} as const satisfies DB.RowMetas;
