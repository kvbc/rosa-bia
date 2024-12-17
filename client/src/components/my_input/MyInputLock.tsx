import { ComponentProps } from "react";
import { Center, Icon } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa6";
import { Button } from "../ui/button";

export const MyInputLock = ({
    onLockClicked,
    ...buttonProps
}: {
    onLockClicked?: () => void;
} & ComponentProps<typeof Button>) => {
    return (
        <Button
            backgroundColor="black"
            height="100% !important"
            opacity="10%"
            width="100% !important"
            alignSelf="stretch"
            flex="1"
            padding="0"
            margin="0"
            borderRadius="none"
            onClick={onLockClicked}
            {...buttonProps}
        >
            <Center>
                <Icon padding="1" color="white" size="md">
                    <FaLock />
                </Icon>
            </Center>
        </Button>
    );
};
