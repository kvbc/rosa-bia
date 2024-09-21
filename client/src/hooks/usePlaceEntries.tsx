import { Miejscowosc } from "../../../server/src/types";
import useEntries from "./useEntries";

export default function usePlaceEntries() {
    return useEntries<Miejscowosc>("miejscowosci");
}
