import { useContext } from "react";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import InvestorEntriesContext from "../../contexts/InvestorEntriesContext";
import DBTableEdit from "../../components/DBTableEdit";
import { DBEntryEndpoint } from "../../App";
import InvestorTableEditRowContent from "./InvestorTableEditRowContent";

export default function InwestorzyStrona() {
    const investorDBEntries = useContext(InvestorEntriesContext)!;

    return (
        <>
            <h1>Inwestorzy</h1>
            <Wyszukiwarka
                fetchWyniki={investorDBEntries.fetchEntries}
                liczbaWynikow={investorDBEntries.entryCount}
            >
                <DBTableEdit
                    dbEntries={investorDBEntries}
                    endpoint={DBEntryEndpoint.Investor}
                    headers={["ID", "Inwestor", "Adres"]}
                    rowContentComponent={InvestorTableEditRowContent}
                    emptyEntry={{
                        id: 0,
                        adres: "",
                        nazwa: "",
                    }}
                />
            </Wyszukiwarka>
        </>
    );
}
