import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Table,
} from "@mui/joy";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaHouse } from "react-icons/fa6";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionSpecTableEditRowContent from "./ConstructionSpecTableEditRowContent";
import React, { useContext, useMemo } from "react";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { DB } from "../../../../server/src/db/types";
import { PagePKOBContext } from "../../contexts/PagePKOBContext";
import { TableEditRowInputsProps } from "../../components/TableEditRow";

export default function ConstructionClassTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionClass>) {
    const pageContext = useContext(PagePKOBContext);
    if (!pageContext) {
        throw "Error";
    }

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.ConstructionSpec>>(
        () => ({
            name: "",
            class_id: row.id,
            ob_cat: "",
            zl_class: "",
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionSpec>
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
                            <FaHouse />
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th className="w-[10%] text-wrap bg-gray-200">
                                        PKOB
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{inputs.pkob}</td>
                                </tr>
                            </tbody>
                        </Table>
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
            </td>
        </>
    );
}
