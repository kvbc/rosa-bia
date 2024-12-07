import {
    Box,
    Heading,
    HStack,
    Separator,
    StackSeparator,
} from "@chakra-ui/react";
import PageRegisters from "@/pages/registers/PageRegisters";
import InfoBoard from "./InfoBoard";
import React, { useMemo } from "react";
import useAuthEmployee from "@/hooks/useAuthEmployee";
import { Filter } from "@server/http/routes/table_rows/get";
import { EmptyState } from "@/components/ui/empty-state";
import { LuEyeOff } from "react-icons/lu";

export default function PageHome() {
    const authEmployee = useAuthEmployee();

    const authEmployeeID: number | undefined =
        authEmployee.query.data?.employee?.id;

    const registersFilters = useMemo<Filter[]>(
        () =>
            authEmployeeID === undefined
                ? []
                : [
                      {
                          key: "assigned_employee_id",
                          //   operator: "=",
                          //   value: String(authEmployeeID),
                          filters: [
                              {
                                  key: "id",
                                  operator: "=",
                                  value: String(authEmployeeID),
                              },
                          ],
                      },
                  ],
        [authEmployeeID]
    );

    return (
        <HStack align="stretch" height="full" separator={<StackSeparator />}>
            <Box width="9/12">
                <Heading>Przydzielone rejestry</Heading>
                <Separator />
                <br />
                {authEmployeeID === undefined ? (
                    <EmptyState
                        icon={<LuEyeOff />}
                        title="Brak danych"
                        description="Zaloguj się, aby zobaczyć przydzielone ci rejestry"
                    />
                ) : (
                    <PageRegisters
                        registersFilters={registersFilters}
                        disableRegisterAdding
                    />
                )}
            </Box>
            <InfoBoard />
        </HStack>
    );
}
