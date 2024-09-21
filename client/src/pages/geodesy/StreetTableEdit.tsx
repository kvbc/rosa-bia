import { Ulica } from "../../../../server/src/types";
import TableEdit from "../../components/TableEdit";
import { Events } from "../../components/TableEditRow";
import StreetTableEditRow from "./StreetTableEditRow";

export default function StreetTableEdit({
    entries,
    events,
}: {
    entries: Ulica[];
    events: Events<Ulica>;
}) {
    return (
        <TableEdit headers={["ID", "Ulica", "Miejscowosc"]}>
            {entries.map((street) => (
                <StreetTableEditRow
                    key={street.id}
                    street={street}
                    events={{
                        onDeleteClicked: events.onDeleteClicked,
                        onSaveClicked: events.onSaveClicked,
                    }}
                />
            ))}
            <StreetTableEditRow
                events={{
                    onAddClicked: events.onAddClicked,
                }}
            />
        </TableEdit>
    );
}
