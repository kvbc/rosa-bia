import { createContext } from "react";
import { DBTable } from "../hooks/useDBTable";
import { DBRows } from "../../../server/src/dbTypes";

export const PageGeodesyContext = createContext<{
    placesDBTable: DBTable<DBRows.Place>;
    streetsDBTable: DBTable<DBRows.Street>;
} | null>(null);
