//
// Contact.tsx
// Component showing contant informaction
//

import React from "react";
import { Link, Separator, Stack, Text } from "@chakra-ui/react";
import { LuGithub, LuMail, LuPhoneCall, LuUser } from "react-icons/lu";
import { DataListItem, DataListRoot } from "./ui/data-list";

export const ContactInformationBox: React.FC = () => {
    return (
        <Stack gap="1" bg="gray.100" padding="2" rounded="md" width="full">
            <Text fontSize="lg" fontWeight="bold">
                Kontakt
            </Text>
            <Separator orientation="horizontal" />
            <DataListRoot orientation="horizontal" gap="1">
                {[
                    {
                        LabelIcon: LuUser,
                        labelText: "Twórca",
                        value: (
                            <Link
                                href="https://pl-pl.facebook.com/mateusz.lesniewski.3990"
                                target="_blank"
                                colorPalette="blue"
                                variant="underline"
                            >
                                Mateusz Leśniewski
                            </Link>
                        ),
                    },
                    {
                        LabelIcon: LuPhoneCall,
                        labelText: "Telefon",
                        value: (
                            <Link
                                href="tel:+48666017902"
                                colorPalette="blue"
                                variant="underline"
                            >
                                666 017 902
                            </Link>
                        ),
                    },
                    {
                        LabelIcon: LuMail,
                        labelText: "Adres e-mail",
                        value: (
                            <Link
                                href="mailto:mateusz.les222@gmail.com"
                                colorPalette="blue"
                                variant="underline"
                            >
                                mateusz.les222@gmail.com
                            </Link>
                        ),
                    },
                    {
                        LabelIcon: LuGithub,
                        labelText: "Github",
                        value: (
                            <Link
                                href="https://github.com/kvbc"
                                target="_blank"
                                colorPalette="blue"
                                variant="underline"
                            >
                                kvbc
                            </Link>
                        ),
                        info: "Inne projekty programistyczne",
                    },
                ].map((item) => (
                    <DataListItem
                        key={item.labelText}
                        colorPalette="blue"
                        info={item.info}
                        label={
                            <>
                                <item.LabelIcon fontSize="small" />
                                <Text>{item.labelText}</Text>
                            </>
                        }
                        value={item.value}
                    />
                ))}
            </DataListRoot>
        </Stack>
    );
};
