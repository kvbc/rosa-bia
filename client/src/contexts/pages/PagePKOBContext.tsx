import { createContext } from "react";
import { DBTable } from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";

export const PagePKOBContext = createContext<{
    constructionSectionsDBTable: DBTable<DB.Rows.ConstructionSection>;
    constructionDivisionsDBTable: DBTable<DB.Rows.ConstructionDivision>;
    constructionGroupsDBTable: DBTable<DB.Rows.ConstructionGroup>;
    constructionClassesDBTable: DBTable<DB.Rows.ConstructionClass>;
    constructionSpecsDBTable: DBTable<DB.Rows.ConstructionSpec>;
} | null>(null);
