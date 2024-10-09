import { DB } from "../../../../server/src/dbTypes";
import { TableEditRowContentProps } from "../../components/TableEditRow";

export default function StreetTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<DB.Street>) {
    return (
        <>
            <td className="bg-gray-200">{inputs.name}</td>
        </>
    );
}
