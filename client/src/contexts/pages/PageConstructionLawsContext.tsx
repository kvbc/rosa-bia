import { createContext } from "react";
import { DBTable } from "@/hooks/useDBTable";
import * as DB from "@shared/db";

export const PageConstructionLawsContext = createContext<{
    constructionLawIntentsDBTable: DBTable<DB.Rows.ConstructionLawIntent>;
} | null>(null);
