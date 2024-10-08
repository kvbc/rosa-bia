import { useEffect, useState } from "react";
import {
    Gmina,
    Miejscowosc,
    PKOB,
    Register,
    RegisterAdminActions,
    RegisterBuildTypes,
    RegisterInvestPlots,
    TypeEntry,
    Ulica,
} from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { MyInputSelectOption } from "../../components/MyInput";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { Accordion, AccordionSummary, AccordionDetails, Box, Select, Table } from "@mui/joy";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaDatabase } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { MdMore } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import RegisterDataTable from "./RegisterDataTable";
import RegisterConstructionIntentTable from "./RegisterConstructionIntentTable";

export default function RegisterTableEditRowContent(props: TableEditRowContentProps<Register>) {
    const { inputs, entry, editable, setEntry } = props;

    const communeDBEntries = useDBEntriesStore<Gmina>('gminy')(); // prettier-ignore
    const streetDBEntries = useDBEntriesStore<Ulica>('ulice')(); // prettier-ignore
    const placeDBEntries = useDBEntriesStore<Miejscowosc>('miejscowosci')(); // prettier-ignore
    const adminActionTypeDBEntries = useDBEntriesStore<TypeEntry>('typy_czynnosci_admin')(); // prettier-ignore
    const registerAdminActionDBEntries = useDBEntriesStore<RegisterAdminActions>("rejestry_czynnosci_admin")(); // prettier-ignore
    const registerInvestPlotDBEntries = useDBEntriesStore<RegisterInvestPlots>("rejestry_dzialki_objete_inwestycja")(); // prettier-ignore
    const registerBuildTypeDBEntries = useDBEntriesStore<RegisterBuildTypes>("rejestry_typy_budowy")(); // prettier-ignore
    const buildTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_budowy")(); // prettier-ignore
    const constructionSectionDBEntries = useDBEntriesStore<PKOB.ConstructionSection>("sekcje_budowlane")(); // prettier-ignore
    const constructionDivisionDBEntries = useDBEntriesStore<PKOB.ConstructionDivision>("dzialy_budowlane")(); // prettier-ignore
    const constructionGroupDBEntries = useDBEntriesStore<PKOB.ConstructionGroup>("grupy_budowlane")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")(); // prettier-ignore

    const [communeID, setCommuneID] = useState<number>(0);
    const [placeID, setPlaceID] = useState<number>(0);
    const [constructionSectionID, setConstructionSectionID] = useState<number>(0); // prettier-ignore
    const [constructionDivisionID, setConstructionDivisionID] = useState<number>(0); // prettier-ignore
    const [constructionGroupID, setConstructionGroupID] = useState<number>(0); // prettier-ignore

    const places  = placeDBEntries.entries.filter((entry) => entry.gmina_id === communeID); // prettier-ignore
    const streets = streetDBEntries.entries.filter((entry) => entry.miejscowosc_id === placeID); // prettier-ignore
    const place   = places.find((entry) => entry.id === placeID); // prettier-ignore
    const area    = placeDBEntries.entries.find((entry) => entry.id === place?.obreb_id); // prettier-ignore
    const street  = streets.find(fEntry => fEntry.id === entry.obiekt_ulica_id) // prettier-ignore
    const constructionSections  = constructionSectionDBEntries.entries; // prettier-ignore
    const constructionDivisions = constructionDivisionDBEntries.entries.filter(entry => entry.sekcja_id === constructionSectionID) // prettier-ignore
    const constructionGroups   = constructionGroupDBEntries.entries.filter(entry => entry.dzial_id === constructionDivisionID) // prettier-ignore
    const constructionClasses   = constructionClassDBEntries.entries.filter(entry => entry.grupa_id === constructionGroupID) // prettier-ignore
    const constructionClass    = constructionClasses.find(fEntry => fEntry.id === entry._obiekt_klasa_id) // prettier-ignore
    const constructionDivision = constructionDivisions.find(fEntry => fEntry.id === constructionDivisionID) // prettier-ignore
    const constructionSection  = constructionSections.find(fEntry => fEntry.id === constructionSectionID) // prettier-ignore
    const constructionGroup   = constructionGroups.find(fEntry => fEntry.id === constructionGroupID) // prettier-ignore

    const handleStreetUpdated = () => {
        const street = streetDBEntries.entries.find((fEntry) => fEntry.id === entry.obiekt_ulica_id); // prettier-ignore
        const place = placeDBEntries.entries.find((fEntry) => fEntry.id === street?.miejscowosc_id); // prettier-ignore
        const commune = communeDBEntries.entries.find((fEntry) => fEntry.id === place?.gmina_id); // prettier-ignore
        if (commune?.id) setCommuneID(commune?.id);
        else
            setCommuneID(
                communeDBEntries.entries.length > 0
                    ? communeDBEntries.entries[0].id
                    : 0
            );
        if (place?.id) setPlaceID(place?.id);
    };
    const updateStreet = () => {
        if (!street && placeID > 0) {
            if (streets.length > 0)
                setEntry({ ...entry, obiekt_ulica_id: streets[0].id });
            else setEntry({ ...entry, obiekt_ulica_id: 0 });
        }
    };
    const updatePlace = () => {
        if (!place && communeID > 0) {
            if (places.length > 0) setPlaceID(places[0].id);
            else setPlaceID(0);
        }
    };

    useEffect(() => {
        handleStreetUpdated();
        updatePlace();
        updateStreet();
    }, []);
    useEffect(handleStreetUpdated, [entry.obiekt_ulica_id]);
    useEffect(updatePlace, [place, communeID]);
    useEffect(updateStreet, [street, placeID]);

    const handleConstructionClassUpdated = () => {
        const constructionClass = constructionClassDBEntries.entries.find(fEntry => fEntry.id === entry._obiekt_klasa_id) // prettier-ignore
        const constructionGroup = constructionGroupDBEntries.entries.find(fEntry => fEntry.id === constructionClass?.grupa_id) // prettier-ignore
        const constructionDivision = constructionDivisionDBEntries.entries.find(fEntry => fEntry.id === constructionGroup?.dzial_id) // prettier-ignore
        const constructionSection = constructionSectionDBEntries.entries.find(fEntry => fEntry.id === constructionDivision?.sekcja_id) // prettier-ignore

        if (constructionSection?.id)
            setConstructionSectionID(constructionSection.id);
        else
            setConstructionSectionID(
                constructionSections.length > 0 ? constructionSections[0].id : 0
            );

        if(constructionGroup?.id) setConstructionGroupID(constructionGroup.id) // prettier-ignore
        if(constructionDivision?.id) setConstructionDivisionID(constructionDivision.id) // prettier-ignore
    };
    const updateConstructionClass = () => {
        if (!constructionClass && constructionGroupID > 0) {
            if (constructionClasses.length > 0) setEntry({...entry, _obiekt_klasa_id: constructionClasses[0].id }) // prettier-ignore
            else setEntry({...entry, _obiekt_klasa_id: 0})
        }
    };
    const updateConstructionGroup = () => {
        if(!constructionGroup && constructionDivisionID > 0) {
            if(constructionGroups.length > 0) setConstructionGroupID(constructionGroups[0].id)
            else setConstructionGroupID(0)
        }
    }
    const updateConstructionDivision = () => {
        if(!constructionDivision && constructionSectionID > 0) {
            if(constructionDivisions.length > 0) setConstructionDivisionID(constructionDivisions[0].id)
            else setConstructionDivisionID(0)
        }
    }
    useEffect(() => {
        handleConstructionClassUpdated();
        updateConstructionDivision()
        updateConstructionGroup()
        updateConstructionClass();
    }, []);
    useEffect(handleConstructionClassUpdated, [entry._obiekt_klasa_id]);
    useEffect(updateConstructionClass, [constructionClass, constructionGroupID])
    useEffect(updateConstructionDivision, [constructionDivision, constructionSectionID])
    useEffect(updateConstructionGroup, [constructionGroup, constructionDivisionID])

    return <td >
        <Table size="sm">
            <tr>
                <th className="w-[10%] bg-gray-100">Typ Rejestru</th>
                <td>{inputs.typ}</td>
            </tr>
        </Table>

        <div className="flex">
        <RegisterDataTable {...props} />
        <RegisterConstructionIntentTable {...props} />

        </div>

    </td>

    return (
        <td className="p-1">
            <div className="bg-gray-100">
                <Table size="sm">
                    <tr>
                        <th className="w-[10%] bg-gray-100">Typ Rejestru</th>
                        <td>{inputs.typ}</td>
                    </tr>
                </Table>

                <Table size="sm">
                    <thead>
                        <tr>
                            <th className="bg-gray-100" colSpan={2}>Dane Wniosku</th>
                            <th className="bg-gray-100" colSpan={3}>Dane dot. obiektu</th>
                            <th className="bg-gray-100" colSpan={2}>Postępowanie administracyjne</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Numer wniosku</td>
                            <td>{inputs.wniosek_numer}</td>
                            <td>Nazwa zamierzenia budowlanego</td>
                            <td colSpan={2}>
                                <Select
                                    value={constructionGroupID}
                                    onChange={(e,value) =>
                                        setConstructionGroupID(Number(value))
                                    }
                                    disabled={!editable}
                                >
                                    {constructionGroups.map((entry) => (
                                        <option value={entry.id}>
                                            {entry.grupa}
                                        </option>
                                    ))}
                                </Select>
                            </td>
                            <td>Informacja o postępowaniu</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>Złożony w dniu</td>
                            <td>{inputs.wniosek_data_zlozenia}</td>
                            <td>Forma budownictwa</td>
                            <td colSpan={2}>{inputs.obiekt_forma_budownictwa_id}</td>
                            <td>Upływający czas (w dniach)</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td colSpan={7} className="bg-gray-200">
                                <Accordion>
                                    <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 1,
                                                alignItems: "center",
                                            }}
                                        >
                                            <MdMore />
                                            <strong>Więcej</strong>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Table size="sm">
                                            <thead>
                                                <tr>
                                                    <th colSpan={2} className="bg-gray-200"></th>
                                                    <th colSpan={3} className="bg-gray-200"></th>
                                                    <th colSpan={2} className="bg-gray-200"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Inwestor</td>
                                                    <td>{inputs.wniosek_inwestor_id}</td>
                                                    <td>Planowanie przestrzenne</td>
                                                    <td colSpan={2}>
                                                        {inputs.obiekt_planowanie_przestrzenne_id}
                                                    </td>
                                                    <td colSpan={2} rowSpan={8}>
                                                        <DBTableEdit
                                                            dbEntries={registerAdminActionDBEntries}
                                                            entries={registerAdminActionDBEntries.entries.filter(
                                                                (fEntry) => fEntry.rejestr_id === entry.id
                                                            )}
                                                            headersClassName="bg-gray-200"
                                                            editable={editable}
                                                            emptyEntry={{
                                                                data_odebrania: "",
                                                                data_odpowiedzi: "",
                                                                data_pisma: "",
                                                                id: 0,
                                                                rejestr_id: entry.id,
                                                                termin: 0,
                                                                typ_id: 0,
                                                                wybor: false,
                                                            }}
                                                            headers={[
                                                                "Czynność",
                                                                "Termin [dni]",
                                                                "Data pisma",
                                                                "Data odebrania",
                                                                "Data odpowiedzi",
                                                            ]}
                                                            rowInputsProps={[
                                                                {
                                                                    type: "select",
                                                                    entryKey: "typ_id",
                                                                    selectOptions:
                                                                        adminActionTypeDBEntries.entries.map<MyInputSelectOption>(
                                                                            (entry) => ({
                                                                                value: entry.id,
                                                                                name: entry.typ,
                                                                            })
                                                                        ),
                                                                },
                                                                {
                                                                    type: "number",
                                                                    entryKey: "termin",
                                                                },
                                                                {
                                                                    type: "date",
                                                                    entryKey: "data_pisma",
                                                                },
                                                                {
                                                                    type: "date",
                                                                    entryKey: "data_odebrania",
                                                                },
                                                                {
                                                                    type: "date",
                                                                    entryKey: "data_odpowiedzi",
                                                                },
                                                            ]} 
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>Informacje o inwestorze ...</td>
                                                    <td colSpan={3}>
                                                        <Table size="sm">
                                                            <tr>
                                                                <th className="bg-gray-200">PKOB</th>
                                                                <th className="bg-gray-200">ZL</th>
                                                                <th className="bg-gray-200">Kat.</th>
                                                            </tr>
                                                            <tr>
                                                                <td>{constructionGroup?.pkob}</td>
                                                                <td>{constructionGroup?.klasa_zl}</td>
                                                                <td>{constructionGroup?.kat_ob}</td>
                                                            </tr>
                                                        </Table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Decyzja Starosty Człuchowskiego</td>
                                                    <td>{inputs.wniosek_decyzja_typ}</td>
                                                    <td colSpan={3}>
                                                        <Table size="sm">
                                                            <tr>
                                                                <th className="bg-gray-200">Sekcja</th>
                                                                <th className="bg-gray-200">Dział</th>
                                                                <th className="bg-gray-200">Klasa</th>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Select
                                                                        value={constructionSectionID}
                                                                        onChange={(e, value) =>
                                                                            setConstructionSectionID(Number(value))
                                                                        }
                                                                        disabled={!editable}
                                                                    >
                                                                        {constructionSections.map((entry) => (
                                                                            <option value={entry.id}>
                                                                                {entry.sekcja}
                                                                            </option>
                                                                        ))}
                                                                    </Select>
                                                                </td>
                                                                <td>
                                                                    <Select
                                                                        value={constructionDivisionID}
                                                                        onChange={(e, value) =>
                                                                            setConstructionDivisionID(Number(value))
                                                                        }
                                                                        disabled={!editable}
                                                                    >
                                                                        {constructionDivisions.map((entry) => (
                                                                            <option value={entry.id}>
                                                                                {entry.dzial}
                                                                            </option>
                                                                        ))}
                                                                    </Select>
                                                                </td>
                                                                <td>
                                                                    <Select
                                                                        value={entry.obiekt_klasa_id}
                                                                        onChange={(e, value) =>
                                                                            setEntry({
                                                                                ...entry,
                                                                                obiekt_klasa_id: Number(
                                                                                    value
                                                                                ),
                                                                            })
                                                                        }
                                                                        disabled={!editable}
                                                                    >
                                                                        {constructionClasses.map((entry) => (
                                                                            <option value={entry.id}>
                                                                                {entry.klasa}
                                                                            </option>
                                                                        ))}
                                                                    </Select>
                                                                </td>
                                                            </tr>
                                                        </Table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Numer decyzji</td>
                                                    <td>{inputs.wniosek_decyzja_numer}</td>
                                                    <td colSpan={3} className="text-center"><strong>Dane Nieruchomości</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Wydana w dniu</td>
                                                    <td>{inputs.wniosek_decyzja_data_wydania}</td>
                                                    <td colSpan={3}>
                                                        <Table size="sm">
                                                            <tr>
                                                                <th className="bg-gray-200">Gmina</th>
                                                                <th className="bg-gray-200">Miejscowość</th>
                                                                <th className="bg-gray-200">Obręb</th>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Select
                                                                        value={communeID}
                                                                        onChange={(e, value) =>
                                                                            setCommuneID(Number(value))
                                                                        }
                                                                        disabled={!editable}
                                                                    >
                                                                        {communeDBEntries.entries.map((entry) => (
                                                                            <option value={entry.id}>
                                                                                {entry.nazwa}
                                                                            </option>
                                                                        ))}
                                                                    </Select>
                                                                </td>
                                                                <td>
                                                                    <Select
                                                                        value={placeID}
                                                                        onChange={(e, value) =>
                                                                            setPlaceID(Number(value))
                                                                        }
                                                                        disabled={!editable}
                                                                    >
                                                                        {places.map((entry) => (
                                                                            <option value={entry.id}>
                                                                                {entry.nazwa}
                                                                            </option>
                                                                        ))}
                                                                    </Select>
                                                                </td>
                                                            </tr>
                                                        </Table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Inne rozstrzygnięcia</td>
                                                    <td>{inputs.wniosek_rozstrzygniecie_typ}</td>
                                                    <td colSpan={3}>
                                                        <Table size="sm">
                                                            <tr>
                                                                <th className="bg-gray-200">Jedn. ewid.</th>
                                                                <th className="bg-gray-200">Ulica</th>
                                                                <th className="bg-gray-200">Nr</th>
                                                            </tr>
                                                            <tr>
                                                                <td>{place?.jedn_ewid}</td>
                                                                <td>
                                                                    <Select
                                                                        value={entry.obiekt_ulica_id}
                                                                        onChange={(e, value) =>
                                                                            setEntry({
                                                                                ...entry,
                                                                                obiekt_ulica_id: Number(
                                                                                    value
                                                                                ),
                                                                            })
                                                                        }
                                                                        disabled={!editable}
                                                                    >
                                                                        {streets.map((entry) => (
                                                                            <option value={entry.id}>
                                                                                {entry.nazwa}
                                                                            </option>
                                                                        ))}
                                                                    </Select>
                                                                </td>
                                                                <td>{inputs.obiekt_nr}</td>
                                                            </tr>
                                                        </Table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Numer pisma</td>
                                                    <td>{inputs.wniosek_rozstrzygniecie_numer_pisma}</td>
                                                    <td colSpan={3}>
                                                        <DBTableEdit
                                                            dbEntries={registerInvestPlotDBEntries}
                                                            entries={registerInvestPlotDBEntries.entries.filter(
                                                                (fEntry) =>
                                                                    fEntry.rejestr_id === entry.id
                                                            )}
                                                            headersClassName="bg-gray-200"
                                                            editable={editable}
                                                            emptyEntry={{
                                                                id: 0,
                                                                rejestr_id: entry.id,
                                                                dzialka: "",
                                                            }}
                                                            headers={["Działki objęte inwestycją"]}
                                                            showActionsHeader={false}
                                                            rowInputsProps={[
                                                                {
                                                                    type: "text",
                                                                    entryKey: "dzialka",
                                                                    placeholder: "Działka",
                                                                },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td rowSpan={2}>Wydana w dniu</td>
                                                    <td rowSpan={2}>{inputs.wniosek_rozstrzygniecie_data_wydania}</td>
                                                    <td colSpan={3}>
                                                        <DBTableEdit
                                                            dbEntries={registerBuildTypeDBEntries}
                                                            entries={registerBuildTypeDBEntries.entries.filter(
                                                                (fEntry) =>
                                                                    fEntry.rejestr_id === entry.id
                                                            )}
                                                            headersClassName="bg-gray-200"
                                                            editable={editable}
                                                            emptyEntry={{
                                                                id: 0,
                                                                rejestr_id: entry.id,
                                                                typ_id: 0,
                                                            }}
                                                            headers={["Stany Budowy"]}
                                                            showActionsHeader={false}
                                                            rowInputsProps={[
                                                                {
                                                                    type: "select",
                                                                    entryKey: "typ_id",
                                                                    selectOptions:
                                                                        buildTypeDBEntries.entries.map<MyInputSelectOption>(
                                                                            (typeEntry) => ({
                                                                                value: typeEntry.id,
                                                                                name: typeEntry.typ,
                                                                            })
                                                                        ),
                                                                },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </AccordionDetails>
                                </Accordion>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </td>
    );
}
