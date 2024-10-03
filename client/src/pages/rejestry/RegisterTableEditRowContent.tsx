import {
    Register,
    RegisterAdminActions,
    RegisterBuildTypes,
    RegisterInvestPlots,
    TypeEntry,
} from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { MyInputSelectOption } from "../../components/MyInput";
import TableEdit from "../../components/TableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";

export default function RegisterTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<Register>) {
    const adminActionTypeDBEntries = useDBEntriesStore<TypeEntry>('typy_czynnosci_admin')(); // prettier-ignore
    const registerAdminActionDBEntries = useDBEntriesStore<RegisterAdminActions>("rejestry_czynnosci_admin")(); // prettier-ignore
    const registerInvestPlotDBEntries = useDBEntriesStore<RegisterInvestPlots>("rejestry_dzialki_objete_inwestycja")(); // prettier-ignore
    const registerBuildTypeDBEntries = useDBEntriesStore<RegisterBuildTypes>("rejestry_typy_budowy")(); // prettier-ignore
    const buildTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_budowy")(); // prettier-ignore

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
                            <td>TODO</td>
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

            <div className="flex flex-row items-stretch justify-stretch">
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
                            <td colSpan={2}>TODO</td>
                            <td colSpan={2}>TODO</td>
                            <td colSpan={2}>TODO</td>
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
                            <td colSpan={2}>TODO</td>
                            <td colSpan={2}>TODO</td>
                            <td colSpan={2}>{inputs.obiekt_klasa_id}</td>
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
                            <td>TODO</td>
                            <td>TODO</td>
                            <td>TODO</td>
                            <td>TODO</td>
                            <td>{inputs.obiekt_ulica_id}</td>
                            <td>{inputs.obiekt_nr}</td>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <td colSpan={6}>
                                <TableEdit
                                    // dbEntries={registerInvestPlotDBEntries}
                                    entries={registerInvestPlotDBEntries.entries.filter(
                                        (fEntry) =>
                                            fEntry.rejestr_id === entry.id
                                    )}
                                    events={{
                                        onEntryAddClicked(entry) {},
                                        onEntryDeleteClicked(entry) {},
                                        onEntrySaveClicked(entry) {},
                                        // onEntryAddClicked(entry) {
                                        //     const dbEntries =
                                        //         registerInvestPlotDBEntries;
                                        //     dbEntries.setEntries([
                                        //         ...dbEntries.entries,
                                        //         {
                                        //             ...entry,
                                        //             id: dbEntries.entryCount,
                                        //         },
                                        //     ]);
                                        // },
                                    }}
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
                                <TableEdit
                                    //
                                    // IMPORTANT: TODO: !!!!
                                    // DBTableEdit nie zawsze powinno odrazu zapisywac,
                                    // tylko zapisywac jesli zapisze sie outer DBTableEdit
                                    //
                                    // dbEntries={registerBuildTypeDBEntries}
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
