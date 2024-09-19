import { Gmina } from "../../../../server/src/types";
import TableEdit from "../../components/TableEdit";
import { Events } from "../../components/TableEditRow";
import CommuneTableEditRow from "./CommuneTableEditRow";

export default function CommunesTableEdit({
    entries,
    events,
}: {
    entries: Gmina[];
    events: Events<Gmina>;
}) {
    return (
        <TableEdit headers={["ID", "Gmina"]}>
            {entries.map((commune) => (
                <CommuneTableEditRow
                    key={commune.id}
                    commune={commune}
                    events={{
                        onDeleteClicked: events.onDeleteClicked,
                        onSaveClicked: events.onSaveClicked,
                    }}
                />
            ))}
            <CommuneTableEditRow
                events={{
                    onAddClicked: events.onAddClicked,
                }}
            />
        </TableEdit>
    );
}
