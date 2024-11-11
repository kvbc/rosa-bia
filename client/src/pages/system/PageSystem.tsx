import {
    Heading,
    HStack,
    List,
    Separator,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import {
    TimelineConnector,
    TimelineContent,
    TimelineDescription,
    TimelineItem,
    TimelineRoot,
    TimelineTitle,
} from "../../components/ui/timeline";
import {
    LuCalendar,
    LuHistory,
    LuInfo,
    LuPlusCircle,
    LuTag,
} from "react-icons/lu";

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
                date: new Date("2025-01-01"),
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
            if (Date.now() > entry.date.getTime()) {
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
    const currentVersion = versions.find(
        (version) => version.date.getTime() === Date.now()
    );

    return (
        <Stack>
            <Heading size="sm">
                <HStack>
                    <LuInfo />
                    Informacje systemowe
                </HStack>
            </Heading>
            <DataListRoot>
                <DataListItem label="Wersja" value={currentVersion?.label} />
            </DataListRoot>
            <Separator />
            <Heading size="sm">
                <HStack>
                    <LuPlusCircle />
                    Funkcje do dodania
                </HStack>
            </Heading>
            <List.Root fontSize="sm">
                <List.Item>
                    System zarządzania bazą danych (przywracanie, tworzenie i
                    usuwanie kopii),
                </List.Item>
                <List.Item>
                    Skrypt przenoszący dane z excela do bazy danych,
                </List.Item>
                <List.Item>Generatory statystyk</List.Item>
            </List.Root>
            <Separator />
            <Heading size="sm">
                <HStack>
                    <LuHistory />
                    Dziennik zmian
                </HStack>
            </Heading>
            <TimelineRoot>
                {versions.map((version) => (
                    <TimelineItem key={version.label}>
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
        </Stack>
    );
}
