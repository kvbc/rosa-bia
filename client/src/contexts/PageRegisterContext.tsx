import { createContext } from "react";
import { DBTable } from "../hooks/useDBTable";
import { DBRows } from "../../../server/src/dbTypes";

export const PageRegisterContext = createContext<{
    registersDBTable: DBTable<DBRows.Register>;
    communesDBTable: DBTable<DBRows.Commune>;
    placesDBTable: DBTable<DBRows.Place>;
    streetsDBTable: DBTable<DBRows.Street>;
    constructionClassesDBTable: DBTable<DBRows.ConstructionClass>;
    constructionSectionsDBTable: DBTable<DBRows.ConstructionSection>;
    constructionGroupsDBTable: DBTable<DBRows.ConstructionGroup>;
    constructionDivisionsDBTable: DBTable<DBRows.ConstructionDivision>;
    constructionSpecsDBTable: DBTable<DBRows.ConstructionSpec>;
    investorsDBTable: DBTable<DBRows.Investor>;
} | null>(null);
