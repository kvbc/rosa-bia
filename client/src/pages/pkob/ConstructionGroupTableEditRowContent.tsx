import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionClassTableEditRowContent from "./ConstructionClassTableEditRowContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaHouse } from "react-icons/fa6";
import { Box } from "@mui/joy";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import React, { useContext, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/PagePKOBContext";
import { TableEditRowInputsProps } from "../../components/TableEditRow";
import MyTableTD from "../../components/MyTableTD";

export default function ConstructionGroupTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DBRows.ConstructionGroup>) {
    const pageContext = useContext(PagePKOBContext);
    if (!pageContext) {
        throw "Error";
    }

    const defaultRow = useMemo<DBTableEditDefaultRow<DBRows.ConstructionClass>>(
        () => ({
            name: "",
            pkob: 0,
            group_id: row.id,
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DBRows.ConstructionClass>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
            {
                type: "number",
                rowKey: "pkob",
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
                            <FaHouse />
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbTable={pageContext.constructionClassesDBTable}
                            rows={pageContext.constructionClassesDBTable.rows.filter(
                                (fRow) => fRow.group_id === row.id
                            )}
                            editable={editable}
                            headers={["Klasy Budowlane"]}
                            defaultRow={defaultRow}
                            rowInputsProps={rowInputsProps}
                            RowContentComponent={
                                ConstructionClassTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </MyTableTD>
        </>
    );
}
