import { Gmina } from "../../../../server/src/types";
import {
    TableEditRowContentProps,
    TableEditRowState,
} from "../../components/TableEditRow";

export default function CommuneTableEditRowContent({
    state,
    setEntry,
    entry,
}: TableEditRowContentProps<Gmina>) {
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
        </>
    );
}
