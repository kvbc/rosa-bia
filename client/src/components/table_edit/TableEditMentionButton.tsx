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
        <DialogRoot size="xl">
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
                <DialogBody>{children}</DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};
