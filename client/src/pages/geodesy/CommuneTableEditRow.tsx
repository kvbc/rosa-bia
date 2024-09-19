import { useState } from "react";
import { Commune } from "../../../../server/src/types";
import TableEditRow, { Events, State } from "../../components/TableEditRow";

export default function CommuneTableEditRow({
    commune: _commune,
    events,
}: {
    commune?: Commune;
    events: Events<Commune>;
}) {
    _commune = _commune || {
        id: 0,
        name: "",
    };

    const [commune, setCommune] = useState<Commune>(_commune);

    const renderContent = (state: State) => (
        <>
            <td>
                <input
                    type="text"
                    value={commune.id <= 0 ? "-" : commune.id}
                    disabled
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Gmina"
                    value={commune.name}
                    onChange={(e) =>
                        setCommune((commune) => ({
                            ...commune,
                            name: e.target.value,
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
            rowData={commune}
            startRowData={_commune}
            setRowData={setCommune}
            renderContent={renderContent}
        />
    );
}
