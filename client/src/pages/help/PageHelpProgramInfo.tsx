import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { REGISTER_TYPE_DESCRIPTIONS } from "@/constants/registers";
import {
    Box,
    Heading,
    Link,
    List,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";
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
                                <strong>R</strong>ejestr <strong>O</strong>
                                gólnych <strong>S</strong>praw{" "}
                                <strong>A</strong>dministracyjnych wydziału{" "}
                                <strong>B</strong>udownictwa <strong>i</strong>{" "}
                                <strong>A</strong>rchitektury
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
                                <Link href="mailto:r.bebenek@czluchow.org.pl">
                                    r.bebenek@czluchow.org.pl
                                </Link>
                            </Text>
                        </Text>
                    }
                />
            </DataListRoot>
            <br />
            <Separator />
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
                        Tworzenie automatycznych raportów i statystyk, m.in.:{" "}
                        <strong>B-05</strong>, <strong>B-06</strong>,{" "}
                        <strong>GUNB-3</strong>
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
                <Text>Dodatkowe pomocne funkcje:</Text>
                <List.Root>
                    <List.Item>
                        możliwość wydruku tabelarycznego zbiorczego z danego
                        rejestru, (Dane wniosku, dane inwestora, zamierzenie
                        budowlane, informacja o postępowaniu),
                    </List.Item>
                    <List.Item>
                        informacja o nadchodzących terminach w danym
                        postępowaniu,
                    </List.Item>
                    <List.Item>
                        kalendarz z możliwością zapisywania nadchodzących
                        zdarzeń dla użytkownika,
                    </List.Item>
                    <List.Item>
                        wyszukiwanie z pojedynczego lub dla całego zbioru
                        rejestrów, informacji o:: inwestorze, nr działki,
                        zamierzeniu budowlanym,
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
                        <strong>6740</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["PnB (6740)"]}
                    </List.Item>
                    <List.Item>
                        <strong>6741</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["PnRozb. (6741)"]}
                    </List.Item>
                    <List.Item>
                        <strong>6742</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["Wejście na dz. sąsiednią"]}
                    </List.Item>
                    <List.Item>
                        <strong>6743.1</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["Zg. Rozb. (6743.1)"]}
                    </List.Item>
                    <List.Item>
                        <strong>6743.2</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["Zg. Zwykłe (6743.2)"]}
                    </List.Item>
                    <List.Item>
                        <strong>6743.3</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["Zm. Sp. Użytk. (6743.3)"]}
                    </List.Item>
                    <List.Item>
                        <strong>6743.4</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["BiP (6743.4)"]}
                    </List.Item>
                    <List.Item>
                        <strong>6743.5</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["Tymczasowe (6743.5)"]}
                    </List.Item>
                    <List.Item>
                        <strong>7012</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["ZRiD (7012)"]}
                    </List.Item>
                    <List.Item>
                        <strong>Dz.Bud</strong> -{" "}
                        {REGISTER_TYPE_DESCRIPTIONS["Dz. bud"]}
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
                                <strong>4121</strong> -{" "}
                                {
                                    REGISTER_TYPE_DESCRIPTIONS[
                                        "Konserwator (Inne)"
                                    ]
                                }
                            </List.Item>
                            <List.Item>
                                <strong>673</strong> -{" "}
                                {
                                    REGISTER_TYPE_DESCRIPTIONS[
                                        "Lokalizacja inwestycji (Inne)"
                                    ]
                                }
                            </List.Item>
                            <List.Item>
                                Pisma z Powiatowego Inspektoratu Nadzoru
                                Budowlanego
                            </List.Item>
                        </List.Root>
                    </List.Item>
                </List.Root>
            </VStack>
            <br />
            <Text>
                Program w czasie użytkowania będzie stale się rozwijał i
                udoskonal w celu zapewnienia prawidłowego funkcjonowania zgodnie
                z przepisami prawa.
            </Text>
            <br />
        </Box>
    );
}
