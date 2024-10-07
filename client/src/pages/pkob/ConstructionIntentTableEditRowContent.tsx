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

export default function ConstructionIntentTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionIntention>) {
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
                            {inputs.zamierzenie}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th className="w-[10%] text-wrap bg-gray-200">
                                        PKOB
                                    </th>
                                    <th className="w-[10%] text-wrap bg-gray-200">
                                        Kat. OB
                                    </th>
                                    <th className="w-[10%] text-wrap bg-gray-200">
                                        Klasa ZL.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{inputs.pkob}</td>
                                    <td>{inputs.kat_ob}</td>
                                    <td>{inputs.klasa_zl}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br />
                        <DBTableEdit
                            dbEntries={constructionClassDBEntries}
                            entries={constructionClassDBEntries.entries.filter(
                                (fEntry) => fEntry.zamierzenie_id === entry.id
                            )}
                            editable={editable}
                            showFooter={false}
                            headersClassName="bg-gray-300"
                            rowActionTDClassName="bg-gray-300"
                            headers={["Klasy Budowlane"]}
                            emptyEntry={{
                                id: constructionClassDBEntries.entryCount + 1,
                                klasa: "",
                                zamierzenie_id: entry.id,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "klasa",
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
