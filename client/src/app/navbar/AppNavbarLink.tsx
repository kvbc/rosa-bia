import { Link, Stack } from "@chakra-ui/react";
import React, { ComponentProps } from "react";
import { Link as ReactLink } from "react-router-dom";

export const AppNavbarLink: React.FC<
    ComponentProps<typeof ReactLink> & ComponentProps<typeof Link>
> = (props: ComponentProps<typeof ReactLink> & ComponentProps<typeof Link>) => {
    return (
        <Link
            as={ReactLink}
            _hover={{
                textDecoration: "underline",
                textDecorationColor: "inherit",
            }}
            color="inherit"
            {...props}
        >
            <Stack align="center" gap="0.5">
                {props.children}
            </Stack>
        </Link>
    );
};
