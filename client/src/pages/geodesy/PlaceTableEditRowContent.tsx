import { useContext } from "react";
import { Miejscowosc } from "../../../../server/src/types";
import {
    TableEditRowContentProps,
    TableEditRowState,
} from "../../components/TableEditRow";
import CommuneEntriesContext from "../../contexts/CommuneEntriesContext";
import PlaceEntriesContext from "../../contexts/PlaceEntriesContext";

export default function PlaceTableEditRowContent({
    state,
    setEntry,
    entry,
}: TableEditRowContentProps<Miejscowosc>) {
    const communeDBEntries = useContext(CommuneEntriesContext);
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
                    placeholder="Miejscowosc"
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
                    value={entry.gmina_id}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            gmina_id: Number(e.target.value),
                        })
                    }
                    disabled={state == TableEditRowState.Viewing}
                >
                    {communeDBEntries?.entries.map((entry) => (
                        <option value={entry.id} key={entry.id}>
                            {entry.nazwa}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select
                    value={entry.obreb_id}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            obreb_id: Number(e.target.value),
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
            <td>
                <input
                    type="text"
                    placeholder="Jedn. ewid."
                    value={entry.jedn_ewid}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            jedn_ewid: e.target.value,
                        })
                    }
                    disabled={state == TableEditRowState.Viewing}
                />
            </td>
        </>
    );
}
