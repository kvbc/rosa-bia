import { Gmina } from "../../../server/src/types";
import useEntries from "./useEntries";

export default function useCommuneEntries() {
    return useEntries<Gmina>("gminy");
}
