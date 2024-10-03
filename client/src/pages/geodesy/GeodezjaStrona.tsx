import "./GeodezjaStrona.css";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { Gmina, Miejscowosc, Ulica } from "../../../../server/src/types";
import { MyInputSelectOption } from "../../components/MyInput";
import TableEdit from "../../components/TableEdit";
import DBTableEdit from "../../components/DBTableEdit";

export default function GeodezjaStrona() {
    const communeDBEntries = useDBEntriesStore<Gmina>("gminy")();
    const placeDBEntries = useDBEntriesStore<Miejscowosc>("miejscowosci")();
    const streetDBEntries = useDBEntriesStore<Ulica>("ulice")();

    return (
        <>
            <h1>Geodezja</h1>
            <div className="geodezja-strona">
                <table>
                    <thead>
                        <tr>
                            <th>Gminy</th>
                            <th>Miejscowosci</th>
                            <th>Ulice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={communeDBEntries.fetchEntries}
                                    liczbaWynikow={communeDBEntries.entryCount}
                                >
                                    <DBTableEdit
                                        dbEntries={communeDBEntries}
                                        headers={["ID", "Gmina"]}
                                        emptyEntry={{
                                            id: 0,
                                            nazwa: "",
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "nazwa",
                                            },
                                        ]}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={placeDBEntries.fetchEntries}
                                    liczbaWynikow={placeDBEntries.entryCount}
                                >
                                    <DBTableEdit
                                        dbEntries={placeDBEntries}
                                        headers={[
                                            "ID",
                                            "Miejscowość",
                                            "Gmina",
                                            "Obręb",
                                            "Jedn. ewid.",
                                        ]}
                                        emptyEntry={{
                                            id: 0,
                                            gmina_id: 0,
                                            jedn_ewid: "",
                                            nazwa: "",
                                            obreb_id: 0,
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "nazwa",
                                            },
                                            {
                                                type: "select",
                                                entryKey: "gmina_id",
                                                selectOptions:
                                                    communeDBEntries.entries.map<MyInputSelectOption>(
                                                        (entry) => ({
                                                            value: entry.id,
                                                            name: entry.nazwa,
                                                        })
                                                    ),
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
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={streetDBEntries.fetchEntries}
                                    liczbaWynikow={streetDBEntries.entryCount}
                                >
                                    <DBTableEdit
                                        dbEntries={streetDBEntries}
                                        headers={["ID", "Ulica", "Miejscowosc"]}
                                        emptyEntry={{
                                            id: 0,
                                            miejscowosc_id: 0,
                                            nazwa: "",
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "nazwa",
                                            },
                                            {
                                                type: "select",
                                                entryKey: "miejscowosc_id",
                                                selectOptions:
                                                    placeDBEntries.entries.map<MyInputSelectOption>(
                                                        (entry) => ({
                                                            value: entry.id,
                                                            name: entry.nazwa,
                                                        })
                                                    ),
                                            },
                                        ]}
                                    />
                                </Wyszukiwarka>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
