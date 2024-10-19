import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/joy";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaHouse } from "react-icons/fa6";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionSpecTableEditRowContent from "./ConstructionSpecTableEditRowContent";
import React, { useContext, useMemo } from "react";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { DBRows } from "../../../../server/src/dbTypes";
import { PagePKOBContext } from "../../contexts/PagePKOBContext";
import { TableEditRowInputsProps } from "../../components/TableEditRow";
import MyTableTR from "../../components/MyTableTR";
import MyTableTH from "../../components/MyTableth";
import MyTableTD from "../../components/MyTableTD";
import MyTable from "../../components/MyTable";

export default function ConstructionClassTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DBRows.ConstructionClass>) {
    const pageContext = useContext(PagePKOBContext);
    if (!pageContext) {
        throw "Error";
    }

    const defaultRow = useMemo<DBTableEditDefaultRow<DBRows.ConstructionSpec>>(
        () => ({
            name: "",
            class_id: row.id,
            ob_cat: "",
            zl_class: "",
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DBRows.ConstructionSpec>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
            {
                type: "text",
                rowKey: "ob_cat",
            },
            {
                type: "text",
                rowKey: "zl_class",
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
                        <MyTable size="sm">
                            <thead>
                                <MyTableTR>
                                    <MyTableTH className="w-[10%] text-wrap bg-gray-200">
                                        PKOB
                                    </MyTableTH>
                                </MyTableTR>
                            </thead>
                            <tbody>
                                <MyTableTR>
                                    <MyTableTD>{inputs.pkob}</MyTableTD>
                                </MyTableTR>
                            </tbody>
                        </MyTable>
                        <br />
                        <DBTableEdit
                            dbTable={pageContext.constructionSpecsDBTable}
                            rows={pageContext.constructionSpecsDBTable.rows.filter(
                                (fRow) => fRow.class_id === row.id
                            )}
                            editable={editable}
                            headers={["Wyszczególnienia Budowlane"]}
                            defaultRow={defaultRow}
                            rowInputsProps={rowInputsProps}
                            RowContentComponent={
                                ConstructionSpecTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </MyTableTD>
        </>
    );
}
