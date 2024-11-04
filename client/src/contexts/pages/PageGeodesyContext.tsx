import { createContext } from "react";
import { DBTable } from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";

export const PageGeodesyContext = createContext<{
    placesDBTable: DBTable<DB.Rows.Place>;
    streetsDBTable: DBTable<DB.Rows.Street>;
} | null>(null);
