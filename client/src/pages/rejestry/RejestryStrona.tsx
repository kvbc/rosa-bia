import { useState } from "react";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore, { DBEntries } from "../../hooks/useDBEntriesStore";
import {
    DBEntry,
    Inwestor,
    REGISTER_MAYOR_DECISIONS,
    Miejscowosc,
    PKOB,
    Register,
    TypeEntry,
    Ulica,
    REGISTER_MAYOR_RESOLUTIONS,
    getRegisterDecisionsFromType,
    getRegisterResolutionsFromType,
    REGISTER_TYPES,
    Gmina,
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
    const communeDBEntries = useDBEntriesStore<Gmina>("gminy")(); // prettier-ignore
    const placeDBEntries = useDBEntriesStore<Miejscowosc>("miejscowosci")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")(); // prettier-ignore
    const constructionSectionDBEntries = useDBEntriesStore<PKOB.ConstructionSection>("sekcje_budowlane")(); // prettier-ignore
    const constructionGroupDBEntries = useDBEntriesStore<PKOB.ConstructionGroup>("grupy_budowlane")(); // prettier-ignore
    const constructionDivisionDBEntries = useDBEntriesStore<PKOB.ConstructionDivision>("dzialy_budowlane")(); // prettier-ignore
    const constructionSpecDBEntries = useDBEntriesStore<PKOB.ConstructionSpec>("wyszczegolnienia_budowlane")(); // prettier-ignore
    const constructionFormDBEntries = useDBEntriesStore<PKOB.ConstructionForm>("formy_budownictwa")(); // prettier-ignore
    const investorDBEntries = useDBEntriesStore<Inwestor>("inwestorzy")(); // prettier-ignore
    const spatialPlanDBEntries = useDBEntriesStore<PKOB.SpatialPlan>('planowania_przestrzenne')(); // prettier-ignore
    const streetDBEntries = useDBEntriesStore<Ulica>('ulice')(); // prettier-ignore
    const adminActionTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_czynnosci_admin")(); // prettier-ignore

    const emptyEntry: Register = {
        id: registerDBEntries.entryCount + 1,
        obiekt_forma_budownictwa_id: 0,
        obiekt_nr: "",
        obiekt_planowanie_przestrzenne_id: 0,
        obiekt_ulica_id: 0,
        obiekt_wyszczegolnienie_id: 0,
        _obiekt_dzial_id: 0,
        _obiekt_grupa_id: 0,
        _obiekt_klasa_id: 0,
        _obiekt_sekcja_id: 0,
        _obiekt_gmina_id: 0,
        _obiekt_miejscowosc_id: 0,
        obiekt_rozbiorka_objety_ochrona_konserwatorska: false,
        obiekt_pnb_infrastruktura_towarzyszaca: false,
        typ: "PnB (6740)",
        wniosek_data_zlozenia: "",
        wniosek_decyzja_data_wydania: "",
        wniosek_decyzja_numer: 0,
        // wniosek_decyzja_typ: "",
        wniosek_inwestor_id: 0,
        wniosek_numer: 0,
        wniosek_rozstrzygniecie_data_wydania: "",
        wniosek_rozstrzygniecie_numer_pisma: 0,
        // wniosek_rozstrzygniecie_typ: "",
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
    addInputProps("obiekt_pnb_infrastruktura_towarzyszaca", "checkbox");
    addInputProps("obiekt_rozbiorka_objety_ochrona_konserwatorska", "checkbox");
    addSelectInputProps("_obiekt_gmina_id", communeDBEntries, 'nazwa'); // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "_obiekt_miejscowosc_id",
        getSelectOptions: (entry) =>
            placeDBEntries.entries
                .filter((fEntry) => fEntry.gmina_id === entry._obiekt_gmina_id)
                .map<MyInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.nazwa,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "obiekt_ulica_id",
        getSelectOptions: (entry) =>
            streetDBEntries.entries
                .filter(
                    (fEntry) =>
                        fEntry.miejscowosc_id === entry._obiekt_miejscowosc_id
                )
                .map<MyInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.nazwa,
                })),
    });
    addSelectInputProps("_obiekt_sekcja_id", constructionSectionDBEntries, 'sekcja'); // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "_obiekt_dzial_id",
        getSelectOptions: (entry) =>
            constructionDivisionDBEntries.entries
                .filter(
                    (fEntry) => fEntry.sekcja_id === entry._obiekt_sekcja_id
                )
                .map<MyInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.dzial,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "_obiekt_grupa_id",
        getSelectOptions: (entry) =>
            constructionGroupDBEntries.entries
                .filter((fEntry) => fEntry.dzial_id === entry._obiekt_dzial_id)
                .map<MyInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.grupa,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "_obiekt_klasa_id",
        getSelectOptions: (entry) =>
            constructionClassDBEntries.entries
                .filter((fEntry) => fEntry.grupa_id === entry._obiekt_grupa_id)
                .map<MyInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.klasa,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "obiekt_wyszczegolnienie_id",
        getSelectOptions: (entry) =>
            constructionSpecDBEntries.entries
                .filter((fEntry) => fEntry.klasa_id === entry._obiekt_klasa_id)
                .map<MyInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.nazwa,
                })),
    });
    // addSelectInputProps("typ_id", registerTypeDBEntries, 'typ'); // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "typ",
        selectOptions: REGISTER_TYPES.map<MyInputSelectOption>(
            (registerType) => ({
                value: registerType,
                name: registerType,
            })
        ),
    });
    addInputProps('wniosek_data_zlozenia', 'date') // prettier-ignore
    addInputProps('wniosek_decyzja_data_wydania', 'date') // prettier-ignore
    addInputProps('wniosek_decyzja_numer', 'number') // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "wniosek_decyzja_typ",
        getSelectOptions: (entry) =>
            getRegisterDecisionsFromType(entry.typ).map<MyInputSelectOption>(
                (type) => ({
                    value: type,
                    name: type,
                })
            ),
    });
    addSelectInputProps("wniosek_inwestor_id", investorDBEntries, 'nazwa'); // prettier-ignore
    addInputProps('wniosek_numer', 'number') // prettier-ignore
    addInputProps('wniosek_rozstrzygniecie_data_wydania', 'date') // prettier-ignore
    addInputProps('wniosek_rozstrzygniecie_numer_pisma', 'number') // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "wniosek_rozstrzygniecie_typ",
        getSelectOptions: (entry) =>
            getRegisterResolutionsFromType(entry.typ).map<MyInputSelectOption>(
                (type) => ({
                    value: type,
                    name: type,
                })
            ),
    });

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
                                dbEntries: adminActionTypeDBEntries,
                                name: "Czynność admin.",
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
