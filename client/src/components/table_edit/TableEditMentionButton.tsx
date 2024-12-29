import { Float, Icon, IconButton, Text } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { FaCommentDots } from "react-icons/fa6";
import { ComponentProps } from "react";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { MyTableContext } from "@/contexts/components/MyTableContext";
import TableEditContext from "@/contexts/components/TableEditContext";

export const TableEditMentionButton = ({
    children,
    subtitle,
    offset,
    ...iconProps
}: ComponentProps<typeof Icon> & { subtitle: string; offset?: boolean }) => {
    let icon = (
        <Icon size="xs" {...iconProps}>
            <FaCommentDots />
        </Icon>
    );

    if (offset) {
        icon = (
            <Float placement="top-start" offset="1">
                {icon}
            </Float>
        );
    }

    return (
        <DialogRoot
            size="xl"
            closeOnInteractOutside={false} // some weird bugs without this
        >
            <DialogTrigger asChild>
                <IconButton variant="plain" size="2xs">
                    <Tooltip content="Wzmianki">{icon}</Tooltip>
                </IconButton>
            </DialogTrigger>
            <DialogContent>
                <DialogCloseTrigger />
                <DialogHeader>
                    <DialogTitle>Wzmianki</DialogTitle>
                    <Text color="gray">{subtitle}</Text>
                </DialogHeader>
                <DialogBody>
                    <MyTableContext.Provider value={0}>
                        <TableEditContext.Provider value={null}>
                            {children}
                        </TableEditContext.Provider>
                    </MyTableContext.Provider>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};
