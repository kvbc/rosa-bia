import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";
import Table from "@mui/joy/Table";
import useDBEntriesStore from "../../hooks/useDBTableStore";
import ConstructionDivisionTableEditRowContent from "./ConstructionDivisionTableEditRowContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaCity, FaDatabase } from "react-icons/fa6";
import { Box } from "@mui/joy";
import { DBRows } from "../../../../server/src/dbTypes";

export default function ConstructionSectionTableEditRowContent({
    inputs,
    row: entry,
    editable,
    setRow: setEntry,
}: TableEditRowContentComponentProps<DBRows.ConstructionSection>) {
    const constructionDivisionDBEntries = useDBEntriesStore<DBRows.ConstructionDivision>("construction_divisions")(); // prettier-ignore

    return (
        <>
            <td className="bg-gray-50">
                <Accordion className="bg-gray-50 shadow-none">
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
                            dbEntries={constructionDivisionDBEntries}
                            rows={constructionDivisionDBEntries.rows.filter(
                                (fEntry) => fEntry.section_id === entry.id
                            )}
                            editable={editable}
                            headersClassName="bg-gray-100"
                            rowActionTDClassName="bg-gray-100"
                            headers={["Działy Budowlane"]}
                            showFooter={false}
                            emptyRow={{
                                id:
                                    constructionDivisionDBEntries.totalRowCount +
                                    1,
                                name: "",
                                section_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    rowKey: "name",
                                },
                            ]}
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
