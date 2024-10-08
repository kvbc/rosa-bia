import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionClassTableEditRowContent from "./ConstructionClassTableEditRowContent";
import Table from "@mui/joy/Table";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaCity, FaDatabase, FaHouse } from "react-icons/fa6";
import { Box } from "@mui/joy";

export default function ConstructionGroupTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionGroup>) {
    const constructionClassDBEntries =
        useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")();

    return (
        <>
            <td className="bg-gray-200">
                <Accordion className="bg-gray-200 shadow-none">
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >
                            <FaHouse />
                            {inputs.grupa}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbEntries={constructionClassDBEntries}
                            entries={constructionClassDBEntries.entries.filter(
                                (fEntry) => fEntry.grupa_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-300"
                            rowActionTDClassName="bg-gray-300"
                            headers={["Klasy Budowlane"]}
                            emptyEntry={{
                                id: constructionClassDBEntries.entryCount + 1,
                                klasa: "",
                                pkob: 0,
                                grupa_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "klasa",
                                },
                                {
                                    type: "number",
                                    entryKey: "pkob",
                                },
                            ]}
                            RowContentComponent={
                                ConstructionClassTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
