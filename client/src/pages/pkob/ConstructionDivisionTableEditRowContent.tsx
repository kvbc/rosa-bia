import { FaBuilding } from "react-icons/fa6";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";
import ConstructionGroupTableEditRowContent from "./ConstructionGroupTableEditRowContent";
import Table from "@mui/joy/Table";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DBRows } from "../../../../server/src/dbTypes";

export default function ConstructionDivisionTableEditRowContent({
    inputs,
    row: entry,
    editable,
    setRow: setEntry,
}: TableEditRowContentComponentProps<DBRows.ConstructionDivision>) {
    const constructionGroupDBEntries = useDBEntriesStore<DBRows.ConstructionGroup>("construction_groups")(); // prettier-ignore

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
                            rows={constructionGroupDBEntries.rows.filter(
                                (fEntry) => fEntry.division_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-200"
                            rowActionTDClassName="bg-gray-200"
                            headers={["Grupy Budowlane"]}
                            emptyRow={{
                                id:
                                    constructionGroupDBEntries.totalRowCount +
                                    1,
                                name: "",
                                division_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    rowKey: "name",
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
