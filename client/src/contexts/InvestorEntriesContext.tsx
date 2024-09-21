import { Entries } from "../hooks/useEntries";
import { Inwestor } from "../../../server/src/types";
import { createContext } from "react";

const InvestorEntriesContext = createContext<Entries<Inwestor> | null>(null);

export default InvestorEntriesContext;
