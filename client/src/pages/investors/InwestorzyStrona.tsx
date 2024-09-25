import { useContext } from "react";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import DBTableEdit from "../../components/DBTableEdit";
import { DBEntryEndpoint } from "../../App";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { Inwestor } from "../../../../server/src/types";

export default function InwestorzyStrona() {
    const investorDBEntries = useDBEntriesStore<Inwestor>("inwestorzy")();

    console.log("test");

    return (
        <>
            <h1>Inwestorzy</h1>
            <Wyszukiwarka
                fetchWyniki={investorDBEntries.fetchEntries}
                liczbaWynikow={investorDBEntries.entryCount}
            >
                <DBTableEdit
                    dbEntries={investorDBEntries}
                    endpoint={investorDBEntries.endpoint}
                    headers={["ID", "Inwestor", "Adres"]}
                    emptyEntry={{
                        id: 0,
                        adres: "",
                        nazwa: "",
                    }}
                    rowInputInfos={[
                        {
                            type: "number",
                            entryKey: "id",
                            uneditable: true,
                        },
                        {
                            type: "text",
                            entryKey: "nazwa",
                        },
                        {
                            type: "text",
                            entryKey: "adres",
                        },
                    ]}
                />
            </Wyszukiwarka>
        </>
    );
}
