import { getDateNow } from "@/utils/time";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { AppNavbarLink } from "./navbar/AppNavbarLink";
import { LuMaximize, LuMinimize } from "react-icons/lu";
import { useFullscreen } from "@/hooks/useFullscreen";
import { Tooltip } from "@/components/ui/tooltip";

export const AppFooter: React.FC = () => {
    const [dateString, setDateString] = useState<string>("");
    const { isFullscreen, setIsFullscreen } = useFullscreen();

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

    const handleFullscreenButtonClicked = useCallback(() => {
        setIsFullscreen(!isFullscreen);
    }, [setIsFullscreen, isFullscreen]);

    return (
        <HStack
            width="full"
            backgroundColor="blue.700"
            color="blue.100"
            position="sticky"
            as="footer"
            bottom="0px"
            fontSize="xs"
            padding="1"
            zIndex={50000}
            justifyContent="space-between"
        >
            <AppNavbarLink to="/help/program_info" color="blue.100">
                R.O.S.A. BiA
            </AppNavbarLink>
            <HStack>
                <Text>{dateString}</Text>
                <Tooltip
                    content={
                        isFullscreen
                            ? "Zminimalizuj widok"
                            : "Zmaksymalizuj widok"
                    }
                >
                    <IconButton
                        size="2xs"
                        variant="plain"
                        color="white"
                        onClick={handleFullscreenButtonClicked}
                    >
                        {isFullscreen ? <LuMinimize /> : <LuMaximize />}
                    </IconButton>
                </Tooltip>
            </HStack>
        </HStack>
    );
};
