import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore, { DBEntries } from "../../hooks/useDBEntriesStore";
import { TypeEntry } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";

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
            <div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Decyzje Starosty</th>
                            <th>Rozstrzygnięcia</th>
                            <th>Czynności admin.</th>
                            <th>Typy Rejestrów</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="[&>td]:h-full h-full">
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
