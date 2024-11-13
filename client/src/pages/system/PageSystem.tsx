import {
    Heading,
    Highlight,
    HStack,
    Link,
    List,
    Separator,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import {
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineItem,
    TimelineRoot,
    TimelineTitle,
} from "@/components/ui/timeline";
import {
    LuCalendar,
    LuCpu,
    LuHistory,
    LuInfo,
    LuPlusCircle,
    LuTag,
} from "react-icons/lu";
import {
    FaBolt,
    FaCode,
    FaDatabase,
    FaDocker,
    FaKey,
    FaLayerGroup,
    FaNetworkWired,
    FaPalette,
    FaPlug,
    FaReact,
    FaServer,
} from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { FaShieldAlt, FaSyncAlt } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";

export function PageSystem() {
    const versions = useMemo(() => {
        type Entry = {
            label: string;
            date: Date;
            description: string;
        };

        const array: Entry[] = [
            {
                label: "v0.2 Alpha",
                date: new Date("2025-01-07"),
                description: "Pierwsza wersja próbna",
            },
            {
                label: "v0.1 Pre-alpha",
                date: new Date("2024-09-17"),
                description: "Początek projektu",
            },
        ];

        for (let i = 0; i < array.length; i++) {
            const entry = array[i];
            if (Date.now() >= entry.date.getTime()) {
                array.splice(i, 0, {
                    label: entry.label,
                    date: new Date(Date.now()),
                    description: "Aktualna wersja",
                });
                break;
            }
        }

        return array;
    }, []);
    const currentVersion = useMemo(
        () => versions.find((version) => version.date.getTime() === Date.now()),
        [versions]
    );

    const technologies = useMemo<
        { Icon: IconType; label: string; link: string; brief: string }[]
    >(
        () => [
            {
                Icon: FaReact,
                label: "React",
                link: "https://react.dev/",
                brief: "Biblioteka do budowania interfejsów użytkownika poprzez komponowanie złożonych aplikacji z prostych, wielokrotnego użytku komponentów.",
            },
            {
                Icon: FaPalette,
                label: "Chakra UI",
                link: "https://www.chakra-ui.com/",
                brief: "Biblioteka komponentów React, która ułatwia tworzenie nowoczesnych, dostępnych i responsywnych interfejsów użytkownika z wykorzystaniem prostych w użyciu komponentów.",
            },
            {
                Icon: FaSyncAlt,
                label: "Tanstack Query",
                link: "https://tanstack.com/query/latest",
                brief: "Biblioteka do zarządzania danymi w aplikacjach React, która upraszcza pobieranie, cachowanie i synchronizowanie danych z serwera (dawniej React Query).",
            },
            {
                Icon: FaCode,
                label: "Typescript",
                link: "https://www.typescriptlang.org/",
                brief: "Nadzbiór JavaScript, który dodaje statyczne typowanie i inne funkcje, poprawiając bezpieczeństwo i czytelność kodu.",
            },
            {
                Icon: FaBolt,
                label: "Vite",
                link: "https://vite.dev/",
                brief: "Narzędzie do budowania aplikacji webowych, które zapewnia szybki proces kompilacji i obsługę modułów JavaScript w czasie rzeczywistym, opierając się na nowoczesnych technologiach.",
            },
            {
                Icon: FaLayerGroup,
                label: "Zustand",
                link: "https://zustand-demo.pmnd.rs/",
                brief: "Lekka biblioteka do zarządzania stanem w aplikacjach React, oferująca prosty i efektywny sposób przechowywania i aktualizowania danych.",
            },
            {
                Icon: FaShieldAlt,
                label: "Zod",
                link: "https://zod.dev/",
                brief: "Biblioteka do walidacji danych, umożliwiająca deklaratywne definiowanie schematów walidacji z pełnym wsparciem dla typów.",
            },
            {
                Icon: FaNetworkWired,
                label: "Axios",
                link: "https://axios-http.com/",
                brief: "Biblioteka do wykonywania asynchronicznych zapytań HTTP.",
            },
            {
                Icon: FaServer,
                label: "Express",
                link: "https://expressjs.com/",
                brief: "Minimalistyczny framework dla Node.js, który ułatwia tworzenie serwerów i aplikacji webowych poprzez prostą obsługę routingu i middleware.",
            },
            {
                Icon: FaPlug,
                label: "WebSocket",
                link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
                brief: "Protokół komunikacji sieciowej umożliwiający dwukierunkową, stałą i pełnodupleksową wymianę danych pomiędzy klientem a serwerem w czasie rzeczywistym.",
            },
            {
                Icon: FaDatabase,
                label: "SQLite",
                link: "https://www.sqlite.org/",
                brief: "Lekka, wbudowana baza danych SQL, która przechowuje dane w jednym pliku, idealna do aplikacji mobilnych i małych projektów.",
            },
            {
                Icon: FaKey,
                label: "JWT",
                link: "https://jwt.io/",
                brief: "Standard tokenów służący do bezpiecznego przekazywania informacji pomiędzy stronami w formie zaszyfrowanych, podpisanych danych.",
            },
            {
                Icon: FaDocker,
                label: "Docker",
                link: "https://www.docker.com/",
                brief: "Platforma do tworzenia, wdrażania i uruchamiania aplikacji w kontenerach, które izolują środowisko wykonawcze, zapewniając przenośność i skalowalność.",
            },
        ],
        []
    );

    return (
        <Stack>
            <Heading size="md">
                <HStack>
                    <LuInfo />
                    Informacje systemowe
                </HStack>
            </Heading>
            <Separator />
            <DataListRoot>
                <DataListItem label="Wersja" value={currentVersion?.label} />
            </DataListRoot>
            <br />

            <Heading size="md">
                <HStack>
                    <LuPlusCircle />
                    Funkcje do dodania
                </HStack>
            </Heading>
            <Separator />
            <List.Root fontSize="sm">
                <List.Item>
                    System zarządzania bazą danych (przywracanie, tworzenie i
                    usuwanie kopii)
                </List.Item>
                <List.Item>
                    Skrypt przenoszący dane z excela do bazy danych
                </List.Item>
                <List.Item>
                    <Highlight
                        query="Generatory statystyk"
                        styles={{
                            px: "0.5",
                            bg: "orange.subtle",
                            color: "orange.fg",
                        }}
                    >
                        Generatory statystyk
                    </Highlight>
                </List.Item>
                <List.Item>
                    <Highlight
                        query="Filtry"
                        styles={{
                            px: "0.5",
                            bg: "orange.subtle",
                            color: "orange.fg",
                        }}
                    >
                        Filtry 😱
                    </Highlight>
                </List.Item>
            </List.Root>
            <br />

            <Heading size="md">
                <HStack>
                    <LuHistory />
                    Dziennik zmian
                </HStack>
            </Heading>
            <Separator />
            <TimelineRoot>
                {versions.map((version) => (
                    <TimelineItem key={version.date.toString()}>
                        <TimelineConnector
                            backgroundColor={
                                version === currentVersion ? "fg.info" : "black"
                            }
                        >
                            {version === currentVersion ? (
                                <LuCalendar />
                            ) : (
                                <LuTag />
                            )}
                        </TimelineConnector>
                        <TimelineContent>
                            <TimelineTitle>{version.label}</TimelineTitle>
                            <TimelineDescription>
                                {version.date.toLocaleDateString(undefined, {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </TimelineDescription>
                            <Text textStyle="sm">{version.description}</Text>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </TimelineRoot>
            {/* <br /> */}

            <Heading size="md">
                <HStack>
                    <LuCpu />
                    Użyte technologie
                </HStack>
            </Heading>
            <Separator />
            <SimpleGrid columns={4} fontSize="sm">
                {technologies.map((tech) => (
                    <Tooltip content={tech.brief} key={tech.label}>
                        <HStack>
                            {<tech.Icon />}
                            <Link href={tech.link} target="_blank">
                                {tech.label}
                            </Link>
                        </HStack>
                    </Tooltip>
                ))}
            </SimpleGrid>
        </Stack>
    );
}
