import { useContext } from "react";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore, { DBEntries } from "../../hooks/useDBEntriesStore";
import DBTableEdit from "../../components/DBTableEdit";
import { TypeEntry } from "../../../../server/src/types";
import "./KonfiguracjaStrona.css";

export default function KonfiguracjaStrona() {
    const mayorDecisionTypeDBEntries = useDBEntriesStore<TypeEntry>(
        "typy_decyzji_starosty"
    )();

    const resolutionTypeDBEntries =
        useDBEntriesStore<TypeEntry>("typy_rozstrzygniec")();
    const adminActionTypeDBEntries = useDBEntriesStore<TypeEntry>(
        "typy_czynnosci_admin"
    )();
    const registerTypeDBEntries =
        useDBEntriesStore<TypeEntry>("typy_rejestrow")();

    const entries: {
        dbEntries: DBEntries<TypeEntry>;
        name: string;
    }[] = [
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
    ];

    return (
        <>
            <h1>Konfiguracja</h1>
            <div className="config-page">
                <table>
                    <thead>
                        <tr>
                            <th>Decyzje Starosty</th>
                            <th>Rozstrzygnięcia</th>
                            <th>Czynności admin.</th>
                            <th>Typy Rejestrów</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {entries.map((entry) => (
                                <td>
                                    <Wyszukiwarka
                                        fetchWyniki={
                                            entry.dbEntries.fetchEntries
                                        }
                                        liczbaWynikow={
                                            entry.dbEntries.entryCount
                                        }
                                    >
                                        <DBTableEdit
                                            dbEntries={entry.dbEntries}
                                            endpoint={entry.dbEntries.endpoint}
                                            headers={["ID", entry.name]}
                                            emptyEntry={{
                                                id: 0,
                                                typ: "",
                                            }}
                                            rowInputInfos={[
                                                {
                                                    type: "number",
                                                    entryKey: "id",
                                                    uneditable: true,
                                                },
                                                {
                                                    type: "text",
                                                    entryKey: "typ",
                                                    placeholder: "Typ",
                                                },
                                            ]}
                                        />
                                    </Wyszukiwarka>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
