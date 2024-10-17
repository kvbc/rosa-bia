import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionSectionTableEditRowContent from "./ConstructionSectionTableEditRowContent";
import { DBRows } from "../../../../server/src/dbTypes";
import React, { ContextType, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/PagePKOBContext";
import useDBTable from "../../hooks/useDBTable";
import { TableEditRowInputsProps } from "../../components/TableEditRow";

export default function PagePKOB() {
    const constructionSectionsDBTable = useDBTable<DBRows.ConstructionSection>("construction_sections"); // prettier-ignore
    const constructionDivisionsDBTable = useDBTable<DBRows.ConstructionDivision>("construction_divisions"); // prettier-ignore
    const constructionGroupsDBTable = useDBTable<DBRows.ConstructionGroup>("construction_groups"); // prettier-ignore
    const constructionClassesDBTable = useDBTable<DBRows.ConstructionClass>("construction_classes"); // prettier-ignore
    const constructionSpecsDBTable = useDBTable<DBRows.ConstructionSpec>("construction_specs"); // prettier-ignore

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
        DBTableEditDefaultRow<DBRows.ConstructionSection>
    >(
        () => ({
            name: "",
        }),
        []
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DBRows.ConstructionSection>
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
