import React from "react";
import useAuthEmployee from "@/hooks/useAuthEmployee";
import { Badge, Float, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";

export const AppNavbarEmployee: React.FC = () => {
    const { query: employeeQuery, logout: employeeLogout } = useAuthEmployee();

    const employee = employeeQuery.data?.employee;
    const displayEmployee = employee ?? {
        admin: false,
        name: "This is a very long username",
    };

    return (
        <HStack justify="end" alignSelf="stretch" flexGrow="1">
            <Skeleton loading={!employeeQuery.isFetched}>
                {employee ? (
                    <VStack gap="0.5" align="end">
                        <Text fontSize="xs" fontWeight="medium">
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
                    <EmployeeAvatar fullName={displayEmployee.name}>
                        <Tooltip
                            content="Wyloguj"
                            // positioning={{ placement: "left" }}
                        >
                            <Float
                                placement="bottom-end"
                                offsetX="1"
                                offsetY="1"
                            >
                                <Icon
                                    color="white"
                                    bg="blue.700"
                                    fontSize="sm"
                                    outline="1px solid"
                                    outlineColor="blue.700"
                                    onClick={employeeLogout}
                                    cursor="pointer"
                                >
                                    <LuLogOut />
                                </Icon>
                            </Float>
                        </Tooltip>
                    </EmployeeAvatar>
                )}
            </SkeletonCircle>
        </HStack>
    );
};
