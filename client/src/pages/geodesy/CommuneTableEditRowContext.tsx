import { TableEditRowContentProps } from "../../components/TableEditRow";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/joy";
import { FaCity } from "react-icons/fa6";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowInputSelectOption } from "../../components/TableEditRowInput";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import PlaceTableEditRowContent from "./PlaceTableEditRowContext";
import { DB } from "../../../../server/src/dbTypes";

export default function CommuneTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.Commune>) {
    const placeDBEntries = useDBEntriesStore<DB.Place>("places")();

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
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbEntries={placeDBEntries}
                            entries={placeDBEntries.entries.filter(
                                (fEntry) => fEntry.commune_id === entry.id
                            )}
                            editable={editable}
                            headersClassName="bg-gray-100"
                            rowActionTDClassName="bg-gray-100"
                            showFooter={false}
                            headers={["Miejscowości"]}
                            emptyEntry={{
                                id: placeDBEntries.entryCount + 1,
                                commune_id: entry.id,
                                cad_unit: "",
                                name: "",
                                area_place_id: 0,
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "name",
                                },
                                {
                                    type: "select",
                                    entryKey: "area_place_id",
                                    selectOptions:
                                        placeDBEntries.entries.map<TableEditRowInputSelectOption>(
                                            (entry) => ({
                                                value: entry.id,
                                                name: entry.name,
                                            })
                                        ),
                                },
                                {
                                    type: "text",
                                    entryKey: "cad_unit",
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
