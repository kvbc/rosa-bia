import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { Inwestor } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";

export default function InwestorzyStrona() {
    const investorDBEntries = useDBEntriesStore<Inwestor>("inwestorzy")();

    return (
        <DBTableEdit
            dbEntries={investorDBEntries}
            headers={["ID", "Inwestor", "Adres"]}
            emptyEntry={{
                id: 0,
                adres: "",
                nazwa: "",
            }}
            rowInputsProps={[
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
    );
}
