import { DBEntries } from "../hooks/useDBEntries";
import { TypeEntry } from "../../../server/src/types";
import { createContext } from "react";

const ResolutionTypeDBEntriesContext =
    createContext<DBEntries<TypeEntry> | null>(null);

export default ResolutionTypeDBEntriesContext;
