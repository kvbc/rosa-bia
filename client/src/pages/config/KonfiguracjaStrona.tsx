import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore, { DBEntries } from "../../hooks/useDBEntriesStore";
import { TypeEntry } from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { FaStamp } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { Scale } from "@mui/icons-material";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

export default function KonfiguracjaStrona() {
    const mayorDecisionTypeDBEntries = useDBEntriesStore<TypeEntry>(
        "typy_decyzji_starosty"
    )();

    const resolutionTypeDBEntries =
        useDBEntriesStore<TypeEntry>("typy_rozstrzygniec")();
    const adminActionTypeDBEntries = useDBEntriesStore<TypeEntry>(
        "typy_czynnosci_admin"
    )();
    const registerTypeDBEntries =
        useDBEntriesStore<TypeEntry>("typy_rejestrow")();

    const entries: {
        dbEntries: DBEntries<TypeEntry>;
        name: string;
    }[] = [
        {
            dbEntries: mayorDecisionTypeDBEntries,
            name: "Decyzja Starosty",
        },
        {
            dbEntries: resolutionTypeDBEntries,
            name: "Rozstrzygnięcie",
        },
        {
            dbEntries: adminActionTypeDBEntries,
            name: "Czynność admin.",
        },
        {
            dbEntries: registerTypeDBEntries,
            name: "Typ Rejestru",
        },
    ];

    return (
        <>
            <Tabs size="sm">
                <TabList>
                    <Tab>
                        <AiOutlineSolution fontSize={20} />
                        Decyzje Starosty
                    </Tab>
                    <Tab>
                        <FaStamp />
                        Rozstrzygnięcia Wniosku
                    </Tab>
                    <Tab>
                        <MdPendingActions fontSize={20} />
                        Czynności administracyjne
                    </Tab>
                    <Tab>
                        <FaFileAlt />
                        Typy Rejestrów
                    </Tab>
                </TabList>
                {entries.map((entry, entryIndex) => (
                    <TabPanel value={entryIndex}>
                        <DBTableEdit
                            dbEntries={entry.dbEntries}
                            headers={[entry.name]}
                            emptyEntry={{
                                id: 0,
                                typ: "",
                            }}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    entryKey: "typ",
                                    placeholder: "Typ",
                                },
                            ]}
                        />
                    </TabPanel>
                ))}
            </Tabs>
        </>
    );
}
