import { DBEntries } from "../hooks/useDBEntries";
import { Gmina } from "../../../server/src/types";
import { createContext } from "react";

const CommuneEntriesContext = createContext<DBEntries<Gmina> | null>(null);

export default CommuneEntriesContext;
