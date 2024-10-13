import { DB } from "../../../../server/src/dbTypes";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBTableStore";

export default function RegisterInvestPlotsDataTable({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.Register>) {
    const registerInvestPlotDBEntries = useDBEntriesStore<DB.RegisterInvestPlot>("registers_invest_plots")() // prettier-ignore

    return (
        <DBTableEdit
            dbEntries={registerInvestPlotDBEntries}
            entries={registerInvestPlotDBEntries.rows.filter(
                (fEntry) => fEntry.register_id === entry.id
            )}
            headersClassName="bg-gray-100"
            editable={editable}
            emptyEntry={{
                id: 0,
                register_id: entry.id,
                plot: "",
            }}
            headers={["Działki objęte inwestycją"]}
            showActionsHeader={false}
            rowInputsProps={[
                {
                    type: "text",
                    entryKey: "plot",
                    placeholder: "Działka",
                },
            ]}
        />
    );
}
