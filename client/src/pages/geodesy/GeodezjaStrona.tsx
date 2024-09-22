import { useContext } from "react";
import CommuneEntriesContext from "../../contexts/CommuneEntriesContext";
import PlaceEntriesContext from "../../contexts/PlaceEntriesContext";
import StreetEntriesContext from "../../contexts/StreetEntriesContext";
import "./GeodezjaStrona.css";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import DBTableEdit from "../../components/DBTableEdit";
import { DBEntryEndpoint } from "../../App";
import CommuneTableEditRowContent from "./CommuneTableEditRowContent";
import PlaceTableEditRowContent from "./PlaceTableEditRowContent";
import StreetTableEditRowContent from "./StreetTableEditRowContent";

export default function GeodezjaStrona() {
    const communeDBEntries = useContext(CommuneEntriesContext);
    const placeDBEntries = useContext(PlaceEntriesContext);
    const streetDBEntries = useContext(StreetEntriesContext);

    if (communeDBEntries === null) throw "Error";
    if (placeDBEntries === null) throw "Error";
    if (streetDBEntries === null) throw "Error";

    return (
        <>
            <h1>Geodezja</h1>
            <div className="geodezja-strona">
                <table>
                    <thead>
                        <tr>
                            <th>Gminy</th>
                            <th>Miejscowosci</th>
                            <th>Ulice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={communeDBEntries.fetchEntries}
                                    liczbaWynikow={communeDBEntries.entryCount}
                                >
                                    <DBTableEdit
                                        dbEntries={communeDBEntries}
                                        endpoint={DBEntryEndpoint.Commune}
                                        headers={["ID", "Gmina"]}
                                        rowContentComponent={
                                            CommuneTableEditRowContent
                                        }
                                        emptyEntry={{
                                            id: 0,
                                            nazwa: "",
                                        }}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={placeDBEntries.fetchEntries}
                                    liczbaWynikow={placeDBEntries.entryCount}
                                >
                                    <DBTableEdit
                                        dbEntries={placeDBEntries}
                                        endpoint={DBEntryEndpoint.Place}
                                        headers={[
                                            "ID",
                                            "Miejscowość",
                                            "Gmina",
                                            "Obręb",
                                            "Jedn. ewid.",
                                        ]}
                                        rowContentComponent={
                                            PlaceTableEditRowContent
                                        }
                                        emptyEntry={{
                                            id: 0,
                                            gmina_id: 0,
                                            jedn_ewid: "",
                                            nazwa: "",
                                            obreb_id: 0,
                                        }}
                                    />
                                </Wyszukiwarka>
                            </td>
                            <td>
                                <Wyszukiwarka
                                    fetchWyniki={streetDBEntries.fetchEntries}
                                    liczbaWynikow={streetDBEntries.entryCount}
                                >
                                    <DBTableEdit
                                        dbEntries={streetDBEntries}
                                        endpoint={DBEntryEndpoint.Street}
                                        headers={["ID", "Ulica", "Miejscowosc"]}
                                        rowContentComponent={
                                            StreetTableEditRowContent
                                        }
                                        emptyEntry={{
                                            id: 0,
                                            miejscowosc_id: 0,
                                            nazwa: "",
                                        }}
                                    />
                                </Wyszukiwarka>
                            </td>
                            {/* <td>
                                        <Listing
                                            endpoint="gminy"
                                            entries={communeEntries}
                                            renderTableEdit={CommunesTableEdit}
                                        />
                                    </td>
                                    <td>
                                        <Listing
                                            endpoint="miejscowosci"
                                            entries={placeEntries}
                                            renderTableEdit={
                                                MiejscowosciTableEdit
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Listing
                                            endpoint="ulice"
                                            entries={streetEntries}
                                            renderTableEdit={StreetTableEdit}
                                        />
                                    </td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
