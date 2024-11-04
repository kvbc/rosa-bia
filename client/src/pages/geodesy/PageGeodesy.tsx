import { DB } from "../../../../server/src/db/types";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import { PageGeodesyContext } from "../../contexts/pages/PageGeodesyContext";
import useDBTable from "../../hooks/useDBTable";
import CommunesDBTableEditRowContent from "./CommunesDBTableEditRowContent";
import React, { ContextType, useMemo } from "react";

export default function PageGeodesy() {
    const communesDBTable = useDBTable<DB.Rows.Commune>("communes");
    const placesDBTable = useDBTable<DB.Rows.Place>("places");
    const streetsDBTable = useDBTable<DB.Rows.Street>("streets");

    const context = useMemo<ContextType<typeof PageGeodesyContext>>(
        () => ({
            placesDBTable,
            streetsDBTable,
        }),
        [placesDBTable, streetsDBTable]
    );

    const communesDefaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Commune>>(
        () => ({
            name: "",
        }),
        []
    );

    const communesRowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.Commune>
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
