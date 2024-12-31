import { Heading } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import plLocale from "@fullcalendar/core/locales/pl";
import useDBTable from "@/hooks/useDBTable";
import { CalendarEvent } from "@shared/db/rows";
import { useCallback } from "react";
import { DateSelectArg, EventDropArg } from "@fullcalendar/core/index.js";
import interactionPlugin, {
    EventResizeDoneArg,
} from "@fullcalendar/interaction";

export function PageCalendar() {
    const calendarEventsDBTable = useDBTable<CalendarEvent>("calendar_events");

    const handleDateSelect = useCallback(
        (selectInfo: DateSelectArg) => {
            const title = prompt("Tytuł wydarzenia:");
            if (title) {
                const event: CalendarEvent = {
                    id: calendarEventsDBTable.topRowID + 1, // unused
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                };
                calendarEventsDBTable.addRowMutation.mutate(event);
            }
        },
        [calendarEventsDBTable.addRowMutation, calendarEventsDBTable.topRowID]
    );

    const handleEventDrop = useCallback(
        (info: EventDropArg) => {
            const updatedEvent: CalendarEvent = {
                id: Number(info.event.id),
                title: info.event.title,
                start: info.event.startStr,
                end: info.event.endStr,
            };
            calendarEventsDBTable.updateRowMutation.mutate(updatedEvent);
        },
        [calendarEventsDBTable.updateRowMutation]
    );

    const handleEventResize = useCallback(
        (info: EventResizeDoneArg) => {
            const updatedEvent: CalendarEvent = {
                id: Number(info.event.id),
                title: info.event.title,
                start: info.event.startStr,
                end: info.event.endStr,
            };
            calendarEventsDBTable.updateRowMutation.mutate(updatedEvent);
        },
        [calendarEventsDBTable.updateRowMutation]
    );

    return (
        <>
            <Heading>Kalendarz</Heading>
            <FullCalendar
                plugins={[multiMonthPlugin, interactionPlugin]}
                initialView="multiMonthYear"
                events={calendarEventsDBTable.rows.map((row) => ({
                    ...row,
                    id: String(row.id),
                }))}
                locale={plLocale}
                selectable
                editable
                select={handleDateSelect}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
            />
        </>
    );
}
