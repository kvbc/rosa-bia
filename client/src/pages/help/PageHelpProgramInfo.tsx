import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import {
    Box,
    Heading,
    Link,
    List,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";

export default function PageHelpProgramInfo() {
    return (
        <Box fontSize="small">
            <Heading>Informacje o programie</Heading>
            <Separator />
            <br />
            <DataListRoot>
                <DataListItem
                    label="Nazwa programu"
                    value={
                        <Text fontWeight="bold">
                            R.O.S.A. BiA
                            <br />
                            <Text fontWeight="normal">
                                Rejestr Ogólnych Spraw Administracyjnych
                                Wydziału Budownictwa i Architektury
                            </Text>
                        </Text>
                    }
                />
                <DataListItem
                    label="Opracował"
                    value={
                        <Text fontWeight="bold">
                            Mateusz Leśniewski
                            <br />
                            <Link
                                fontWeight="normal"
                                asChild
                                colorPalette="blue"
                                textDecoration="underline"
                            >
                                <ReactLink to="/help/contact">
                                    Kontakt
                                </ReactLink>
                            </Link>
                        </Text>
                    }
                />
                <DataListItem
                    label="Spiritus movens"
                    value={
                        <Text fontWeight="bold">
                            Roman Bębenek
                            <br />
                            <Text fontWeight="normal">
                                r.bebenek@czluchow.org.pl
                            </Text>
                        </Text>
                    }
                />
            </DataListRoot>
            <br />
            <Separator />
            <br />
            <Text>
                Program w czasie użytkowania będzie stale się rozwijał i
                udoskonal w celu zapewnienia prawidłowego funkcjonowania zgodnie
                z przepisami prawa.
            </Text>
            <br />
            <VStack alignItems="start" gap="1">
                <Text>Program ma na celu:</Text>
                <List.Root>
                    <List.Item>
                        Ułatwienie prowadzenia spraw i postępować
                        administracyjnych
                    </List.Item>
                    <List.Item>
                        Kontrolowanie terminów i wydawania rozstrzygnięć w
                        terminie
                    </List.Item>
                    <List.Item>Przyśpieszenie pracy wydziału BiA</List.Item>
                    <List.Item>
                        Zebranie wszystkich zarejestrowanych i prowadzonych
                        spraw administracyjnych w jednym systemie
                    </List.Item>
                    <List.Item>
                        Rozdzielenie spraw administracyjnych na wszystkich
                        użytkowników
                    </List.Item>
                    <List.Item>
                        Tworzenie automatycznych raportów i statystyk, m.in.:
                        B-05, B-06, GUNB-3
                    </List.Item>
                    <List.Item>
                        Wyszukiwanie uczestników procesu inwestycyjnego, działek
                        nieruchomości, rodzajów zamierzeń budowlanych, itd.
                    </List.Item>
                    <List.Item>
                        Ułatwienie koordynacji zlecań i planowanych zadań między
                        administratorem a użytkownikiem programu.
                    </List.Item>
                </List.Root>
            </VStack>
            <br />
            <VStack alignItems="start" gap="1">
                <Text>Program obsługuje następujące rejestry:</Text>
                <List.Root as="ol">
                    <List.Item>
                        <strong>670</strong> - Wyjaśnienia, interpretacje,
                        opinie, akty prawne dotyczące planowania i
                        zagospodarowania przestrzennego oraz sprawy budownictwa
                    </List.Item>
                    <List.Item>
                        <strong>705</strong> - Samodzielność lokali mieszkalnych
                    </List.Item>
                    <List.Item>
                        <strong>6740</strong> - Pozwolenia na budowę, przebudowę
                        i rozbudowę obiektów budowlanych oraz zmiany sposobu
                        użytkowania obiektów budowlanych lub ich części
                    </List.Item>
                    <List.Item>
                        <strong>6741</strong> - Rozbiórki obiektów budowlanych
                    </List.Item>
                    <List.Item>
                        <strong>6742</strong> - Zezwolenia na wejście w teren
                        sąsiedniej nieruchomości w celu wykonania niezbędnych
                        robót budowlanych
                    </List.Item>
                    <List.Item>
                        <strong>6743.1</strong> - Zgłoszenie rozbiórki obiektów
                        budowlanych
                    </List.Item>
                    <List.Item>
                        <strong>6743.2</strong> - Zgłoszenie budowy lub
                        wykonywania innych robót budowlanych (zwykłe)
                    </List.Item>
                    <List.Item>
                        <strong>6743.3</strong> - Zgłoszenie zmiany sposobu
                        użytkowania obiektu budowlanego lub jego części
                    </List.Item>
                    <List.Item>
                        <strong>6743.4</strong> - Zgłoszenia robót budowlanych
                        wymagające projektu budowlanego (BiP)
                    </List.Item>
                    <List.Item>
                        <strong>6743.5</strong> - Zgłoszenia robót budowlanych
                        tymczasowych obiektów budowlanych (Zgodnie z §1 pkt 1
                        Zarządzenia Starosty Człuchowskiego Nr 6/2022 z dnia 18
                        lutego 2022r.)
                    </List.Item>
                    <List.Item>
                        <strong>7012</strong> - Przygotowania i realizacji
                        inwestycji w zakresie dróg publicznych (ZRID)
                    </List.Item>
                    <List.Item>
                        <strong>Dz.Bud</strong> - Wydawanie rejestru dziennika
                        budowy - Art. 47g Ustawy z dnia 7 lipca 1994 r. Prawo
                        budowlane
                    </List.Item>
                    <List.Item>
                        <strong>Rejestry uzupełniające:</strong>
                        <List.Root ps="5">
                            <List.Item>
                                Zmiana do Pozwolenia na budowę -{" "}
                                <strong>Art. 36a</strong> Ustawy z dnia 7 lipca
                                1994 r. Prawo budowlane
                            </List.Item>
                            <List.Item>
                                Przeniesienie decyzji PnB -{" "}
                                <strong>Art. 40</strong> Ustawy z dnia 7 lipca
                                1994 r. Prawo budowlane
                            </List.Item>
                            <List.Item>
                                Zmiana Pn rozbiórkę - <strong>Art. 155</strong>{" "}
                                Kodeksu postępowania administracyjnego
                            </List.Item>
                            <List.Item>
                                Wydanie decyzji o wyłączeniu stosowania
                                przepisów art. <strong>45a ust. 1</strong>{" "}
                                ustawy Prawo budowlane
                            </List.Item>
                            <List.Item>
                                Zmiana Zgłoszenia BiP -{" "}
                                <strong>Art. 36a ust. 1</strong> ustawy z dnia 7
                                lipca 1994 r. Prawo budowlane
                            </List.Item>
                        </List.Root>
                    </List.Item>
                    <List.Item>
                        <strong>Rejestry wewnętrzne ogólne</strong>
                        <List.Root ps="5">
                            <List.Item>
                                <strong>4121</strong> - Współdziałanie z
                                wojewódzkim konserwatorem zabytków i
                                otrzymywanie informacji z rejestrów zabytków
                            </List.Item>
                            <List.Item>
                                <strong>673</strong> - Lokalizacja inwestycji
                            </List.Item>
                            <List.Item>
                                Pisma z Powiatowego Inspektoratu Nadzoru
                                Budowlanego
                            </List.Item>
                        </List.Root>
                    </List.Item>
                </List.Root>
            </VStack>
        </Box>
    );
}
