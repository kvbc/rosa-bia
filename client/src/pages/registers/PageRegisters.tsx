import React, { ContextType, useMemo } from "react";
import { PageRegistersContext } from "../../contexts/pages/PageRegistersContext";
import RegisterTableEdit from "./RegisterTableEdit";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { MyTable } from "../../components/MyTable";
import { Input } from "@chakra-ui/react";

export default function PageRegisters() {
    const registersDBTable = useDBTable<DB.Rows.Register>("registers"); // prettier-ignore
    const communesDBTable = useDBTable<DB.Rows.Commune>("communes"); // prettier-ignore
    const placesDBTable = useDBTable<DB.Rows.Place>("places"); // prettier-ignore
    const streetsDBTable = useDBTable<DB.Rows.Street>('streets'); // prettier-ignore
    const constructionClassesDBTable = useDBTable<DB.Rows.ConstructionClass>("construction_classes"); // prettier-ignore
    const constructionSectionsDBTable = useDBTable<DB.Rows.ConstructionSection>("construction_sections"); // prettier-ignore
    const constructionGroupsDBTable = useDBTable<DB.Rows.ConstructionGroup>("construction_groups"); // prettier-ignore
    const constructionDivisionsDBTable = useDBTable<DB.Rows.ConstructionDivision>("construction_divisions"); // prettier-ignore
    const constructionSpecsDBTable = useDBTable<DB.Rows.ConstructionSpec>("construction_specs"); // prettier-ignore
    const investorsDBTable = useDBTable<DB.Rows.Investor>("investors"); // prettier-ignore
    const registerPlotsDBTable = useDBTable<DB.Rows.RegisterPlot>("registers_plots"); // prettier-ignore
    const registerAdminActionsDBTable = useDBTable<DB.Rows.RegisterAdminAction>("registers_admin_actions"); // prettier-ignore

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
            {/* <MyTable
                headers={["Yo", "Wassup", "My nigga"]}
                rows={[
                    [
                        "1",
                        <MyTable
                            key="2"
                            headers={["1", "2", "3"]}
                            rows={[["4", "5", "6"]]}
                        />,
                        <Input key="3" variant="outline" />,
                    ],
                ]}
            /> */}
            <RegisterTableEdit />
        </PageRegistersContext.Provider>
    );
}
