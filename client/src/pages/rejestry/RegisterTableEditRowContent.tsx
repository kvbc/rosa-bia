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

export default function RegisterTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<Register>) {
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
    const constructionIntentDBEntries = useDBEntriesStore<PKOB.ConstructionIntention>("zamierzenia_budowlane")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")(); // prettier-ignore

    const [communeID, setCommuneID] = useState<number>(0);
    const [placeID, setPlaceID] = useState<number>(0);
    const [constructionSectionID, setConstructionSectionID] = useState<number>(0); // prettier-ignore
    const [constructionDivisionID, setConstructionDivisionID] = useState<number>(0); // prettier-ignore
    const [constructionIntentID, setConstructionIntentID] = useState<number>(0); // prettier-ignore

    const places  = placeDBEntries.entries.filter((entry) => entry.gmina_id === communeID); // prettier-ignore
    const streets = streetDBEntries.entries.filter((entry) => entry.miejscowosc_id === placeID); // prettier-ignore
    const place   = places.find((entry) => entry.id === placeID); // prettier-ignore
    const area    = placeDBEntries.entries.find((entry) => entry.id === place?.obreb_id); // prettier-ignore
    const street  = streets.find(fEntry => fEntry.id === entry.obiekt_ulica_id) // prettier-ignore
    const constructionSections  = constructionSectionDBEntries.entries; // prettier-ignore
    const constructionDivisions = constructionDivisionDBEntries.entries.filter(entry => entry.sekcja_id === constructionSectionID) // prettier-ignore
    const constructionIntents   = constructionIntentDBEntries.entries.filter(entry => entry.dzial_id === constructionDivisionID) // prettier-ignore
    const constructionClasses   = constructionClassDBEntries.entries.filter(entry => entry.zamierzenie_id === constructionIntentID) // prettier-ignore
    const constructionClass    = constructionClasses.find(fEntry => fEntry.id === entry.obiekt_klasa_id) // prettier-ignore
    const constructionDivision = constructionDivisions.find(fEntry => fEntry.id === constructionDivisionID) // prettier-ignore
    const constructionSection  = constructionSections.find(fEntry => fEntry.id === constructionSectionID) // prettier-ignore
    const constructionIntent   = constructionIntents.find(fEntry => fEntry.id === constructionIntentID) // prettier-ignore

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
        const constructionClass = constructionClassDBEntries.entries.find(fEntry => fEntry.id === entry.obiekt_klasa_id) // prettier-ignore
        const constructionIntent = constructionIntentDBEntries.entries.find(fEntry => fEntry.id === constructionClass?.zamierzenie_id) // prettier-ignore
        const constructionDivision = constructionDivisionDBEntries.entries.find(fEntry => fEntry.id === constructionIntent?.dzial_id) // prettier-ignore
        const constructionSection = constructionSectionDBEntries.entries.find(fEntry => fEntry.id === constructionDivision?.sekcja_id) // prettier-ignore

        if (constructionSection?.id)
            setConstructionSectionID(constructionSection.id);
        else
            setConstructionSectionID(
                constructionSections.length > 0 ? constructionSections[0].id : 0
            );

        if(constructionIntent?.id) setConstructionIntentID(constructionIntent.id) // prettier-ignore
        if(constructionDivision?.id) setConstructionDivisionID(constructionDivision.id) // prettier-ignore
    };
    const updateConstructionClass = () => {
        if (!constructionClass && constructionIntentID > 0) {
            if (constructionClasses.length > 0) setEntry({...entry, obiekt_klasa_id: constructionClasses[0].id }) // prettier-ignore
            else setEntry({...entry, obiekt_klasa_id: 0})
        }
    };
    const updateConstructionIntent = () => {
        if(!constructionIntent && constructionDivisionID > 0) {
            if(constructionIntents.length > 0) setConstructionIntentID(constructionIntents[0].id)
            else setConstructionIntentID(0)
        }
    }
    const updateConstructionDivision = () => {
        if(!constructionDivision && constructionSectionID > 0) {
            if(constructionDivisions.length > 0) setConstructionDivisionID(constructionDivisions[0].id)
            else setConstructionDivisionID(0)
        }
    }
    // 
    // todo add more see above
    // 
    useEffect(() => {
        handleConstructionClassUpdated();
        updateConstructionDivision()
        updateConstructionIntent()
        updateConstructionClass();
    }, []);
    useEffect(handleConstructionClassUpdated, [entry.obiekt_klasa_id]);
    useEffect(updateConstructionClass, [constructionClass, constructionIntentID])
    useEffect(updateConstructionDivision, [constructionDivision, constructionSectionID])
    useEffect(updateConstructionIntent, [constructionIntent, constructionDivisionID])

    return (
        <td>
            <table>
                <thead>
                    <tr>
                        <th>Typ Rejestru</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{inputs.typ_id}</td>
                    </tr>
                </tbody>
            </table>

            <div className="flex flex-row">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Dane Wniosku</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Numer wniosku</td>
                            <td>{inputs.wniosek_numer}</td>
                        </tr>
                        <tr>
                            <td>Złożony w dniu</td>
                            <td>{inputs.wniosek_data_zlozenia}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Dane dot. obiektu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nazwa zamierzenia budowlanego</td>
                            <td>
                                <select
                                    value={constructionIntentID}
                                    onChange={(e) =>
                                        setConstructionIntentID(Number(e.target.value))
                                    }
                                    disabled={!editable}
                                >
                                    {constructionIntents.map((entry) => (
                                        <option value={entry.id}>
                                            {entry.zamierzenie}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Forma budownictwa</td>
                            <td>{inputs.obiekt_forma_budownictwa_id}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Postępowanie administracyjne</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Informacja o postępowaniu</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>Upływający czas (w dniach)</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex flex-row items-stretch justify-around">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Inwestor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>{inputs.wniosek_inwestor_id}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Informacje ...</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th colSpan={2}>Decyzja starosty Człuchowskiego</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>{inputs.wniosek_decyzja_typ_id}</td>
                        </tr>
                        <tr>
                            <td>Numer decyzji</td>
                            <td>{inputs.wniosek_decyzja_numer}</td>
                        </tr>
                        <tr>
                            <td>Wydana w dniu</td>
                            <td>{inputs.wniosek_decyzja_data_wydania}</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th colSpan={2}>Inne rozstrzygnięcia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                {inputs.wniosek_rozstrzygniecie_typ_id}
                            </td>
                        </tr>
                        <tr>
                            <td>Numer pisma</td>
                            <td>
                                {inputs.wniosek_rozstrzygniecie_numer_pisma}
                            </td>
                        </tr>
                        <tr>
                            <td>Wydane w dniu</td>
                            <td>
                                {inputs.wniosek_rozstrzygniecie_data_wydania}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td colSpan={4}>Planowanie przestrzenne</td>
                            <td colSpan={2}>
                                {inputs.obiekt_planowanie_przestrzenne_id}
                            </td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th colSpan={2}>PKOB</th>
                            <th colSpan={2}>ZL</th>
                            <th colSpan={2}>Kat.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>{constructionIntent?.pkob}</td>
                            <td colSpan={2}>{constructionIntent?.klasa_zl}</td>
                            <td colSpan={2}>{constructionIntent?.kat_ob}</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th colSpan={2}>Sekcja</th>
                            <th colSpan={2}>Dział</th>
                            <th colSpan={2}>Klasa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <select
                                    value={constructionSectionID}
                                    onChange={(e) =>
                                        setConstructionSectionID(Number(e.target.value))
                                    }
                                    disabled={!editable}
                                >
                                    {constructionSections.map((entry) => (
                                        <option value={entry.id}>
                                            {entry.sekcja}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td colSpan={2}>
                                <select
                                    value={constructionDivisionID}
                                    onChange={(e) =>
                                        setConstructionDivisionID(Number(e.target.value))
                                    }
                                    disabled={!editable}
                                >
                                    {constructionDivisions.map((entry) => (
                                        <option value={entry.id}>
                                            {entry.dzial}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td colSpan={2}>
                                <select
                                    value={entry.obiekt_klasa_id}
                                    onChange={(e) =>
                                        setEntry({
                                            ...entry,
                                            obiekt_klasa_id: Number(
                                                e.target.value
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
                                </select>
                            </td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th colSpan={6}>Dane nieruchomości</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gmina</td>
                            <td>Miejscowość</td>
                            <td>Obręb</td>
                            <td>Jedn. ewid.</td>
                            <td>Ulica</td>
                            <td>Nr</td>
                        </tr>
                        <tr>
                            <td>
                                <select
                                    value={communeID}
                                    onChange={(e) =>
                                        setCommuneID(Number(e.target.value))
                                    }
                                    disabled={!editable}
                                >
                                    {communeDBEntries.entries.map((entry) => (
                                        <option value={entry.id}>
                                            {entry.nazwa}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={placeID}
                                    onChange={(e) =>
                                        setPlaceID(Number(e.target.value))
                                    }
                                    disabled={!editable}
                                >
                                    {places.map((entry) => (
                                        <option value={entry.id}>
                                            {entry.nazwa}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>{area?.nazwa}</td>
                            <td>{place?.jedn_ewid}</td>
                            <td>
                                <select
                                    value={entry.obiekt_ulica_id}
                                    onChange={(e) =>
                                        setEntry({
                                            ...entry,
                                            obiekt_ulica_id: Number(
                                                e.target.value
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
                                </select>
                            </td>
                            <td>{inputs.obiekt_nr}</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <td colSpan={6}>
                                <DBTableEdit
                                    dbEntries={registerInvestPlotDBEntries}
                                    entries={registerInvestPlotDBEntries.entries.filter(
                                        (fEntry) =>
                                            fEntry.rejestr_id === entry.id
                                    )}
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
                    </tbody>
                    {/* <thead>
                        <tr>
                            <th colSpan={6}>Działki objęte inwestycją</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6}>...</td>
                        </tr>
                    </tbody> */}

                    <tbody>
                        <tr>
                            <td colSpan={6}>
                                <DBTableEdit
                                    dbEntries={registerBuildTypeDBEntries}
                                    entries={registerBuildTypeDBEntries.entries.filter(
                                        (fEntry) =>
                                            fEntry.rejestr_id === entry.id
                                    )}
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
                    {/* <thead>
                        <tr>
                            <th colSpan={6}>Stany Budowy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6}>...</td>
                        </tr>
                    </tbody> */}
                </table>

                {/* <table>
                    <thead>
                        <tr>
                            <th>Czynność</th>
                            <th>Wybór</th>
                            <th>Termin [dni]</th>
                            <th>Data pisma</th>
                            <th>Data odebrania</th>
                            <th>Data odpowiedzi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registerAdminActionDBEntries.entries
                            .filter((action) => action.rejestr_id === entry.id)
                            .map((action) => (
                                <tr>
                                    <td>
                                        {
                                            adminActionTypeDBEntries.entries.find(
                                                (actionType) =>
                                                    actionType.id ===
                                                    action.typ_id
                                            )?.typ
                                        }
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={action.wybor}
                                            onChange={() =>
                                                registerAdminActionDBEntries.saveEntry(
                                                    {
                                                        ...action,
                                                        wybor: !action.wybor,
                                                    }
                                                )
                                            }
                                            // todo: give dbEntries functionality to save data on its own maybe
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table> */}
                <DBTableEdit
                    dbEntries={registerAdminActionDBEntries}
                    entries={registerAdminActionDBEntries.entries.filter(
                        (fEntry) => fEntry.rejestr_id === entry.id
                    )}
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
                    // RowContentComponent={({ entry, inputs }) => {
                    //     const actionName =
                    //         adminActionTypeDBEntries.entries.find(
                    //             (typeEntry) => typeEntry.id === entry.typ_id
                    //         )?.typ;
                    //     return (
                    //         <>
                    //             <td>{actionName}</td>
                    //             <td>{inputs.wybor}</td>
                    //             <td>{inputs.termin}</td>
                    //             <td>{inputs.data_pisma}</td>
                    //             <td>{inputs.data_odebrania}</td>
                    //             <td>{inputs.data_odpowiedzi}</td>
                    //         </>
                    //     );
                    // }}
                />
            </div>
        </td>
    );
}
