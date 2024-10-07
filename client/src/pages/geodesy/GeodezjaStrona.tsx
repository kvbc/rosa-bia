import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { Gmina, Miejscowosc, Ulica } from "../../../../server/src/types";
import { MyInputSelectOption } from "../../components/MyInput";
import DBTableEdit from "../../components/DBTableEdit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/joy";
import { FaDatabase } from "react-icons/fa";
import CommuneTableEditRowContent from "./CommuneTableEditRowContext";

export default function GeodezjaStrona() {
    const communeDBEntries = useDBEntriesStore<Gmina>("gminy")();
    const placeDBEntries = useDBEntriesStore<Miejscowosc>("miejscowosci")();
    const streetDBEntries = useDBEntriesStore<Ulica>("ulice")();

    return (
        <>
            <DBTableEdit
                dbEntries={communeDBEntries}
                headers={["Gmina"]}
                emptyEntry={{
                    id: communeDBEntries.entryCount + 1,
                    nazwa: "",
                }}
                rowInputsProps={[
                    {
                        type: "text",
                        entryKey: "nazwa",
                    },
                ]}
                RowContentComponent={CommuneTableEditRowContent}
            />
        </>
    );
}
