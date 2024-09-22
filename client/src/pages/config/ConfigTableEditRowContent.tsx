import { DBEntry, Gmina, TypeEntry } from "../../../../server/src/types";
import { TableEditEntry } from "../../components/TableEdit";
import {
    TableEditRowContentProps,
    TableEditRowState,
} from "../../components/TableEditRow";

export default function ConfigTableEditRowContent({
    state,
    setEntry,
    entry,
}: TableEditRowContentProps<TypeEntry>) {
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
                    placeholder="Typ"
                    value={entry.typ}
                    onChange={(e) =>
                        setEntry({
                            ...entry,
                            typ: e.target.value,
                        })
                    }
                    disabled={state == TableEditRowState.Viewing}
                />
            </td>
        </>
    );
}
