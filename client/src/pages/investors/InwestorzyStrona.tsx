import Listing from "../../components/Listing";
import useInvestorEntries from "../../hooks/useInvestorEntries";
import InvestorsTableEdit from "./InvestorsTableEdit";

export default function InwestorzyStrona() {
    const investorEntries = useInvestorEntries();

    return (
        <>
            <h1>Inwestorzy</h1>
            <Listing
                endpoint="inwestorzy"
                entries={investorEntries}
                renderTableEdit={InvestorsTableEdit}
            />
        </>
    );
}
