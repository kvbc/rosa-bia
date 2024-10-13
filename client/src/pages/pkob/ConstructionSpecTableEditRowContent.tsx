import { Table } from "@mui/joy";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";
import { DBRows } from "../../../../server/src/dbTypes";

export default function ConstructionSpecTableEditRowContent({
    inputs,
    row: entry,
    editable,
    setRow: setEntry,
}: TableEditRowContentComponentProps<DBRows.ConstructionSpec>) {
    return (
        <td className="bg-gray-400">
            <Table size="sm">
                <tr>
                    <th>Nazwa</th>
                    <td>{inputs.name}</td>
                </tr>
                <tr>
                    <th>Kat. OB</th>
                    <td>{inputs.ob_cat}</td>
                </tr>
                <tr>
                    <th>Klasa ZL.</th>
                    <td>{inputs.zl_class}</td>
                </tr>
            </Table>
        </td>
    );
}
