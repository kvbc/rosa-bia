import React from "react";
import { AppError } from "../App";
import { Modal, ModalClose, ModalDialog, Table, Typography } from "@mui/joy";
import { ContactInformationBox } from "../../components/ContactInformationBox";

export const AppErrorModal: React.FC<{
    error: AppError | null;
    onClose: () => void;
}> = ({ error, onClose }) => {
    return (
        <Modal open={error !== null} onClose={onClose}>
            <ModalDialog>
                <ModalClose />
                <Typography level="title-lg">Błąd</Typography>
                <Table
                    sx={(theme) => ({
                        "& th": {
                            scope: "row",
                            width: "20%",
                            backgroundColor: theme.palette.background.level1,
                        },
                        backgroundColor: theme.palette.background.level1,
                    })}
                >
                    <tbody>
                        <tr>
                            <th>URL</th>
                            <td>
                                <code>{error?.url}</code>
                            </td>
                        </tr>
                        <tr>
                            <th>Opis</th>
                            <td>{error?.brief}</td>
                        </tr>
                        <tr>
                            <th>Detale</th>
                            <td>
                                <code>{error?.details}</code>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <ContactInformationBox />
            </ModalDialog>
        </Modal>
    );
};
