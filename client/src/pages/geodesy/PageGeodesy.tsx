import { DBRows } from "../../../../server/src/dbTypes";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowInputsProps } from "../../components/TableEditRow";
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

    const communesDefaultRow = useMemo<DBTableEditDefaultRow<DBRows.Commune>>(
        () => ({
            name: "",
        }),
        []
    );

    const communesRowInputsProps = useMemo<
        TableEditRowInputsProps<DBRows.Commune>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
        ],
        []
    );

    return (
        <PageGeodesyContext.Provider value={context}>
            <DBTableEdit
                dbTable={communesDBTable}
                headers={["Gmina"]}
                defaultRow={communesDefaultRow}
                rowActionButtonOrientation="vertical"
                rowInputsProps={communesRowInputsProps}
                RowContentComponent={CommunesDBTableEditRowContent}
            />
        </PageGeodesyContext.Provider>
    );
}
