import { createContext } from "react";
import { DBTable } from "@/hooks/useDBTable";
import * as DB from "@shared/db";

export const PageRegistersContext = createContext<{
    registersDBTable: DBTable<DB.Rows.Register>;
    communesDBTable: DBTable<DB.Rows.Commune>;
    placesDBTable: DBTable<DB.Rows.Place>;
    streetsDBTable: DBTable<DB.Rows.Street>;
    constructionClassesDBTable: DBTable<DB.Rows.ConstructionClass>;
    constructionSectionsDBTable: DBTable<DB.Rows.ConstructionSection>;
    constructionGroupsDBTable: DBTable<DB.Rows.ConstructionGroup>;
    constructionDivisionsDBTable: DBTable<DB.Rows.ConstructionDivision>;
    constructionSpecsDBTable: DBTable<DB.Rows.ConstructionSpec>;
    investorsDBTable: DBTable<DB.Rows.Investor>;
    registerPlotsDBTable: DBTable<DB.Rows.RegisterPlot>;
    registerAdminActionsDBTable: DBTable<DB.Rows.RegisterAdminAction>;
    employeesDBTable: DBTable<DB.Rows.Employee>;
    constructionLawCategoriesDBTable: DBTable<DB.Rows.ConstructionLawCategory>;
    constructionLawIntentsDBTable: DBTable<DB.Rows.ConstructionLawIntent>;
} | null>(null);
