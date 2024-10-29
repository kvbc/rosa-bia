import React from "react";
import { AppError } from "../App";
import { IconButton, Snackbar, Stack, Typography } from "@mui/joy";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

export const AppErrorSnackbar: React.FC<{
    errors: AppError[];
    onClose: (error: AppError) => void;
    onOpen: (error: AppError) => void;
}> = ({ errors, onClose, onOpen }) => {
    return errors.map((error, errorIndex) => (
        <Snackbar
            key={errorIndex}
            open={true}
            color="danger"
            variant="solid"
            onClose={() => onClose(error)}
            autoHideDuration={3000}
            startDecorator={<ErrorIcon />}
            endDecorator={
                <IconButton
                    color="danger"
                    size="sm"
                    variant="solid"
                    onClick={() => onClose(error)}
                >
                    <CloseIcon />
                </IconButton>
            }
        >
            <Stack spacing={2} alignItems="start">
                {error.brief}
                <Typography
                    className="text-slate-300 text-xs"
                    component="button"
                    onClick={() => onOpen(error)}
                >
                    Pokaż więcej
                </Typography>
            </Stack>
        </Snackbar>
    ));
};
