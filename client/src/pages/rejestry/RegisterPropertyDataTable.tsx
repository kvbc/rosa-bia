import { Table } from "@mui/joy";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";
import { DBRows } from "../../../../server/src/dbTypes";

export default function RegisterPropertyDataTable({
    inputs,
    row: entry,
    editable,
    place,
    area,
    setRow: setEntry,
}: {
    place?: DBRows.Place;
    area?: DBRows.Place;
} & TableEditRowContentComponentProps<DBRows.Register>) {
    const registerInvestPlotDBEntries = useDBEntriesStore<DBRows.RegisterInvestPlot>("registers_invest_plots")() // prettier-ignore

    return (
        <Table
            size="sm"
            sx={{
                backgroundColor: "rgb(243 244 246)",
            }}
        >
            <thead>
                <tr>
                    <th colSpan={2}>Dane nieruchomości</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <Table size="sm">
                            <tbody>
                                <tr>
                                    <th className="bg-gray-100">Gmina</th>
                                    <td>{inputs._object_commune_id}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Miejscowość</th>
                                    <td>{inputs._object_place_id}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Ulica</th>
                                    <td>{inputs.object_street_id}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                    <td>
                        <Table
                            size="sm"
                            sx={{
                                height: "100%",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <th className="bg-gray-100">Jedn. ewid.</th>
                                    <td>{place?.cad_unit}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Obręb</th>
                                    <td>{area?.name}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Nr</th>
                                    <td>{entry.object_number}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
