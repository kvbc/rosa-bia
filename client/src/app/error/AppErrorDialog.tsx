import React from "react";
import { AppError } from "../App";
import { ContactInformationBox } from "@/components/ContactInformationBox";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@/components/ui/dialog";
import { Code, Table } from "@chakra-ui/react";

export const AppErrorDialog: React.FC<{
    error: AppError | null;
    onClose: () => void;
}> = ({ error, onClose }) => {
    return (
        <DialogRoot
            lazyMount
            open={error !== null}
            onOpenChange={(e) => !e.open && onClose()}
            size="cover"
            placement="center"
            motionPreset="slide-in-bottom"
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle fontSize="xl" color="red">
                        Błąd
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Table.Root variant="outline" showColumnBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>URL</Table.ColumnHeader>
                                <Table.ColumnHeader>Opis</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Szczegóły
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Code colorPalette="gray">
                                        {error?.url}
                                    </Code>
                                </Table.Cell>
                                <Table.Cell color="gray.500">
                                    &quot;{error?.brief}&quot;
                                </Table.Cell>
                                <Table.Cell colorPalette="red">
                                    <Code>{error?.details}</Code>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                </DialogBody>
                <DialogCloseTrigger />
                <DialogFooter>
                    <ContactInformationBox />
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};
