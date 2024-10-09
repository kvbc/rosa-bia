import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Table,
} from "@mui/joy";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaHouse } from "react-icons/fa6";
import DBTableEdit from "../../components/DBTableEdit";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionSpecTableEditRowContent from "./ConstructionSpecTableEditRowContent";
import { DB } from "../../../../server/src/dbTypes";

export default function ConstructionClassTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.ConstructionClass>) {
    const constructionSpecDBEntries = useDBEntriesStore<DB.ConstructionSpec>("construction_specs")(); // prettier-ignore

    return (
        <>
            <td className="bg-gray-300">
                <Accordion className="bg-gray-300 shadow-none">
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
                            dbEntries={constructionSpecDBEntries}
                            entries={constructionSpecDBEntries.entries.filter(
                                (fEntry) => fEntry.class_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-400"
                            rowActionTDClassName="bg-gray-400"
                            headers={["Wyszczególnienia Budowlane"]}
                            emptyEntry={{
                                id: constructionSpecDBEntries.entryCount + 1,
                                name: "",
                                class_id: entry.id,
                                ob_cat: "",
                                zl_class: "",
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "name",
                                },
                                {
                                    type: "text",
                                    entryKey: "ob_cat",
                                },
                                {
                                    type: "text",
                                    entryKey: "zl_class",
                                },
                            ]}
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
