import { DBRows } from "../../../../server/src/dbTypes";
import DBTableEdit from "../../components/DBTableEdit";
import { PageGeodesyContext } from "../../contexts/PageGeodesyContext";
import useDBTable from "../../hooks/useDBTable";
import CommunesDBTableEditRowContent from "./CommunesDBTableEditRowContent";
import React, { ContextType, useMemo } from "react";

export default function PageGeodesy() {
    const communesDBTable = useDBTable<DBRows.Commune>("communes");
    const placesDBTable = useDBTable<DBRows.Place>("places");
    const streetsDBTable = useDBTable<DBRows.Street>("streets");

    const context = useMemo<ContextType<typeof PageGeodesyContext>>(
        () => ({
            placesDBTable,
            streetsDBTable,
        }),
        [placesDBTable, streetsDBTable]
    );

    return (
        <PageGeodesyContext.Provider value={context}>
            <DBTableEdit
                dbTable={communesDBTable}
                headers={["Gmina"]}
                defaultRow={{
                    name: "",
                }}
                rowInputsProps={[
                    {
                        type: "text",
                        rowKey: "name",
                    },
                ]}
                RowContentComponent={CommunesDBTableEditRowContent}
            />
        </PageGeodesyContext.Provider>
    );
}
