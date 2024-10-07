import { useState } from "react";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore, { DBEntries } from "../../hooks/useDBEntriesStore";
import {
    DBEntry,
    Inwestor,
    Miejscowosc,
    PKOB,
    Register,
    TypeEntry,
    Ulica,
} from "../../../../server/src/types";
import { MyInputSelectOption } from "../../components/MyInput";
import RegisterTableEditRowContent from "./RegisterTableEditRowContent";
import { TableEditRowInputProps } from "../../components/TableEditRow";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { FaStamp } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { Scale } from "@mui/icons-material";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import DBTableEdit from "../../components/DBTableEdit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/joy";
import { FaDatabase, FaGear } from "react-icons/fa6";

export default function RejestryStrona() {
    const registerDBEntries = useDBEntriesStore<Register>("rejestry")(); // prettier-ignore
    const registerTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_rejestrow")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")(); // prettier-ignore
    const constructionFormDBEntries = useDBEntriesStore<PKOB.ConstructionForm>("formy_budownictwa")(); // prettier-ignore
    const investorDBEntries = useDBEntriesStore<Inwestor>("inwestorzy")(); // prettier-ignore
    const mayorDecisionDBEntries = useDBEntriesStore<TypeEntry>("typy_decyzji_starosty")(); // prettier-ignore
    const spatialPlanDBEntries = useDBEntriesStore<PKOB.SpatialPlan>('planowania_przestrzenne')(); // prettier-ignore
    const streetDBEntries = useDBEntriesStore<Ulica>('ulice')(); // prettier-ignore
    const resolutionDBEntries = useDBEntriesStore<TypeEntry>('typy_rozstrzygniec')(); // prettier-ignore
    const mayorDecisionTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_decyzji_starosty")(); // prettier-ignore
    const resolutionTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_rozstrzygniec")(); // prettier-ignore
    const adminActionTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_czynnosci_admin")(); // prettier-ignore

    const emptyEntry: Register = {
        id: registerDBEntries.entryCount + 1,
        obiekt_forma_budownictwa_id: 0,
        obiekt_nr: "",
        obiekt_planowanie_przestrzenne_id: 0,
        obiekt_ulica_id: 0,
        obiekt_klasa_id: 0,
        typ_id: 0,
        wniosek_data_zlozenia: "",
        wniosek_decyzja_data_wydania: "",
        wniosek_decyzja_numer: 0,
        wniosek_decyzja_typ_id: 0,
        wniosek_inwestor_id: 0,
        wniosek_numer: 0,
        wniosek_rozstrzygniecie_data_wydania: "",
        wniosek_rozstrzygniecie_numer_pisma: 0,
        wniosek_rozstrzygniecie_typ_id: 0,
    };
    const rowInputsProps: TableEditRowInputProps<Register>[] = [];
    const addInputProps = (
        entryKey: TableEditRowInputProps<Register>["entryKey"],
        type: TableEditRowInputProps<Register>["type"]
    ) => {
        rowInputsProps.push({ type, entryKey });
    };
    const addSelectInputProps = <T extends DBEntry>(
        entryKey: keyof Register,
        dbEntries: DBEntries<T>,
        selectEntryNameKey: keyof T
    ) => {
        rowInputsProps.push({
            type: "select",
            entryKey: entryKey,
            selectOptions: dbEntries.entries.map<MyInputSelectOption>(
                (entry) => ({
                    value: entry.id,
                    name: entry[selectEntryNameKey],
                })
            ),
        });
    };
    addSelectInputProps('obiekt_forma_budownictwa_id', constructionFormDBEntries, 'forma') // prettier-ignore
    addInputProps('obiekt_nr', 'text') // prettier-ignore
    addSelectInputProps("obiekt_planowanie_przestrzenne_id", spatialPlanDBEntries, 'planowanie'); // prettier-ignore
    // addSelectInputProps("obiekt_ulica_id", streetDBEntries, 'nazwa'); // prettier-ignore
    // addSelectInputProps("obiekt_klasa_id", constructionClassDBEntries, 'klasa'); // prettier-ignore
    addSelectInputProps("typ_id", registerTypeDBEntries, 'typ'); // prettier-ignore
    addInputProps('wniosek_data_zlozenia', 'date') // prettier-ignore
    addInputProps('wniosek_decyzja_data_wydania', 'date') // prettier-ignore
    addInputProps('wniosek_decyzja_numer', 'number') // prettier-ignore
    addSelectInputProps("wniosek_decyzja_typ_id", mayorDecisionDBEntries, 'typ'); // prettier-ignore
    addSelectInputProps("wniosek_inwestor_id", investorDBEntries, 'nazwa'); // prettier-ignore
    addInputProps('wniosek_numer', 'number') // prettier-ignore
    addInputProps('wniosek_rozstrzygniecie_data_wydania', 'date') // prettier-ignore
    addInputProps('wniosek_rozstrzygniecie_numer_pisma', 'number') // prettier-ignore
    addSelectInputProps("wniosek_rozstrzygniecie_typ_id", resolutionDBEntries, 'typ'); // prettier-ignore

    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <FaDatabase />
                        Dane
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <DBTableEdit
                        dbEntries={registerDBEntries}
                        headers={["Rejestr"]}
                        emptyEntry={emptyEntry}
                        rowInputsProps={rowInputsProps}
                        RowContentComponent={RegisterTableEditRowContent}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <FaGear />
                        Konfiguracja
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Tabs size="sm">
                        <TabList>
                            <Tab>
                                <AiOutlineSolution fontSize={20} />
                                Decyzje Starosty
                            </Tab>
                            <Tab>
                                <FaStamp />
                                Rozstrzygnięcia Wniosku
                            </Tab>
                            <Tab>
                                <MdPendingActions fontSize={20} />
                                Czynności administracyjne
                            </Tab>
                            <Tab>
                                <FaFileAlt />
                                Typy Rejestrów
                            </Tab>
                        </TabList>
                        {[
                            {
                                dbEntries: mayorDecisionTypeDBEntries,
                                name: "Decyzja Starosty",
                            },
                            {
                                dbEntries: resolutionTypeDBEntries,
                                name: "Rozstrzygnięcie",
                            },
                            {
                                dbEntries: adminActionTypeDBEntries,
                                name: "Czynność admin.",
                            },
                            {
                                dbEntries: registerTypeDBEntries,
                                name: "Typ Rejestru",
                            },
                        ].map((entry, entryIndex) => (
                            <TabPanel value={entryIndex}>
                                <DBTableEdit
                                    dbEntries={entry.dbEntries}
                                    headers={[entry.name]}
                                    emptyEntry={{
                                        id: 0,
                                        typ: "",
                                    }}
                                    rowInputsProps={[
                                        {
                                            type: "text",
                                            entryKey: "typ",
                                            placeholder: "Typ",
                                        },
                                    ]}
                                />
                            </TabPanel>
                        ))}
                    </Tabs>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
