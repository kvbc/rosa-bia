import { Inwestor } from "../../../../server/src/types";
import {
    TableEditRowContentProps,
    TableEditRowState,
} from "../../components/TableEditRow";

export default function InvestorTableEditRowContent({
    state,
    setEntry,
    entry,
}: TableEditRowContentProps<Inwestor>) {
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
                    placeholder="Inwestor"
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
                <input
                    type="text"
                    placeholder="Adres"
                    value={entry.adres}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            adres: e.target.value,
                        })
                    }
                    disabled={state == TableEditRowState.Viewing}
                />
            </td>
        </>
    );
}
