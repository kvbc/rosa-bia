import React, { ContextType, useMemo } from "react";
import { PageRegistersContext } from "../../contexts/PageRegistersContext";
import RegisterTableEdit from "./RegisterTableEdit";
import useDBTable from "../../hooks/useDBTable";
import { DBRows } from "../../../../server/src/dbTypes";

// TODO: add construction journal
export default function PageRegisters() {
    const registersDBTable = useDBTable<DBRows.Register>("registers"); // prettier-ignore
    const communesDBTable = useDBTable<DBRows.Commune>("communes"); // prettier-ignore
    const placesDBTable = useDBTable<DBRows.Place>("places"); // prettier-ignore
    const streetsDBTable = useDBTable<DBRows.Street>('streets'); // prettier-ignore
    const constructionClassesDBTable = useDBTable<DBRows.ConstructionClass>("construction_classes"); // prettier-ignore
    const constructionSectionsDBTable = useDBTable<DBRows.ConstructionSection>("construction_sections"); // prettier-ignore
    const constructionGroupsDBTable = useDBTable<DBRows.ConstructionGroup>("construction_groups"); // prettier-ignore
    const constructionDivisionsDBTable = useDBTable<DBRows.ConstructionDivision>("construction_divisions"); // prettier-ignore
    const constructionSpecsDBTable = useDBTable<DBRows.ConstructionSpec>("construction_specs"); // prettier-ignore
    const investorsDBTable = useDBTable<DBRows.Investor>("investors"); // prettier-ignore
    const registerPlotsDBTable = useDBTable<DBRows.RegisterPlot>("registers_plots"); // prettier-ignore
    const registerAdminActionsDBTable = useDBTable<DBRows.RegisterAdminAction>("registers_admin_actions"); // prettier-ignore

    const context = useMemo<ContextType<typeof PageRegistersContext>>(
        () => ({
            registersDBTable,
            communesDBTable,
            placesDBTable,
            streetsDBTable,
            constructionClassesDBTable,
            constructionSectionsDBTable,
            constructionGroupsDBTable,
            constructionDivisionsDBTable,
            constructionSpecsDBTable,
            investorsDBTable,
            registerPlotsDBTable,
            registerAdminActionsDBTable,
        }),
        [
            registersDBTable,
            communesDBTable,
            placesDBTable,
            streetsDBTable,
            constructionClassesDBTable,
            constructionSectionsDBTable,
            constructionGroupsDBTable,
            constructionDivisionsDBTable,
            constructionSpecsDBTable,
            investorsDBTable,
            registerPlotsDBTable,
            registerAdminActionsDBTable,
        ]
    );

    return (
        <PageRegistersContext.Provider value={context}>
            <div>
                <RegisterTableEdit />
            </div>
        </PageRegistersContext.Provider>
    );
}
