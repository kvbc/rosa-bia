import { getDateNow } from "@/utils/time";
import { HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AppNavbarLink } from "./navbar/AppNavbarLink";

export const AppFooter: React.FC = () => {
    const [dateString, setDateString] = useState<string>("");

    useEffect(() => {
        const id = setInterval(() => {
            setDateString(
                getDateNow().toLocaleString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    weekday: "long",
                })
            );
        }, 1000); // update every second
        return () => {
            clearInterval(id);
        };
    }, []);

    return (
        <HStack
            width="full"
            backgroundColor="blue.700"
            color="blue.100"
            fontSize="xs"
            padding="1"
            justifyContent="space-between"
        >
            <AppNavbarLink to="/help/program_info" color="blue.100">
                R.O.S.A. BiA
            </AppNavbarLink>
            <Text>{dateString}</Text>
        </HStack>
    );
};
