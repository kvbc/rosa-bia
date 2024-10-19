import { FaBuilding } from "react-icons/fa6";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionGroupTableEditRowContent from "./ConstructionGroupTableEditRowContent";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { useContext, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/PagePKOBContext";
import React from "react";
import { TableEditRowInputsProps } from "../../components/TableEditRow";
import MyTableTD from "../../components/MyTableTD";

export default function ConstructionDivisionTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DBRows.ConstructionDivision>) {
    const pageContext = useContext(PagePKOBContext);
    if (!pageContext) {
        throw "Error";
    }

    const defaultRow = useMemo<DBTableEditDefaultRow<DBRows.ConstructionGroup>>(
        () => ({
            name: "",
            division_id: row.id,
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DBRows.ConstructionGroup>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
        ],
        []
    );

    return (
        <>
            <MyTableTD>
                <Accordion className="shadow-none">
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <FaBuilding />
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbTable={pageContext.constructionGroupsDBTable}
                            rows={pageContext.constructionGroupsDBTable.rows.filter(
                                (fRow) => fRow.division_id === row.id
                            )}
                            editable={editable}
                            headers={["Grupy Budowlane"]}
                            defaultRow={defaultRow}
                            rowInputsProps={rowInputsProps}
                            RowContentComponent={
                                ConstructionGroupTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </MyTableTD>
        </>
    );
}
