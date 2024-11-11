import RegisterDataTableEdit from "./table_app_data/RegisterDataTableEdit";
import { DB } from "../../../../server/src/db/types";
import React, { useCallback, useState } from "react";
import { MyTableCell } from "../../components/my_table/MyTableCell";
import { TableEditRowContentComponentProps } from "../../components/table_edit/row/TableEditRowContentComponent";
import { MyTable } from "../../components/my_table/MyTable";
import { MyTableRow } from "../../components/my_table/MyTableRow";
import { Float, HStack, Icon, IconButton } from "@chakra-ui/react";
import { LuArrowDown } from "react-icons/lu";
import { Tooltip } from "../../components/ui/tooltip";
import RegisterConstructionJournalTableEdit from "./table_construction_journal/RegisterConstructionJournalTableEdit";
import RegisterConstructionIntentTableEdit from "./table_construction_intent/RegisterConstructionIntentTableEdit";
import RegisterAdminProceduresTableEdit from "./table_admin_procedures/RegisterAdminProceduresTableEdit";
import { MyTableHeaderRow } from "../../components/my_table/MyTableHeaderRow";

export default function RegisterTableEditRowContent(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
) {
    const { row, inputs } = props;

    const [showMore, setShowMore] = useState(false);

    const handleShowMoreButtonClicked = useCallback(() => {
        setShowMore((showMore) => !showMore);
    }, []);

    return (
        <>
            {/* <MyTable
                myHeaders={[
                    <MyTableHeader key="1">Typ Rejestru</MyTableHeader>,
                    <MyTableHeader key="2">Przydział</MyTableHeader>,
                ]}
                myRows={[
                    <MyTableRow key="1">
                        <MyTableCell>{inputs.type}</MyTableCell>
                        <MyTableCell>{inputs.assigned_employee_id}</MyTableCell>
                    </MyTableRow>,
                ]}
            /> */}
            <MyTable
                myRows={
                    <>
                        <MyTableRow>
                            <MyTableHeaderRow>Przydział</MyTableHeaderRow>
                            <MyTableCell>
                                {inputs.assigned_employee_id}
                            </MyTableCell>
                        </MyTableRow>
                        <MyTableRow>
                            <MyTableHeaderRow width="10%">
                                Typ Rejestru
                            </MyTableHeaderRow>
                            <MyTableCell>{inputs.type}</MyTableCell>
                        </MyTableRow>
                    </>
                }
            />
            <HStack direction="row" alignItems="start" gap="0">
                <RegisterDataTableEdit {...props} showMore={showMore}>
                    {row.type !== "Dz. bud" && (
                        <Float
                            placement="bottom-start"
                            // offsetX="2"
                            // offset="1"
                            // offsetX="1"
                            // offsetY="1"
                            width="full"
                            zIndex={100}
                        >
                            <Tooltip
                                content={
                                    showMore ? "Pokaż mniej" : "Pokaż więcej"
                                }
                            >
                                <IconButton
                                    size="2xs"
                                    onClick={handleShowMoreButtonClicked}
                                >
                                    <Icon
                                        transition="transform"
                                        transform={
                                            showMore ? "rotate(180deg)" : ""
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
                    <RegisterConstructionJournalTableEdit {...props} />
                )}
                {row.type !== "Dz. bud" && (
                    <>
                        <RegisterConstructionIntentTableEdit
                            showMore={showMore}
                            {...props}
                        />
                        <RegisterAdminProceduresTableEdit
                            showMore={showMore}
                            {...props}
                        />
                    </>
                )}
            </HStack>
        </>
    );
}
