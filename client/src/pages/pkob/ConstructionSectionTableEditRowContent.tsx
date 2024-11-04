import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionDivisionTableEditRowContent from "./ConstructionDivisionTableEditRowContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaCity } from "react-icons/fa6";
import { Box } from "@mui/joy";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import { useContext, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/pages/PagePKOBContext";
import React from "react";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";

export default function ConstructionSectionTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionSection>) {
    const pageContext = useContext(PagePKOBContext);
    if (!pageContext) {
        throw "Error";
    }

    const defaultRow = useMemo<
        DBTableEditDefaultRow<DB.Rows.ConstructionDivision>
    >(
        () => ({
            name: "",
            section_id: row.id,
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionDivision>
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
            <td>
                <Accordion className="shadow-none">
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <FaCity />
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbTable={pageContext.constructionDivisionsDBTable}
                            rows={pageContext.constructionDivisionsDBTable.rows.filter(
                                (fRow) => fRow.section_id === row.id
                            )}
                            editable={editable}
                            headers={["Działy Budowlane"]}
                            defaultRow={defaultRow}
                            rowInputsProps={rowInputsProps}
                            RowContentComponent={
                                ConstructionDivisionTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
