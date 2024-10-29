import { Stack, Typography } from "@mui/joy";
import { FallbackProps } from "react-error-boundary";
import React from "react";
import { ContactInformationBox } from "../../components/ContactInformationBox";

export const AppErrorFallback: React.FC<FallbackProps> = (
    props: FallbackProps
) => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
            spacing={1}
        >
            <Typography color="danger" level="title-lg">
                Błąd Krytyczny
            </Typography>
            <Typography level="body-sm">&quot;{props.error}&quot;</Typography>
            <ContactInformationBox />
        </Stack>
    );
};
