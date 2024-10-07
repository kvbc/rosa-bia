import { PKOB, Ulica } from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";

export default function StreetTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<Ulica>) {
    return (
        <>
            <td className="bg-gray-200">{inputs.nazwa}</td>
        </>
    );
}
