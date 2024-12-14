import React, { useCallback, useState } from "react";
import { Float, HStack, Icon, IconButton } from "@chakra-ui/react";
import RegisterDataTableEdit from "./table_app_data/RegisterDataTableEdit";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { Tooltip } from "@/components/ui/tooltip";
import { LuArrowDown } from "react-icons/lu";
import RegisterConstructionJournalTableEdit from "./table_construction_journal/RegisterConstructionJournalTableEdit";
import RegisterConstructionIntentTableEdit from "./table_construction_intent/RegisterConstructionIntentTableEdit";
import RegisterAdminProceduresTableEdit from "./table_admin_procedures/RegisterAdminProceduresTableEdit";
import { ClientRegister } from "./PageRegisters";

export function RegisterTableEditRowContentBodyNormal(
    props: TableEditRowContentComponentProps<ClientRegister>
) {
    const { row } = props;

    const [showMore, setShowMore] = useState(false);

    const handleShowMoreButtonClicked = useCallback(() => {
        setShowMore((showMore) => !showMore);
    }, []);

    return (
        <HStack direction="row" alignItems="start" gap="0">
            <RegisterDataTableEdit
                {...props}
                showMore={showMore}
                customIndentLevel={2}
            >
                {row.type !== "Dz. bud" && (
                    <Float
                        placement="bottom-start"
                        // offsetX="2"
                        // offset="1"
                        // offsetX="-1"
                        // offsetY="1"
                        width="full"
                        zIndex={100}
                    >
                        <Tooltip
                            content={showMore ? "Pokaż mniej" : "Pokaż więcej"}
                        >
                            <IconButton
                                size="2xs"
                                minWidth="0 !important"
                                width="20px !important"
                                height="20px !important"
                                opacity="90%"
                                onClick={handleShowMoreButtonClicked}
                            >
                                <Icon
                                    fontSize="8px"
                                    transition="transform"
                                    transform={
                                        showMore
                                            ? "rotate(180deg)"
                                            : "rotate(0.1deg)"
                                    }
                                >
                                    <LuArrowDown />
                                </Icon>
                            </IconButton>
                        </Tooltip>
                    </Float>
                )}
            </RegisterDataTableEdit>
            {row.type === "Dz. bud" && (
                <RegisterConstructionJournalTableEdit
                    customIndentLevel={4}
                    {...props}
                />
            )}
            {row.type !== "Dz. bud" && (
                <>
                    {row.type !== "Uzupełniający" && (
                        <RegisterConstructionIntentTableEdit
                            showMore={showMore}
                            customIndentLevel={4}
                            {...props}
                        />
                    )}
                    <RegisterAdminProceduresTableEdit
                        showMore={showMore}
                        customIndentLevel={6}
                        {...props}
                    />
                </>
            )}
        </HStack>
    );
}
