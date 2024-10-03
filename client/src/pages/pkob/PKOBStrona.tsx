import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { MyInputSelectOption } from "../../components/MyInput";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";

export default function PKOBStrona() {
    const constructionSectionDBEntries =
        useDBEntriesStore<PKOB.ConstructionSection>("sekcje_budowlane")();
    const constructionDivisionDBEntries =
        useDBEntriesStore<PKOB.ConstructionDivision>("dzialy_budowlane")();
    const constructionIntentionDBEntries =
        useDBEntriesStore<PKOB.ConstructionIntention>(
            "zamierzenia_budowlane"
        )();
    const constructionClassDBEntries =
        useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")();

    const buildTypeDBEntries =
        useDBEntriesStore<PKOB.BuildType>("typy_budowy")();
    const constructionFormDBEntries =
        useDBEntriesStore<PKOB.ConstructionForm>("formy_budownictwa")();
    const spatialPlanDBEntries = useDBEntriesStore<PKOB.SpatialPlan>(
        "planowania_przestrzenne"
    )();

    return (
        <>
            <div className="[&>table>tbody>tr]:h-full [&>table>tbody>tr>td]:h-full">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Sekcje Budowlane</th>
                            <th>Działy Budowlane</th>
                            <th>Zamierzenia Budowlane</th>
                            <th>Klasy Budowlane</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={
                                        constructionSectionDBEntries.fetchEntries
                                    }
                                    liczbaWynikow={
                                        constructionSectionDBEntries.entryCount
                                    }
                                >
                                    <DBTableEdit
                                        dbEntries={constructionSectionDBEntries}
                                        headers={["ID", "Sekcja"]}
                                        emptyEntry={{
                                            id: 0,
                                            sekcja: "",
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "sekcja",
                                            },
                                        ]}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={
                                        constructionDivisionDBEntries.fetchEntries
                                    }
                                    liczbaWynikow={
                                        constructionDivisionDBEntries.entryCount
                                    }
                                >
                                    <DBTableEdit
                                        dbEntries={
                                            constructionDivisionDBEntries
                                        }
                                        headers={["ID", "Dział", "Sekcja"]}
                                        emptyEntry={{
                                            id: 0,
                                            dzial: "",
                                            sekcja_id: 0,
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "dzial",
                                            },
                                            {
                                                type: "select",
                                                entryKey: "sekcja_id",
                                                selectOptions:
                                                    constructionSectionDBEntries.entries.map<MyInputSelectOption>(
                                                        (entry) => ({
                                                            value: entry.id,
                                                            name: entry.sekcja,
                                                        })
                                                    ),
                                            },
                                        ]}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={
                                        constructionIntentionDBEntries.fetchEntries
                                    }
                                    liczbaWynikow={
                                        constructionIntentionDBEntries.entryCount
                                    }
                                >
                                    <DBTableEdit
                                        dbEntries={
                                            constructionIntentionDBEntries
                                        }
                                        headers={[
                                            "ID",
                                            "Zamierzenie",
                                            "Dział",
                                            "PKOB",
                                            "Kat. OB",
                                            "Klasa ZL.",
                                        ]}
                                        emptyEntry={{
                                            id: 0,
                                            zamierzenie: "",
                                            dzial_id: 0,
                                            pkob: 0,
                                            kat_ob: "",
                                            klasa_zl: "",
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "zamierzenie",
                                            },
                                            {
                                                type: "select",
                                                entryKey: "dzial_id",
                                                selectOptions:
                                                    constructionDivisionDBEntries.entries.map<MyInputSelectOption>(
                                                        (entry) => ({
                                                            value: entry.id,
                                                            name: entry.dzial,
                                                        })
                                                    ),
                                            },
                                            {
                                                type: "number",
                                                entryKey: "pkob",
                                            },
                                            {
                                                type: "text",
                                                entryKey: "kat_ob",
                                            },
                                            {
                                                type: "text",
                                                entryKey: "klasa_zl",
                                            },
                                        ]}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={
                                        constructionClassDBEntries.fetchEntries
                                    }
                                    liczbaWynikow={
                                        constructionClassDBEntries.entryCount
                                    }
                                >
                                    <DBTableEdit
                                        dbEntries={constructionClassDBEntries}
                                        headers={["ID", "Klasa", "Zamierzenie"]}
                                        emptyEntry={{
                                            id: 0,
                                            klasa: "",
                                            zamierzenie_id: 0,
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "klasa",
                                            },
                                            {
                                                type: "select",
                                                entryKey: "zamierzenie_id",
                                                selectOptions:
                                                    constructionIntentionDBEntries.entries.map<MyInputSelectOption>(
                                                        (entry) => ({
                                                            value: entry.id,
                                                            name: entry.zamierzenie,
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
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>Typy Budowy</th>
                            <th>Formy Budownictwa</th>
                            <th>Planowania Przestrzenne</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={
                                        buildTypeDBEntries.fetchEntries
                                    }
                                    liczbaWynikow={
                                        buildTypeDBEntries.entryCount
                                    }
                                >
                                    <DBTableEdit
                                        dbEntries={buildTypeDBEntries}
                                        headers={["ID", "Typ Budowy"]}
                                        emptyEntry={{
                                            id: 0,
                                            typ: "",
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "typ",
                                            },
                                        ]}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={
                                        constructionFormDBEntries.fetchEntries
                                    }
                                    liczbaWynikow={
                                        constructionFormDBEntries.entryCount
                                    }
                                >
                                    <DBTableEdit
                                        dbEntries={constructionFormDBEntries}
                                        headers={["ID", "Forma Budownictwa"]}
                                        emptyEntry={{
                                            id: 0,
                                            forma: "",
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "forma",
                                            },
                                        ]}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={
                                        spatialPlanDBEntries.fetchEntries
                                    }
                                    liczbaWynikow={
                                        spatialPlanDBEntries.entryCount
                                    }
                                >
                                    <DBTableEdit
                                        dbEntries={spatialPlanDBEntries}
                                        headers={[
                                            "ID",
                                            "Planowanie Przestrzenne",
                                        ]}
                                        emptyEntry={{
                                            id: 0,
                                            planowanie: "",
                                        }}
                                        rowInputsProps={[
                                            {
                                                type: "number",
                                                entryKey: "id",
                                                uneditable: true,
                                            },
                                            {
                                                type: "text",
                                                entryKey: "planowanie",
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
