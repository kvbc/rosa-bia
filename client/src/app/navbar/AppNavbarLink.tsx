import { Link, Stack } from "@mui/joy";
import React, { ComponentProps } from "react";
import { Link as ReactLink } from "react-router-dom";

export const AppNavbarLink: React.FC<
    ComponentProps<typeof ReactLink> & ComponentProps<typeof Link>
> = (props) => {
    return (
        <>
            <Link
                component={ReactLink}
                sx={(theme) => ({
                    color: theme.palette.common.white,
                    fontSize: theme.fontSize.xs,
                    "& > *": {
                        fontSize: theme.fontSize.lg,
                    },
                    // "&:hover": {
                    //     textDecoration: "underline",
                    // },
                })}
                {...props}
            >
                <Stack
                    direction="row"
                    sx={(theme) => ({
                        alignItems: "center",
                        fontSize: theme.fontSize.sm,
                        gap: theme.spacing(0.25),
                    })}
                >
                    {props.children}
                </Stack>
            </Link>
        </>
    );
};
