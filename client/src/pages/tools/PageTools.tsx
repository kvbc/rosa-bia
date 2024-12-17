import { Heading, List } from "@chakra-ui/react";
import { AppNavbarLink } from "@/app/navbar/AppNavbarLink";

export function PageTools() {
    return (
        <>
            <Heading>Narzędzia</Heading>
            <List.Root>
                <List.Item>
                    <AppNavbarLink
                        to="https://cloudconvert.com/document-converter"
                        target="_blank"
                    >
                        Konwerter dokumentów
                    </AppNavbarLink>
                </List.Item>
            </List.Root>
        </>
    );
}
