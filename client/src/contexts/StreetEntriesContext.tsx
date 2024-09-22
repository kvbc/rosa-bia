import { DBEntries } from "../hooks/useDBEntries";
import { Ulica } from "../../../server/src/types";
import { createContext } from "react";

const StreetEntriesContext = createContext<DBEntries<Ulica> | null>(null);

export default StreetEntriesContext;
