//
// AppNavbar.tsx
// Application navigation bar
//

import React from "react";
import { AppNavbarLinks } from "./AppNavbarLinks";
import { AppNavbarEmployee } from "./AppNavbarEmployee";
import { HStack, Image, Link, StackSeparator } from "@chakra-ui/react";
import { AppNavbarEmployeeDialog } from "./AppNavbarEmployeeLoginDialog";

export const AppNavbar: React.FC = () => {
    return (
        <AppNavbarEmployeeDialog>
            <HStack
                as="nav"
                // position="sticky"
                // top="0"
                // zIndex={50}
                backgroundColor="blue.700"
                color="white"
                fontWeight="light"
                fontSize="xs"
                width="full"
                padding="2"
                separator={<StackSeparator borderColor="blue.800" />}
            >
                <Link
                    target="_blank"
                    href="https://www.starostwo.czluchow.org.pl/"
                >
                    <Image src="/logo.svg" height="32px" />
                </Link>
                <AppNavbarLinks />
                <AppNavbarEmployee />
            </HStack>
        </AppNavbarEmployeeDialog>
    );
};
