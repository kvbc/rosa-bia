import * as DB from "@shared/db";
import React, { useMemo } from "react";
import RegisterAdminProcedureActionsTableRow from "./RegisterAdminProcedureActionsTableRow";
import { MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { ClientRegister } from "../PageRegisters";

const registerTypeActionTypes: Record<
    DB.Rows.RegisterType,
    DB.Rows.RegisterAdminActionType[]
> = {
    "PnB (6740)": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Konserwator",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
        "Publiczna informacja",
    ],
    "PnRozb. (6741)": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Konserwator",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
    ],
    "Zg. Rozb. (6743.1)": ["Postanowienie", "Przedłużenie terminu"],
    "Zg. Zwykłe (6743.2)": ["Postanowienie", "Przedłużenie terminu"],
    "Zm. Sp. Użytk. (6743.3)": ["Postanowienie", "Przedłużenie terminu"],
    "BiP (6743.4)": ["Postanowienie", "Przedłużenie terminu"],
    "ZRiD (7012)": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
        "Publiczna informacja",
    ],
    "Pisma różne (670)": ["Wezwanie"],
    "Samodz. Lokali (705)": ["Wezwanie"],
    "Dz. bud": [],
    "Tymczasowe (6743.5)": [
        // administracyjne
        "Postanowienie",
        "Przedłużenie terminu",
        "Zawiadomienie o kontroli",
        "Zgłoszenie rozbiórki",
        "Kontrola",
        "Wynik kontroli",
        // egzaminacyjne
        "Wezwanie",
        "Upomnienie",
        "Zawiadomienie o ponownej kontroli",
    ],
    Uzupełniający: [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
        "Publiczna informacja",
    ],
    "Wejście na dz. sąsiednią": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Konserwator",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
    ],
    "Konserwator (Inne)": [],
    "PiNB (Inne)": [],
    "Lokalizacja inwestycji (Inne)": [],
} as const;

export default function RegisterAdminProcedureActionsTable(
    props: TableEditRowContentComponentProps<ClientRegister>
) {
    const { row } = props;

    const actionTypes = useMemo(
        () => registerTypeActionTypes[row.type],
        [row.type]
    );

    return (
        <Tb
            isCollapsible
            myHeaders={
                <>
                    <Th>Czynności</Th>
                    <Th>Wybór</Th>
                    <Th>Termin (dni)</Th>
                    <Th>Data pisma</Th>
                    <Th>Data odebrania</Th>
                    <Th>Data odpowiedzi</Th>
                </>
            }
        >
            {actionTypes.map((actionType) => (
                <RegisterAdminProcedureActionsTableRow
                    key={actionType}
                    actionType={actionType}
                    {...props}
                />
            ))}
        </Tb>
    );
}
