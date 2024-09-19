import { Inwestor } from "../../../../server/src/types";
import TableEdit from "../../components/TableEdit";
import { Events } from "../../components/TableEditRow";
import InvestorTableEditRow from "./InvestorTableEditRow";

export default function InvestorsTableEdit({
    entries,
    events,
}: {
    entries: Inwestor[];
    events: Events<Inwestor>;
}) {
    return (
        <TableEdit headers={["ID", "Inwestor", "Adres"]}>
            {entries.map((entry) => (
                <InvestorTableEditRow
                    key={entry.id}
                    inwestor={entry}
                    events={{
                        onDeleteClicked: events.onDeleteClicked,
                        onSaveClicked: events.onSaveClicked,
                    }}
                />
            ))}
            <InvestorTableEditRow
                events={{
                    onAddClicked: events.onAddClicked,
                }}
            />
        </TableEdit>
    );
}
