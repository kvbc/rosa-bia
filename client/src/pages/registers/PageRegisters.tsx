import { Heading, Highlight, Separator, Text } from "@chakra-ui/react";
import RegisterTableEdit from "./RegisterTableEdit";
import * as DB from "@shared/db";
import { REGISTER_TYPES } from "@shared/db/rows";
import { Filter } from "@shared/http";
import { useParams } from "react-router-dom";
import { REGISTER_TYPE_DESCRIPTIONS } from "@/constants/registers";
import { AppNavbarLink } from "@/app/navbar/AppNavbarLink";

export type ClientRegister = DB.Rows.Register;

export default function PageRegisters({
    disableRegisterAdding,
}: {
    disableRegisterAdding?: boolean;
}) {
    const { type: registerTypeIndex, year: registerYear } = useParams();
    const registerType =
        Number(registerTypeIndex) > 0
            ? REGISTER_TYPES[Number(registerTypeIndex) - 1]
            : null;

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
        <>
            <Heading>
                <Highlight
                    query={[registerType ?? "", registerYear ?? ""]}
                    styles={{
                        px: "0.5",
                        bg: "blue.subtle",
                        color: "blue.fg",
                    }}
                >
                    {`Rejestry ${registerType ?? ""} ${
                        registerYear ? `z ${registerYear} roku` : ""
                    }`}
                </Highlight>
            </Heading>
            <Separator />
            <br />
            <Text color="gray">
                {registerType && REGISTER_TYPE_DESCRIPTIONS[registerType]}
            </Text>
            <Text color="blue.fg">
                {registerType === "Tymczasowe (6743.5)" && (
                    <AppNavbarLink
                        to="/ZARZADZENIE_STAROSTY_CZLUCHOWSKIEGO_6-2022.pdf"
                        target="_blank"
                    >
                        Zarządzenie
                    </AppNavbarLink>
                )}
            </Text>
            <br />
            <RegisterTableEdit
                disableRowAdding={disableRegisterAdding}
                initialRegistersFilters={[
                    ...(registerTypeIndex && registerType
                        ? [
                              {
                                  key: "type",
                                  operator: "=",
                                  value: registerType,
                              } satisfies Filter,
                          ]
                        : []),
                    ...(registerYear
                        ? [
                              {
                                  key: "app_submission_date",
                                  operator: "like",
                                  value: `%${registerYear}%`,
                              } satisfies Filter,
                          ]
                        : []),
                ]}
            />
        </>
        // </PageRegistersContext.Provider>
    );
}
