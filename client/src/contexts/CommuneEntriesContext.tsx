import { Entries } from "../hooks/useEntries";
import { Gmina } from "../../../server/src/types";
import { createContext } from "react";

const CommuneEntriesContext = createContext<Entries<Gmina> | null>(null);

export default CommuneEntriesContext;
