import { createContext } from "react";
import { DBTable } from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";

export const PagePrBudContext = createContext<{
    prBudIntentsDBTable: DBTable<DB.Rows.PrBudIntent>;
} | null>(null);
