import { Entries } from "../hooks/useEntries";
import { Miejscowosc } from "../../../server/src/types";
import { createContext } from "react";

const PlaceEntriesContext = createContext<Entries<Miejscowosc> | null>(null);

export default PlaceEntriesContext;
