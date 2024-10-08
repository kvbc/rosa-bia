import { Register, RegisterInvestPlots } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";

export default function RegisterInvestPlotsDataTable({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<Register>) {
    const registerInvestPlotDBEntries = useDBEntriesStore<RegisterInvestPlots>("rejestry_dzialki_objete_inwestycja")() // prettier-ignore

    return (
        <DBTableEdit
            dbEntries={registerInvestPlotDBEntries}
            entries={registerInvestPlotDBEntries.entries.filter(
                (fEntry) => fEntry.rejestr_id === entry.id
            )}
            headersClassName="bg-gray-100"
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
    );
}
