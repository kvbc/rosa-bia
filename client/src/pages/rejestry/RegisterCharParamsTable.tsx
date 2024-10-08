import { Table } from "@mui/joy";
import { Register } from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";

export default function RegisterCharParamsTable(
    props: TableEditRowContentProps<Register>
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
                    <td>{inputs.obiekt_rozbiorka_powierzchnia_zabudowy}</td>
                </tr>
                <tr>
                    <td>Powierzchnia użytkowa [m²]</td>
                    <td>{inputs.obiekt_rozbiorka_powierzchnia_uzytkowa}</td>
                </tr>
                <tr>
                    <td>Kubatura [m³]</td>
                    <td>{inputs.obiekt_rozbiorka_kubatura}</td>
                </tr>
                <tr>
                    <td>Ilość budynków [szt.]</td>
                    <td>{inputs.obiekt_rozbiorka_ilosc_budynkow}</td>
                </tr>
            </tbody>
        </Table>
    );
}
