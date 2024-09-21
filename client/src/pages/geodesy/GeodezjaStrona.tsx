import { useState } from "react";
import { Gmina } from "../../../../server/src/types";
import Listing from "../../components/Listing";
import CommunesTableEdit from "./CommunesTableEdit";
import useEntries from "../../hooks/useEntries";
import useCommuneEntries from "../../hooks/useCommuneEntries";
import CommuneEntriesContext from "../../contexts/CommuneEntriesContext";
import usePlaceEntries from "../../hooks/usePlaceEntries";
import MiejscowosciTableEdit from "./MiejscowosciTableEdit";
import PlaceEntriesContext from "../../contexts/PlaceEntriesContext";
import useStreetEntries from "../../hooks/useStreetEntries";
import StreetEntriesContext from "../../contexts/StreetEntriesContext";
import StreetTableEdit from "./StreetTableEdit";

export default function GeodezjaStrona() {
    const communeEntries = useCommuneEntries();
    const placeEntries = usePlaceEntries();
    const streetEntries = useStreetEntries();

    return (
        <>
            <CommuneEntriesContext.Provider value={communeEntries}>
                <PlaceEntriesContext.Provider value={placeEntries}>
                    <StreetEntriesContext.Provider value={streetEntries}>
                        <h1>Geodezja</h1>

                        <h2>Gminy</h2>
                        <Listing
                            endpoint="gminy"
                            entries={communeEntries}
                            renderTableEdit={CommunesTableEdit}
                        />

                        <h2>Miejscowości</h2>
                        <Listing
                            endpoint="miejscowosci"
                            entries={placeEntries}
                            renderTableEdit={MiejscowosciTableEdit}
                        />

                        <h2>Ulice</h2>
                        <Listing
                            endpoint="ulice"
                            entries={streetEntries}
                            renderTableEdit={StreetTableEdit}
                        />
                    </StreetEntriesContext.Provider>
                </PlaceEntriesContext.Provider>
            </CommuneEntriesContext.Provider>
        </>
    );
}
