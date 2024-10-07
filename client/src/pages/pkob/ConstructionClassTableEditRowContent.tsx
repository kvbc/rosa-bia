import { PKOB } from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";

export default function ConstructionClassTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionClass>) {
    return (
        <>
            <td className="bg-gray-300">{inputs.klasa}</td>
        </>
    );
}
