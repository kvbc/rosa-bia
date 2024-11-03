//
// AppNavbar.tsx
// Application navigation bar
//

import React from "react";
import { AppNavbarLinks } from "./AppNavbarLinks";
import { AppNavbarEmployee } from "./AppNavbarEmployee";
import { HStack, Image, StackSeparator } from "@chakra-ui/react";
import { AppNavbarEmployeeDialog } from "./AppNavbarEmployeeLoginDialog";

export const AppNavbar: React.FC = () => {
    return (
        <AppNavbarEmployeeDialog>
            <HStack
                as="nav"
                backgroundColor="blue.700"
                color="white"
                fontWeight="light"
                fontSize="xs"
                padding="2"
                separator={<StackSeparator borderColor="blue.800" />}
            >
                <Image src="/logo.svg" height="32px" />
                <AppNavbarLinks />
                <AppNavbarEmployee />
            </HStack>
        </AppNavbarEmployeeDialog>
    );
};
