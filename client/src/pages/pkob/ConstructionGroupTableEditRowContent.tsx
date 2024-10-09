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
import { DB } from "../../../../server/src/dbTypes";

export default function ConstructionGroupTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.ConstructionGroup>) {
    const constructionClassDBEntries = useDBEntriesStore<DB.ConstructionClass>("construction_classes")(); // prettier-ignore

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
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbEntries={constructionClassDBEntries}
                            entries={constructionClassDBEntries.entries.filter(
                                (fEntry) => fEntry.group_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-300"
                            rowActionTDClassName="bg-gray-300"
                            headers={["Klasy Budowlane"]}
                            emptyEntry={{
                                id: constructionClassDBEntries.entryCount + 1,
                                name: "",
                                pkob: 0,
                                group_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "name",
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
