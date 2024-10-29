//
// AppNavbar.tsx
// Application navigation bar
//

import { Divider, Stack } from "@mui/joy";
import React from "react";
import { AppNavbarLinks } from "./AppNavbarLinks";
import { AppNavbarProfile } from "./AppNavbarProfile";

// TODO: make it so u can pass in password (mui modal)
export const AppNavbar: React.FC = () => {
    // <nav className="w-full flex flex-row p-2 bg-blue-600 text-white font-semibold text-xs">
    const divider = (
        <Divider
            orientation="vertical"
            sx={(theme) => ({
                backgroundColor: theme.palette.primary[600],
            })}
        />
    );

    return (
        <Stack
            component="nav"
            direction="row"
            sx={(theme) => ({
                backgroundColor: theme.palette.primary[500],
                padding: "0.5rem",
                fontSize: theme.fontSize.xs,
            })}
            spacing={1}
        >
            <img src="logo.svg" width={24} />
            {divider}
            <AppNavbarLinks divider={divider} />
            <AppNavbarProfile />
        </Stack>
    );
};
