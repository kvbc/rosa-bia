import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionClassTableEditRowContent from "./ConstructionClassTableEditRowContent";

export default function ConstructionIntentTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionIntention>) {
    const constructionClassDBEntries =
        useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")();

    return (
        <>
            <td className="bg-gray-200">{inputs.zamierzenie}</td>
            <td className="bg-gray-200">{inputs.pkob}</td>
            <td className="bg-gray-200">{inputs.kat_ob}</td>
            <td className="bg-gray-200">{inputs.klasa_zl}</td>
            <td className="bg-gray-200">
                <DBTableEdit
                    dbEntries={constructionClassDBEntries}
                    entries={constructionClassDBEntries.entries.filter(
                        (fEntry) => fEntry.zamierzenie_id === entry.id
                    )}
                    editable={editable}
                    showFooter={false}
                    headersClassName="bg-gray-300"
                    rowActionTDClassName="bg-gray-300"
                    headers={["Klasa"]}
                    emptyEntry={{
                        id: constructionClassDBEntries.entryCount + 1,
                        klasa: "",
                        zamierzenie_id: entry.id,
                    }}
                    rowInputsProps={[
                        {
                            type: "text",
                            entryKey: "klasa",
                        },
                    ]}
                    RowContentComponent={ConstructionClassTableEditRowContent}
                />
            </td>
        </>
    );
}
