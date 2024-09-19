import { useState } from "react";
import { Inwestor } from "../../../../server/src/types";
import TableEditRow, { Events, State } from "../../components/TableEditRow";

export default function InvestorTableEditRow({
    inwestor: _inwestor,
    events,
}: {
    inwestor?: Inwestor;
    events: Events<Inwestor>;
}) {
    _inwestor = _inwestor || {
        id: 0,
        nazwa: "",
        adres: "",
    };

    const [inwestor, setInwestor] = useState<Inwestor>(_inwestor);

    const renderContent = (state: State) => (
        <>
            <td>
                <input
                    type="text"
                    value={inwestor.id <= 0 ? "-" : inwestor.id}
                    disabled
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Inwestor"
                    value={inwestor.nazwa}
                    onChange={(e) =>
                        setInwestor({
                            ...inwestor,
                            nazwa: e.target.value,
                        })
                    }
                    disabled={state == State.Viewing}
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="Adres"
                    value={inwestor.adres}
                    onChange={(e) =>
                        setInwestor({
                            ...inwestor,
                            adres: e.target.value,
                        })
                    }
                    disabled={state == State.Viewing}
                />
            </td>
        </>
    );

    return (
        <TableEditRow
            events={events}
            rowData={inwestor}
            startRowData={_inwestor}
            setRowData={setInwestor}
            renderContent={renderContent}
        />
    );
}
