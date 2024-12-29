import { Button } from "@chakra-ui/react";
import { ClientRegister } from "../PageRegisters";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BIPTableGenerator } from "./BIPTableGenerator";

export const BIPTableGenerateDialog: React.FC<{ row: ClientRegister }> = ({
    row,
}) => {
    return (
        <DialogRoot size="cover">
            <DialogTrigger asChild>
                <Button size="2xs" fontSize="inherit">
                    Generuj tabelkę BIP
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogCloseTrigger />
                <DialogHeader>
                    <DialogTitle>Generator tabelki BIP</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <BIPTableGenerator row={row} />
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};
