import { useState } from "react";
import { Gmina } from "../../../../server/src/types";
import TableEditRow, { Events, State } from "../../components/TableEditRow";

export default function CommuneTableEditRow({
    commune: _commune,
    events,
}: {
    commune?: Gmina;
    events: Events<Gmina>;
}) {
    _commune = _commune || {
        id: 0,
        nazwa: "",
    };

    const [commune, setCommune] = useState<Gmina>(_commune);

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
                    value={commune.nazwa}
                    onChange={(e) =>
                        setCommune((commune) => ({
                            ...commune,
                            nazwa: e.target.value,
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
