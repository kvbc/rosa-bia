import { Gmina, Miejscowosc, PKOB } from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/joy";
import { FaCity } from "react-icons/fa6";
import DBTableEdit from "../../components/DBTableEdit";
import { MyInputSelectOption } from "../../components/MyInput";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import PlaceTableEditRowContent from "./PlaceTableEditRowContext";

export default function CommuneTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<Gmina>) {
    const placeDBEntries = useDBEntriesStore<Miejscowosc>("miejscowosci")();

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
                            {inputs.nazwa}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbEntries={placeDBEntries}
                            entries={placeDBEntries.entries.filter(
                                (fEntry) => fEntry.gmina_id === entry.id
                            )}
                            editable={editable}
                            headersClassName="bg-gray-100"
                            rowActionTDClassName="bg-gray-100"
                            showFooter={false}
                            headers={["Miejscowości"]}
                            emptyEntry={{
                                id: placeDBEntries.entryCount + 1,
                                gmina_id: entry.id,
                                jedn_ewid: "",
                                nazwa: "",
                                obreb_id: 0,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "nazwa",
                                },
                                {
                                    type: "select",
                                    entryKey: "obreb_id",
                                    selectOptions:
                                        placeDBEntries.entries.map<MyInputSelectOption>(
                                            (entry) => ({
                                                value: entry.id,
                                                name: entry.nazwa,
                                            })
                                        ),
                                },
                                {
                                    type: "text",
                                    entryKey: "jedn_ewid",
                                },
                            ]}
                            RowContentComponent={PlaceTableEditRowContent}
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
