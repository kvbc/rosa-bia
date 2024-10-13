import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import Table from "@mui/joy/Table";
import useDBEntriesStore from "../../hooks/useDBTableStore";
import ConstructionDivisionTableEditRowContent from "./ConstructionDivisionTableEditRowContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaCity, FaDatabase } from "react-icons/fa6";
import { Box } from "@mui/joy";
import { DB } from "../../../../server/src/dbTypes";

export default function ConstructionSectionTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.ConstructionSection>) {
    const constructionDivisionDBEntries = useDBEntriesStore<DB.ConstructionDivision>("construction_divisions")(); // prettier-ignore

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
                            entries={constructionDivisionDBEntries.rows.filter(
                                (fEntry) => fEntry.section_id === entry.id
                            )}
                            editable={editable}
                            headersClassName="bg-gray-100"
                            rowActionTDClassName="bg-gray-100"
                            headers={["Działy Budowlane"]}
                            showFooter={false}
                            emptyEntry={{
                                id:
                                    constructionDivisionDBEntries.totalRowCount +
                                    1,
                                name: "",
                                section_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "name",
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
