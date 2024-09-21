import { Entries } from "../hooks/useEntries";
import { Ulica } from "../../../server/src/types";
import { createContext } from "react";

const StreetEntriesContext = createContext<Entries<Ulica> | null>(null);

export default StreetEntriesContext;
