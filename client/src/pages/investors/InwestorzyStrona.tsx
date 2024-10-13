import useDBEntriesStore from "../../hooks/useDBTableStore";
import DBTableEdit from "../../components/DBTableEdit";
import { DB } from "../../../../server/src/dbTypes";

export default function InwestorzyStrona() {
    const investorDBEntries = useDBEntriesStore<DB.Investor>("investors")();

    return (
        <DBTableEdit
            dbEntries={investorDBEntries}
            headers={["ID", "Inwestor", "Adres", "Informacje"]}
            emptyEntry={{
                id: 0,
                address: "",
                name: "",
                info: "",
            }}
            rowInputsProps={[
                {
                    type: "number",
                    entryKey: "id",
                    uneditable: true,
                },
                {
                    type: "text",
                    entryKey: "name",
                },
                {
                    type: "text",
                    entryKey: "address",
                },
                {
                    type: "text",
                    entryKey: "info",
                },
            ]}
        />
    );
}
