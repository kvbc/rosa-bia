import { DBEntries } from "../hooks/useDBEntries";
import { Inwestor } from "../../../server/src/types";
import { createContext } from "react";

const InvestorEntriesContext = createContext<DBEntries<Inwestor> | null>(null);

export default InvestorEntriesContext;
