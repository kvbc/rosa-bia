import { Ulica } from "../../../server/src/types";
import useEntries from "./useEntries";

export default function useStreetEntries() {
    return useEntries<Ulica>("ulice");
}
