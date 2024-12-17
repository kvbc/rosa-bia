import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import ConstructionSectionTableEditRowContent from "./ConstructionSectionTableEditRowContent";
import * as DB from "@shared/db";
import { ContextType, useMemo } from "react";
import { PagePKOBContext } from "@/contexts/pages/PagePKOBContext";
import useDBTable from "@/hooks/useDBTable";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";

import { FaBuilding, FaListUl, FaUsers, FaWarehouse } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";

export const ConstructionSectionIcon = FaBuilding;
export const ConstructionDivisionIcon = FaWarehouse;
export const ConstructionGroupIcon = FaUsers;
export const ConstructionClassIcon = FaThList;
export const ConstructionSpecIcon = FaListUl;

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

    const headers = useMemo<TableEditHeader[]>(() => ["Sekcje Budowlane"], []);

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
                headers={headers}
                defaultRow={defaultRow}
                rowInputsProps={rowInputsProps}
                RowContentComponent={ConstructionSectionTableEditRowContent}
            />
        </PagePKOBContext.Provider>
    );
}
