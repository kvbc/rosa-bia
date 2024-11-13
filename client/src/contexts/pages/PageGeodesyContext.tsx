import { createContext } from "react";
import { DBTable } from "@/hooks/useDBTable";
import * as DB from "@shared/db";

export const PageGeodesyContext = createContext<{
    placesDBTable: DBTable<DB.Rows.Place>;
    streetsDBTable: DBTable<DB.Rows.Street>;
} | null>(null);
