import { useContext, useState } from "react";
import { Miejscowosc } from "../../../../server/src/types";
import TableEditRow, { Events, State } from "../../components/TableEditRow";
import CommuneEntriesContext from "../../contexts/CommuneEntriesContext";
import PlaceEntriesContext from "../../contexts/PlaceEntriesContext";

export default function MiejscowosciTableEditRow({
    miejscowosc: _miejscowosc,
    events,
}: {
    miejscowosc?: Miejscowosc;
    events: Events<Miejscowosc>;
}) {
    _miejscowosc = _miejscowosc || {
        id: 0,
        nazwa: "",
        gmina_id: 0,
        jedn_ewid: "",
        obreb_id: 0,
    };

    const [miejscowosc, setMiejscowosc] = useState<Miejscowosc>(_miejscowosc);
    const communeEntries = useContext(CommuneEntriesContext);
    const placeEntries = useContext(PlaceEntriesContext);

    const renderContent = (state: State) => (
        <>
            <td>
                <input
                    type="text"
                    value={miejscowosc.id <= 0 ? "-" : miejscowosc.id}
                    disabled
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Miejscowosc"
                    value={miejscowosc.nazwa}
                    onChange={(e) =>
                        setMiejscowosc((miejscowosc) => ({
                            ...miejscowosc,
                            nazwa: e.target.value,
                        }))
                    }
                    disabled={state == State.Viewing}
                />
            </td>
            <td>
                <select
                    value={miejscowosc.gmina_id}
                    onChange={(e) =>
                        setMiejscowosc((miejscowosc) => ({
                            ...miejscowosc,
                            gmina_id: Number(e.target.value),
                        }))
                    }
                    disabled={state == State.Viewing}
                >
                    {communeEntries?.entries.map((entry) => (
                        <option value={entry.id} key={entry.id}>
                            {entry.nazwa}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select
                    value={miejscowosc.obreb_id}
                    onChange={(e) =>
                        setMiejscowosc((miejscowosc) => ({
                            ...miejscowosc,
                            obreb_id: Number(e.target.value),
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
            <td>
                <input
                    type="text"
                    placeholder="Jedn. ewid."
                    value={miejscowosc.jedn_ewid}
                    onChange={(e) =>
                        setMiejscowosc((miejscowosc) => ({
                            ...miejscowosc,
                            jedn_ewid: e.target.value,
                        }))
                    }
                    disabled={state == State.Viewing}
                />
            </td>
        </>
    );

    return (
        <TableEditRow
            events={events}
            rowData={miejscowosc}
            startRowData={_miejscowosc}
            setRowData={setMiejscowosc}
            renderContent={renderContent}
        />
    );
}
