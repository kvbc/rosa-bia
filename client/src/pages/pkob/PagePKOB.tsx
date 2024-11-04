import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionSectionTableEditRowContent from "./ConstructionSectionTableEditRowContent";
import { DB } from "../../../../server/src/db/types";
import React, { ContextType, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/pages/PagePKOBContext";
import useDBTable from "../../hooks/useDBTable";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";

export default function PagePKOB() {
    const constructionSectionsDBTable = useDBTable<DB.Rows.ConstructionSection>("construction_sections"); // prettier-ignore
    const constructionDivisionsDBTable = useDBTable<DB.Rows.ConstructionDivision>("construction_divisions"); // prettier-ignore
    const constructionGroupsDBTable = useDBTable<DB.Rows.ConstructionGroup>("construction_groups"); // prettier-ignore
    const constructionClassesDBTable = useDBTable<DB.Rows.ConstructionClass>("construction_classes"); // prettier-ignore
    const constructionSpecsDBTable = useDBTable<DB.Rows.ConstructionSpec>("construction_specs"); // prettier-ignore

    const context = useMemo<ContextType<typeof PagePKOBContext>>(
        () => ({
            constructionSectionsDBTable,
            constructionDivisionsDBTable,
            constructionClassesDBTable,
            constructionGroupsDBTable,
            constructionSpecsDBTable,
        }),
        [
            constructionSectionsDBTable,
            constructionDivisionsDBTable,
            constructionGroupsDBTable,
            constructionClassesDBTable,
            constructionSpecsDBTable,
        ]
    );

    const defaultRow = useMemo<
        DBTableEditDefaultRow<DB.Rows.ConstructionSection>
    >(
        () => ({
            name: "",
        }),
        []
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionSection>
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
        <PagePKOBContext.Provider value={context}>
            <DBTableEdit
                dbTable={constructionSectionsDBTable}
                headers={["Sekcje Budowlane"]}
                defaultRow={defaultRow}
                rowInputsProps={rowInputsProps}
                RowContentComponent={ConstructionSectionTableEditRowContent}
            />
        </PagePKOBContext.Provider>
    );
}
