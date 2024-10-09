import { FaBuilding } from "react-icons/fa6";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionGroupTableEditRowContent from "./ConstructionGroupTableEditRowContent";
import Table from "@mui/joy/Table";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DB } from "../../../../server/src/dbTypes";

export default function ConstructionDivisionTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.ConstructionDivision>) {
    const constructionGroupDBEntries = useDBEntriesStore<DB.ConstructionGroup>("construction_groups")(); // prettier-ignore

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
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbEntries={constructionGroupDBEntries}
                            entries={constructionGroupDBEntries.entries.filter(
                                (fEntry) => fEntry.division_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-200"
                            rowActionTDClassName="bg-gray-200"
                            headers={["Grupy Budowlane"]}
                            emptyEntry={{
                                id: constructionGroupDBEntries.entryCount + 1,
                                name: "",
                                division_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "name",
                                },
                            ]}
                            RowContentComponent={
                                ConstructionGroupTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
