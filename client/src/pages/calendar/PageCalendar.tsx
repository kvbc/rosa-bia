import { Heading } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import plLocale from "@fullcalendar/core/locales/pl";

export function PageCalendar() {
    return (
        <>
            <Heading>Kalendarz</Heading>
            <FullCalendar
                plugins={[multiMonthPlugin]}
                initialView="multiMonthYear"
                locale={plLocale}
                selectable
            />
        </>
    );
}
