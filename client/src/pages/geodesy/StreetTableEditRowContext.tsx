import { DB } from "../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";

export default function StreetTableEditRowContent({
    inputs,
    row: entry,
    editable,
    setRow: setEntry,
}: TableEditRowContentComponentProps<DB.Street>) {
    return (
        <>
            <td className="bg-gray-200">{inputs.name}</td>
        </>
    );
}
