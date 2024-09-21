import { Miejscowosc } from "../../../../server/src/types";
import TableEdit from "../../components/TableEdit";
import { Events } from "../../components/TableEditRow";
import MiejscowosciTableEditRow from "./MiejscowosciTableEditRow";

export default function MiejscowosciTableEdit({
    entries,
    events,
}: {
    entries: Miejscowosc[];
    events: Events<Miejscowosc>;
}) {
    return (
        <TableEdit
            headers={["ID", "Miejscowość", "Gmina", "Obręb", "Jedn. ewid."]}
        >
            {entries.map((entry) => (
                <MiejscowosciTableEditRow
                    key={entry.id}
                    miejscowosc={entry}
                    events={{
                        onDeleteClicked: events.onDeleteClicked,
                        onSaveClicked: events.onSaveClicked,
                    }}
                />
            ))}
            <MiejscowosciTableEditRow
                events={{
                    onAddClicked: events.onAddClicked,
                }}
            />
        </TableEdit>
    );
}
