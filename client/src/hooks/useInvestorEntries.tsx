import { Inwestor } from "../../../server/src/types";
import useEntries from "./useEntries";

export default function useInvestorEntries() {
    return useEntries<Inwestor>("inwestorzy");
}
