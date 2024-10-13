import useDBEntriesStore from "../../hooks/useDBTableStore";
import { TableEditRowInputSelectOption } from "../../components/TableEditRowInput";
import DBTableEdit from "../../components/DBTableEdit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/joy";
import { FaDatabase } from "react-icons/fa";
import CommuneTableEditRowContent from "./CommuneTableEditRowContext";
import { DB } from "../../../../server/src/dbTypes";

export default function GeodezjaStrona() {
    const communeDBEntries = useDBEntriesStore<DB.Commune>("communes")();
    const placeDBEntries = useDBEntriesStore<DB.Place>("places")();
    const streetDBEntries = useDBEntriesStore<DB.Street>("streets")();

    return (
        <>
            <DBTableEdit
                dbEntries={communeDBEntries}
                headers={["Gmina"]}
                emptyEntry={{
                    id: communeDBEntries.totalRowCount + 1,
                    name: "",
                }}
                rowInputsProps={[
                    {
                        type: "text",
                        entryKey: "name",
                    },
                ]}
                RowContentComponent={CommuneTableEditRowContent}
            />
        </>
    );
}
