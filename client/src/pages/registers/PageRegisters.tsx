import React, { ContextType, useMemo } from "react";
import { PageRegistersContext } from "@/contexts/pages/PageRegistersContext";
import RegisterTableEdit from "./RegisterTableEdit";
import useDBTable from "@/hooks/useDBTable";
import * as DB from "@shared/db";
import { Filter } from "@server/http/routes/table_rows/get";

export type ClientRegister = DB.Rows.Register;

export default function PageRegisters({
    registersFilters: initialRegistersFilters = [],
    disableRegisterAdding,
}: {
    registersFilters?: Filter[];
    disableRegisterAdding?: boolean;
}) {
    // const registersDBTable = useDBTable<DB.Rows.Register>("registers", initialRegistersFilters); // prettier-ignore
    // const communesDBTable = useDBTable<DB.Rows.Commune>("communes"); // prettier-ignore
    // const placesDBTable = useDBTable<DB.Rows.Place>("places"); // prettier-ignore
    // const streetsDBTable = useDBTable<DB.Rows.Street>('streets'); // prettier-ignore
    // const constructionClassesDBTable = useDBTable<DB.Rows.ConstructionClass>("construction_classes"); // prettier-ignore
    // const constructionSectionsDBTable = useDBTable<DB.Rows.ConstructionSection>("construction_sections"); // prettier-ignore
    // const constructionGroupsDBTable = useDBTable<DB.Rows.ConstructionGroup>("construction_groups"); // prettier-ignore
    // const constructionDivisionsDBTable = useDBTable<DB.Rows.ConstructionDivision>("construction_divisions"); // prettier-ignore
    // const constructionSpecsDBTable = useDBTable<DB.Rows.ConstructionSpec>("construction_specs"); // prettier-ignore
    // const investorsDBTable = useDBTable<DB.Rows.Investor>("investors"); // prettier-ignore
    // const registerPlotsDBTable = useDBTable<DB.Rows.RegisterPlot>("registers_plots"); // prettier-ignore
    // // const registerAdminActionsDBTable = useDBTable<DB.Rows.RegisterAdminAction>("registers_admin_actions"); // prettier-ignore
    // const employeesDBTable = useDBTable<DB.Rows.Employee>("employees");
    // const constructionLawCategoriesDBTable = useDBTable<DB.Rows.ConstructionLawCategory>("construction_law_categories"); // prettier-ignore
    // const constructionLawIntentsDBTable = useDBTable<DB.Rows.ConstructionLawIntent>("construction_law_intents"); // prettier-ignore

    // const context = useMemo<ContextType<typeof PageRegistersContext>>(
    //     () => ({
    //         registersDBTable,
    //         communesDBTable,
    //         placesDBTable,
    //         streetsDBTable,
    //         constructionClassesDBTable,
    //         constructionSectionsDBTable,
    //         constructionGroupsDBTable,
    //         constructionDivisionsDBTable,
    //         constructionSpecsDBTable,
    //         investorsDBTable,
    //         registerPlotsDBTable,
    //         // registerAdminActionsDBTable,
    //         employeesDBTable,
    //         constructionLawCategoriesDBTable,
    //         constructionLawIntentsDBTable,
    //     }),
    //     [
    //         registersDBTable,
    //         communesDBTable,
    //         placesDBTable,
    //         streetsDBTable,
    //         constructionClassesDBTable,
    //         constructionSectionsDBTable,
    //         constructionGroupsDBTable,
    //         constructionDivisionsDBTable,
    //         constructionSpecsDBTable,
    //         investorsDBTable,
    //         registerPlotsDBTable,
    //         // registerAdminActionsDBTable,
    //         employeesDBTable,
    //         constructionLawCategoriesDBTable,
    //         constructionLawIntentsDBTable,
    //     ]
    // );

    return (
        // <PageRegistersContext.Provider value={context}>
        <RegisterTableEdit disableRowAdding={disableRegisterAdding} />
        // </PageRegistersContext.Provider>
    );
}
