import { Stack, Typography } from "@mui/joy";
import { FallbackProps } from "react-error-boundary";
import React from "react";

export default function AppErrorFallback(props: FallbackProps) {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
        >
            <Typography color="danger" level="title-lg">
                Unexpected rendering error
            </Typography>
            <Typography level="body-md">{props.error}</Typography>
        </Stack>
    );
}
