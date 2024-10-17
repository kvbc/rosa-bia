import { DBRows } from "../../../../../server/src/dbTypes";
import DBTableEdit from "../../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRow";

export default function RegisterInvestPlotsDataTable({
    inputs,
    row: entry,
    editable,
    setRow: setEntry,
}: TableEditRowContentComponentProps<DBRows.Register>) {
    const registerInvestPlotDBEntries = useDBEntriesStore<DBRows.RegisterInvestPlot>("registers_invest_plots")() // prettier-ignore

    return (
        <DBTableEdit
            dbEntries={registerInvestPlotDBEntries}
            rows={registerInvestPlotDBEntries.rows.filter(
                (fEntry) => fEntry.register_id === entry.id
            )}
            headersClassName="bg-gray-100"
            editable={editable}
            defaultRow={{
                id: 0,
                register_id: entry.id,
                plot: "",
            }}
            headers={["Działki objęte inwestycją"]}
            showActionsHeader={false}
            rowInputsProps={[
                {
                    type: "text",
                    rowKey: "plot",
                    placeholder: "Działka",
                },
            ]}
        />
    );
}
