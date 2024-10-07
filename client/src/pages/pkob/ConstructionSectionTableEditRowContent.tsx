import { PKOB } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import Table from "@mui/joy/Table";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import ConstructionDivisionTableEditRowContent from "./ConstructionDivisionTableEditRowContent";

export default function ConstructionSectionTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionSection>) {
    const constructionDivisionDBEntries = useDBEntriesStore<PKOB.ConstructionDivision>("dzialy_budowlane")(); // prettier-ignore

    return (
        <>
            <td className="bg-gray-50">{inputs.sekcja}</td>
            <td className="bg-gray-50">
                <DBTableEdit
                    dbEntries={constructionDivisionDBEntries}
                    entries={constructionDivisionDBEntries.entries.filter(
                        (fEntry) => fEntry.sekcja_id === entry.id
                    )}
                    editable={editable}
                    headersClassName="bg-gray-100"
                    rowActionTDClassName="bg-gray-100"
                    headers={[
                        {
                            name: "Dział Budowlany",
                            width: "10%",
                        },
                        "Zamierzenia",
                    ]}
                    showFooter={false}
                    emptyEntry={{
                        id: constructionDivisionDBEntries.entryCount + 1,
                        dzial: "",
                        sekcja_id: entry.id,
                    }}
                    rowInputsProps={[
                        {
                            type: "text",
                            entryKey: "dzial",
                        },
                    ]}
                    RowContentComponent={
                        ConstructionDivisionTableEditRowContent
                    }
                />
            </td>
        </>
    );
}
