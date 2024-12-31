import { z } from "zod";
import * as DB from "..";

export const CALENDAR_EVENTS_TABLE_NAMES = ["calendar_events"] as const;

/*
 *
 * Row :: Calendar Event
 *
 */

export const calendarEventShape = z.object({
    id: z.number(),
    title: z.string(),
    start: z.string(),
    end: z.string().optional(),
});

export type CalendarEvent = z.infer<typeof calendarEventShape>;

/*
 *
 * Meta
 *
 */

export const CALENDAR_EVENT_ROW_METAS = {
    calendar_events: {
        shape: calendarEventShape,
    },
} as const satisfies DB.RowMetas;
