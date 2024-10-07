import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionIntentTableEditRowContent from "./ConstructionIntentTableEditRowContent";

export default function ConstructionDivisionTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionDivision>) {
    const constructionIntentionDBEntries = useDBEntriesStore<PKOB.ConstructionIntention>("zamierzenia_budowlane")(); // prettier-ignore

    return (
        <>
            <td className="bg-gray-100">{inputs.dzial}</td>
            <td className="bg-gray-100">
                <DBTableEdit
                    dbEntries={constructionIntentionDBEntries}
                    entries={constructionIntentionDBEntries.entries.filter(
                        (fEntry) => fEntry.dzial_id === entry.id
                    )}
                    editable={editable}
                    showFooter={false}
                    headersClassName="bg-gray-200"
                    rowActionTDClassName="bg-gray-200"
                    headers={[
                        "Zamierzenie Budowlane",
                        "PKOB",
                        "Kat. OB",
                        "Klasa ZL.",
                        "Klasy Budowlane",
                    ]}
                    emptyEntry={{
                        id: constructionIntentionDBEntries.entryCount + 1,
                        zamierzenie: "",
                        dzial_id: entry.id,
                        pkob: 0,
                        kat_ob: "",
                        klasa_zl: "",
                    }}
                    rowInputsProps={[
                        {
                            type: "text",
                            entryKey: "zamierzenie",
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
                    RowContentComponent={ConstructionIntentTableEditRowContent}
                />
            </td>
        </>
    );
}
