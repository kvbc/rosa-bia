import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Table,
} from "@mui/joy";
import { PKOB } from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaHouse } from "react-icons/fa6";
import DBTableEdit from "../../components/DBTableEdit";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionSpecTableEditRowContent from "./ConstructionSpecTableEditRowContent";

export default function ConstructionClassTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionClass>) {
    const constructionSpecDBEntries = useDBEntriesStore<PKOB.ConstructionSpec>("wyszczegolnienia_budowlane")(); // prettier-ignore

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
                            {inputs.klasa}
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
                                (fEntry) => fEntry.klasa_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-400"
                            rowActionTDClassName="bg-gray-400"
                            headers={["Wyszczególnienia Budowlane"]}
                            emptyEntry={{
                                id: constructionSpecDBEntries.entryCount + 1,
                                nazwa: "",
                                klasa_id: entry.id,
                                kat_ob: "",
                                klasa_zl: "",
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "nazwa",
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
                                ConstructionSpecTableEditRowContent
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
