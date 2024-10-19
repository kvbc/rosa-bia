import { IconButton, Stack } from "@mui/joy";
import RegisterDataTableEdit from "./table_app_data/RegisterDataTableEdit";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import React, { useCallback, useState } from "react";
import RegisterConstructionIntentTableEdit from "./table_construction_intent/RegisterConstructionIntentTableEdit";
import RegisterAdminProceduresTableEdit from "./table_admin_procedures/RegisterAdminProceduresTableEdit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MyTableTR from "../../components/MyTableTR";
import MyTableTH from "../../components/MyTableth";
import MyTableTD from "../../components/MyTableTD";
import MyTable from "../../components/MyTable";

export default function RegisterTableEditRowContent(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { inputs } = props;

    const [showMore, setShowMore] = useState(false);

    const handleShowMoreButtonClicked = useCallback(() => {
        setShowMore((showMore) => !showMore);
    }, []);

    return (
        <MyTableTD className="relative">
            <MyTable size="sm">
                <MyTableTR>
                    <MyTableTH className="w-[10%]">Typ Rejestru</MyTableTH>
                    <MyTableTD>{inputs.type}</MyTableTD>
                </MyTableTR>
            </MyTable>
            <Stack
                direction="row"
                alignItems="start"
                sx={{ position: "relative" }}
            >
                <RegisterDataTableEdit {...props} showMore={showMore} />
                <RegisterConstructionIntentTableEdit
                    {...props}
                    showMore={showMore}
                />
                <RegisterAdminProceduresTableEdit
                    {...props}
                    showMore={showMore}
                />
                <IconButton
                    size="xs"
                    variant="solid"
                    color="primary"
                    className="absolute aspect-square p-0 top-[180px] left-0 z-30 -translate-y-1/2 -translate-x-1/2"
                    onClick={handleShowMoreButtonClicked}
                >
                    <ArrowDownwardIcon
                        className="transition"
                        sx={{
                            transform: `rotate(${showMore ? "180deg" : "0"})`,
                        }}
                    />
                </IconButton>
            </Stack>
        </MyTableTD>
    );
}
