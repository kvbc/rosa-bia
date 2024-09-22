import { DBEntries } from "../hooks/useDBEntries";
import { Miejscowosc } from "../../../server/src/types";
import { createContext } from "react";

const PlaceEntriesContext = createContext<DBEntries<Miejscowosc> | null>(null);

export default PlaceEntriesContext;
