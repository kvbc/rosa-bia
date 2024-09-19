import Listing from "../../components/Listing";
import InvestorsTableEdit from "./InvestorsTableEdit";

export default function InwestorzyStrona() {
    return (
        <>
            <h1>Inwestorzy</h1>
            <Listing
                endpoint="inwestorzy"
                renderTableEdit={InvestorsTableEdit}
            />
        </>
    );
}
