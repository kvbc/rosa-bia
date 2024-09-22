import { useContext } from "react";
import { Ulica } from "../../../../server/src/types";
import {
    TableEditRowContentProps,
    TableEditRowState,
} from "../../components/TableEditRow";
import PlaceEntriesContext from "../../contexts/PlaceEntriesContext";

export default function StreetTableEditRowContent({
    state,
    setEntry,
    entry,
}: TableEditRowContentProps<Ulica>) {
    const placeDBEntries = useContext(PlaceEntriesContext);

    return (
        <>
            <td>
                <input
                    type="text"
                    value={entry.id <= 0 ? "-" : entry.id}
                    disabled
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Gmina"
                    value={entry.nazwa}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            nazwa: e.target.value,
                        })
                    }
                    disabled={state == TableEditRowState.Viewing}
                />
            </td>
            <td>
                <select
                    value={entry.miejscowosc_id}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            miejscowosc_id: Number(e.target.value),
                        })
                    }
                    disabled={state == TableEditRowState.Viewing}
                >
                    {placeDBEntries?.entries.map((entry) => (
                        <option value={entry.id} key={entry.id}>
                            {entry.nazwa}
                        </option>
                    ))}
                </select>
            </td>
        </>
    );
}
