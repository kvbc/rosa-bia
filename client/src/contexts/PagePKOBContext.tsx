import { createContext } from "react";
import { DBTable } from "../hooks/useDBTable";
import { DBRows } from "../../../server/src/dbTypes";

export const PagePKOBContext = createContext<{
    constructionSectionsDBTable: DBTable<DBRows.ConstructionSection>;
    constructionDivisionsDBTable: DBTable<DBRows.ConstructionDivision>;
    constructionGroupsDBTable: DBTable<DBRows.ConstructionGroup>;
    constructionClassesDBTable: DBTable<DBRows.ConstructionClass>;
    constructionSpecsDBTable: DBTable<DBRows.ConstructionSpec>;
} | null>(null);
