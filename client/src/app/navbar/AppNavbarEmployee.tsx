import React from "react";
import useAuthEmployee from "../../hooks/useAuthEmployee";
import {
    AvatarFallback,
    AvatarRoot,
    Badge,
    ColorPalette,
    Float,
    HStack,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Button } from "../../components/ui/button";
import { DialogTrigger } from "../../components/ui/dialog";
import { Tooltip } from "../../components/ui/tooltip";
import { Skeleton, SkeletonCircle } from "../../components/ui/skeleton";

export const AppNavbarEmployee: React.FC = () => {
    const { query: employeeQuery, logout: employeeLogout } = useAuthEmployee();
    const colorPalettes: ColorPalette[] = [
        "red",
        "orange",
        "yellow",
        "green",
        "teal",
        "blue",
        "cyan",
        "purple",
        "pink",
    ];

    const employee = employeeQuery.data?.employee;
    const displayEmployee = employee ?? {
        admin: false,
        name: "This is a very long username",
    };

    let avatarFallback = "";
    const nameWords = displayEmployee.name.split(" ");
    if (nameWords.length >= 2) {
        avatarFallback = nameWords[0][0] + nameWords[1][0];
    } else {
        avatarFallback = displayEmployee.name[0] + displayEmployee.name[1];
    }

    return (
        <HStack width="full" justify="end">
            <Skeleton loading={!employeeQuery.isFetched}>
                {employee ? (
                    <VStack gap="0.5" align="end">
                        <Text fontSize="sm" fontWeight="medium">
                            {displayEmployee.name}
                        </Text>
                        <Badge
                            size="xs"
                            colorPalette={
                                displayEmployee.admin ? "red" : "gray"
                            }
                        >
                            {displayEmployee.admin
                                ? "Administrator"
                                : "Użytkownik"}
                        </Badge>
                    </VStack>
                ) : (
                    <DialogTrigger asChild>
                        <Button
                            variant="plain"
                            size="sm"
                            color="white"
                            fontSize="inherit"
                            bg="blue.800"
                            _hover={{
                                bg: "blue.900",
                            }}
                        >
                            <Icon fontSize="sm">
                                <LuLogIn />
                            </Icon>
                            Zaloguj się
                        </Button>
                    </DialogTrigger>
                )}
            </Skeleton>
            <SkeletonCircle
                loading={!employeeQuery.isFetched}
                size={!employeeQuery.isFetched ? "10" : ""}
            >
                {employee && (
                    <AvatarRoot
                        colorPalette={
                            colorPalettes[
                                displayEmployee.name.charCodeAt(0) %
                                    colorPalettes.length
                            ]
                        }
                    >
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                        <Tooltip
                            content="Wyloguj"
                            // positioning={{ placement: "left" }}
                        >
                            <Float
                                placement="bottom-end"
                                offsetX="1"
                                offsetY="1"
                            >
                                <Button onClick={employeeLogout} bg="none">
                                    <Icon
                                        color="white"
                                        bg="blue.700"
                                        fontSize="sm"
                                        outline="1px solid"
                                        outlineColor="blue.700"
                                    >
                                        <LuLogOut />
                                    </Icon>
                                </Button>
                            </Float>
                        </Tooltip>
                    </AvatarRoot>
                )}
            </SkeletonCircle>
        </HStack>
    );
};
