import { Table } from "@mui/joy";
import {
    Miejscowosc,
    Register,
    RegisterInvestPlots,
} from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";

export default function RegisterPropertyDataTable({
    inputs,
    entry,
    editable,
    place,
    area,
    setEntry,
}: {
    place?: Miejscowosc;
    area?: Miejscowosc;
} & TableEditRowContentProps<Register>) {
    const registerInvestPlotDBEntries = useDBEntriesStore<RegisterInvestPlots>("rejestry_dzialki_objete_inwestycja")() // prettier-ignore

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
                                    <td>{inputs._obiekt_gmina_id}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Miejscowość</th>
                                    <td>{inputs._obiekt_miejscowosc_id}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Ulica</th>
                                    <td>{inputs.obiekt_ulica_id}</td>
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
                                    <td>{place?.jedn_ewid}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Obręb</th>
                                    <td>{area?.nazwa}</td>
                                </tr>
                                <tr>
                                    <th className="bg-gray-100">Nr</th>
                                    <td>{entry.obiekt_nr}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}
