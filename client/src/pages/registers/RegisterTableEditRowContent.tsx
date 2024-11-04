import { IconButton, Stack, Table } from "@mui/joy";
import RegisterDataTableEdit from "./table_app_data/RegisterDataTableEdit";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import React, { useCallback, useState } from "react";
import RegisterConstructionIntentTableEdit from "./table_construction_intent/RegisterConstructionIntentTableEdit";
import RegisterAdminProceduresTableEdit from "./table_admin_procedures/RegisterAdminProceduresTableEdit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RegisterConstructionJournalTableEdit from "./table_construction_journal/RegisterConstructionJournalTableEdit";

export default function RegisterTableEditRowContent(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
) {
    const { row, inputs } = props;

    const [showMore, setShowMore] = useState(false);

    const handleShowMoreButtonClicked = useCallback(() => {
        setShowMore((showMore) => !showMore);
    }, []);

    return (
        <td className="relative">
            <Table size="sm">
                <tbody>
                    <tr>
                        <th className="w-[10%]" scope="row">
                            Typ Rejestru
                        </th>
                        <td>{inputs.type}</td>
                    </tr>
                </tbody>
            </Table>
            <Stack
                direction="row"
                alignItems="start"
                sx={{ position: "relative" }}
            >
                <RegisterDataTableEdit {...props} showMore={showMore} />
                {row.type === "Dz. bud" && (
                    <>
                        <RegisterConstructionJournalTableEdit {...props} />
                    </>
                )}
                {row.type !== "Dz. bud" && (
                    <>
                        <RegisterConstructionIntentTableEdit
                            {...props}
                            showMore={showMore}
                        />
                        <RegisterAdminProceduresTableEdit
                            {...props}
                            showMore={showMore}
                        />
                        <IconButton
                            // size="xs"
                            size="sm"
                            variant="solid"
                            color="primary"
                            className="absolute aspect-square p-0 top-[115px] left-0 z-30 -translate-y-1/2 -translate-x-1/2"
                            onClick={handleShowMoreButtonClicked}
                        >
                            <ArrowDownwardIcon
                                className="transition"
                                sx={{
                                    transform: `rotate(${
                                        showMore ? "180deg" : "0"
                                    })`,
                                }}
                            />
                        </IconButton>
                    </>
                )}
            </Stack>
        </td>
    );
}
