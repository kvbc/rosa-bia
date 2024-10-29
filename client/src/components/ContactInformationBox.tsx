//
// Contact.tsx
// Component showing contant informaction
//

import { Link, Stack, Typography } from "@mui/joy";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

export const ContactInformationBox: React.FC = () => {
    return (
        <Stack
            sx={(theme) => ({
                backgroundColor: theme.vars.palette.background.level1,
                padding: "1rem",
            })}
        >
            <Typography level="title-lg">Kontakt</Typography>
            <Stack direction="row" spacing={1}>
                <Typography
                    level="body-md"
                    startDecorator={<CallIcon fontSize="small" />}
                >
                    Telefon:
                </Typography>
                <Link href="tel:+48666017902">666 017 902</Link>{" "}
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography
                    level="body-md"
                    startDecorator={<MailIcon fontSize="small" />}
                    sx={{ alignItems: "center" }}
                >
                    Adres e-mail:
                </Typography>
                <Link href="mailto:mateusz.les222@gmail.com">
                    mateusz.les222@gmail.com
                </Link>
            </Stack>
        </Stack>
    );
};
