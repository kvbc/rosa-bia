import { RegisterType } from "@shared/db/rows";

export const REGISTER_TYPE_DESCRIPTIONS: Partial<Record<RegisterType, string>> =
    {
        "PnB (6740)":
            "Pozwolenia na budowę, przebudowę i rozbudowę obiektów budowlanych oraz zmiany sposobu użytkowania obiektów budowlanych lub ich części",
        "PnRozb. (6741)": "Rozbiórki obiektów budowlanych",
        "Zg. Rozb. (6743.1)": "Zgłoszenie rozbiórki obiektów budowlanych",
        "Zg. Zwykłe (6743.2)":
            "Zgłoszenie budowy lub wykonywania innych robót budowlanych (zwykłe)",
        "Zm. Sp. Użytk. (6743.3)":
            "Zgłoszenie zmiany sposobu użytkowania obiektu budowlanego lub jego części",
        "BiP (6743.4)":
            "Zgłoszenia robót budowlanych wymagające projektu budowlanego (BiP)",
        "Tymczasowe (6743.5)":
            "Zgłoszenia robót budowlanych tymczasowych obiektów budowlanych (Zgodnie z §1 pkt 1 Zarządzenia Starosty Człuchowskiego Nr 6/2022 z dnia 18 lutego 2022r.)",
        "ZRiD (7012)":
            "Przygotowania i realizacji inwestycji w zakresie dróg publicznych (ZRID)",
        "Dz. bud":
            "Wydawanie rejestru dziennika budowy - Art. 47g Ustawy z dnia 7 lipca 1994 r. Prawo budowlane",
        "Konserwator (Inne)":
            "Współdziałanie z wojewódzkim konserwatorem zabytków i otrzymywanie informacji z rejestrów zabytków",
        "Lokalizacja inwestycji (Inne)": "Lokalizacja inwestycji",
        "Wejście na dz. sąsiednią":
            "Zezwolenia na wejście w teren sąsiedniej nieruchomości w celu wykonania niezbędnych robót budowlanych",
    };
