import { FaBuilding } from "react-icons/fa6";
import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionIntentTableEditRowContent from "./ConstructionIntentTableEditRowContent";
import Table from "@mui/joy/Table";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function ConstructionDivisionTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionDivision>) {
    const constructionIntentionDBEntries = useDBEntriesStore<PKOB.ConstructionIntention>("zamierzenia_budowlane")(); // prettier-ignore

    return (
        <>
            <td className="bg-gray-100">
                <Accordion className="bg-gray-100 shadow-none">
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <FaBuilding />
                            {inputs.dzial}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbEntries={constructionIntentionDBEntries}
                            entries={constructionIntentionDBEntries.entries.filter(
                                (fEntry) => fEntry.dzial_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-200"
                            rowActionTDClassName="bg-gray-200"
                            headers={["Zamierzenia Budowlane"]}
                            emptyEntry={{
                                id:
                                    constructionIntentionDBEntries.entryCount +
                                    1,
                                zamierzenie: "",
                                dzial_id: entry.id,
                                pkob: 0,
                                kat_ob: "",
                                klasa_zl: "",
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "zamierzenie",
                                },
                                {
                                    type: "number",
                                    entryKey: "pkob",
                                },
                                {
                                    type: "text",
                                    entryKey: "kat_ob",
                                },
                                {
                                    type: "text",
                                    entryKey: "klasa_zl",
                                },
                            ]}
                            RowContentComponent={
                                ConstructionIntentTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
