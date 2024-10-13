import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBTableStore";
import ConstructionClassTableEditRowContent from "./ConstructionClassTableEditRowContent";
import Table from "@mui/joy/Table";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaCity, FaDatabase, FaHouse } from "react-icons/fa6";
import { Box } from "@mui/joy";
import { DBRows } from "../../../../server/src/dbTypes";

export default function ConstructionGroupTableEditRowContent({
    inputs,
    row: entry,
    editable,
    setRow: setEntry,
}: TableEditRowContentComponentProps<DBRows.ConstructionGroup>) {
    const constructionClassDBEntries = useDBEntriesStore<DBRows.ConstructionClass>("construction_classes")(); // prettier-ignore

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
                            rows={constructionClassDBEntries.rows.filter(
                                (fEntry) => fEntry.group_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-300"
                            rowActionTDClassName="bg-gray-300"
                            headers={["Klasy Budowlane"]}
                            emptyRow={{
                                id:
                                    constructionClassDBEntries.totalRowCount +
                                    1,
                                name: "",
                                pkob: 0,
                                group_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    rowKey: "name",
                                },
                                {
                                    type: "number",
                                    rowKey: "pkob",
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
