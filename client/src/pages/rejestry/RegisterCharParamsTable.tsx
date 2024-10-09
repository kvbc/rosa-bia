import { Table } from "@mui/joy";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import { DB } from "../../../../server/src/dbTypes";

export default function RegisterCharParamsTable(
    props: TableEditRowContentProps<DB.Register>
) {
    const { inputs, entry, editable, setEntry } = props;

    return (
        <Table size="sm" sx={{ height: "100%" }}>
            <thead>
                <tr>
                    <th colSpan={2}>Charakterystyczne parametry</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Powierzchnia zabudowy [m²]</td>
                    <td>{inputs.object_demo_building_area}</td>
                </tr>
                <tr>
                    <td>Powierzchnia użytkowa [m²]</td>
                    <td>{inputs.object_demo_usable_area}</td>
                </tr>
                <tr>
                    <td>Kubatura [m³]</td>
                    <td>{inputs.object_demo_volume}</td>
                </tr>
                <tr>
                    <td>Ilość budynków [szt.]</td>
                    <td>{inputs.object_demo_building_count}</td>
                </tr>
            </tbody>
        </Table>
    );
}
