import { Table } from "@mui/joy";
import { PKOB } from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";

export default function ConstructionSpecTableEditRowContent({
    inputs,
    entry,
    editable,
    setEntry,
}: TableEditRowContentProps<PKOB.ConstructionSpec>) {
    return (
        <td className="bg-gray-400">
            <Table size="sm">
                <tr>
                    <th>Nazwa</th>
                    <td>{inputs.nazwa}</td>
                </tr>
                <tr>
                    <th>Kat. OB</th>
                    <td>{inputs.kat_ob}</td>
                </tr>
                <tr>
                    <th>Klasa ZL.</th>
                    <td>{inputs.klasa_zl}</td>
                </tr>
            </Table>
        </td>
    );
}
