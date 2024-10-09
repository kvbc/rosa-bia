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
import { GiVillage } from "react-icons/gi";
import Table from "@mui/joy/Table";
import StreetTableEditRowContent from "./StreetTableEditRowContext";
import { DB } from "../../../../server/src/dbTypes";

export default function PlaceTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.Place>) {
    const streetDBEntries = useDBEntriesStore<DB.Street>("streets")();

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
                            <GiVillage />
                            {inputs.name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th className="bg-gray-100">Jedn. ewid.</th>
                                    <th className="bg-gray-100">Obręb</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{inputs.cad_unit}</td>
                                    <td>{inputs.area_place_id}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br />
                        <DBTableEdit
                            dbEntries={streetDBEntries}
                            entries={streetDBEntries.entries.filter(
                                (fEntry) => fEntry.place_id === entry.id
                            )}
                            editable={editable}
                            headersClassName="bg-gray-200"
                            rowActionTDClassName="bg-gray-200"
                            showFooter={false}
                            headers={["Ulice"]}
                            emptyEntry={{
                                id: streetDBEntries.entryCount + 1,
                                place_id: entry.id,
                                name: "",
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "name",
                                },
                            ]}
                            RowContentComponent={StreetTableEditRowContent}
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
