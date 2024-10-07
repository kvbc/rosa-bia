import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import Table from "@mui/joy/Table";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionDivisionTableEditRowContent from "./ConstructionDivisionTableEditRowContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaCity, FaDatabase } from "react-icons/fa6";
import { Box } from "@mui/joy";

export default function ConstructionSectionTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionSection>) {
    const constructionDivisionDBEntries = useDBEntriesStore<PKOB.ConstructionDivision>("dzialy_budowlane")(); // prettier-ignore

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
                            {inputs.sekcja}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbEntries={constructionDivisionDBEntries}
                            entries={constructionDivisionDBEntries.entries.filter(
                                (fEntry) => fEntry.sekcja_id === entry.id
                            )}
                            editable={editable}
                            headersClassName="bg-gray-100"
                            rowActionTDClassName="bg-gray-100"
                            headers={["Działy Budowlane"]}
                            showFooter={false}
                            emptyEntry={{
                                id:
                                    constructionDivisionDBEntries.entryCount +
                                    1,
                                dzial: "",
                                sekcja_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "dzial",
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
