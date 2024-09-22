import { DBEntries } from "../hooks/useDBEntries";
import { TypeEntry } from "../../../server/src/types";
import { createContext } from "react";

const MayorDecisionTypeDBEntriesContext =
    createContext<DBEntries<TypeEntry> | null>(null);

export default MayorDecisionTypeDBEntriesContext;
