import Listing from "../../components/Listing";
import CommunesTableEdit from "./CommunesTableEdit";

export default function GeodezjaStrona() {
    return (
        <>
            <h1>Geodezja</h1>

            <h2>Gminy</h2>
            <Listing endpoint="gminy" renderTableEdit={CommunesTableEdit} />

            <h2>Miejscowości</h2>

            <h2>Ulice</h2>
        </>
    );
}
