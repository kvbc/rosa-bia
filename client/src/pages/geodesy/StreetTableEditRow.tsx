import { useContext, useState } from "react";
import { Ulica } from "../../../../server/src/types";
import TableEditRow, { Events, State } from "../../components/TableEditRow";
import PlaceEntriesContext from "../../contexts/PlaceEntriesContext";

export default function StreetTableEditRow({
    street: _street,
    events,
}: {
    street?: Ulica;
    events: Events<Ulica>;
}) {
    _street = _street || {
        id: 0,
        nazwa: "",
        miejscowosc_id: 0,
    };

    const [street, setStreet] = useState<Ulica>(_street);
    const placeEntries = useContext(PlaceEntriesContext);

    const renderContent = (state: State) => (
        <>
            <td>
                <input
                    type="text"
                    value={street.id <= 0 ? "-" : street.id}
                    disabled
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Gmina"
                    value={street.nazwa}
                    onChange={(e) =>
                        setStreet((street) => ({
                            ...street,
                            nazwa: e.target.value,
                        }))
                    }
                    disabled={state == State.Viewing}
                />
            </td>
            <td>
                <select
                    value={street.miejscowosc_id}
                    onChange={(e) =>
                        setStreet((street) => ({
                            ...street,
                            miejscowosc_id: Number(e.target.value),
                        }))
                    }
                    disabled={state == State.Viewing}
                >
                    {placeEntries?.entries.map((entry) => (
                        <option value={entry.id} key={entry.id}>
                            {entry.nazwa}
                        </option>
                    ))}
                </select>
            </td>
        </>
    );

    return (
        <TableEditRow
            events={events}
            rowData={street}
            startRowData={_street}
            setRowData={setStreet}
            renderContent={renderContent}
        />
    );
}
