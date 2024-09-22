import { useContext } from "react";
import { DBEntryEndpoint } from "../../App";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import MayorDecisionTypeDBEntriesContext from "../../contexts/MayorDecisionTypeDBEntriesContext";
import { DBEntries } from "../../hooks/useDBEntries";
import ResolutionTypeDBEntriesContext from "../../contexts/ResolutionTypeDBEntriesContext";
import AdminActionTypeDBEntriesContext from "../../contexts/AdminActionTypeDBEntriesContext";
import RegisterTypeDBEntriesContext from "../../contexts/RegisterTypeDBEntriesContext";
import DBTableEdit from "../../components/DBTableEdit";
import ConfigTableEditRowContent from "./ConfigTableEditRowContent";
import { TypeEntry } from "../../../../server/src/types";
import "./KonfiguracjaStrona.css";

export default function KonfiguracjaStrona() {
    const mayorDecisionTypeDBEntries = useContext(
        MayorDecisionTypeDBEntriesContext
    );
    const resolutionTypeDBEntries = useContext(ResolutionTypeDBEntriesContext);
    const adminActionTypeDBEntries = useContext(
        AdminActionTypeDBEntriesContext
    );
    const registerTypeDBEntries = useContext(RegisterTypeDBEntriesContext);

    if (mayorDecisionTypeDBEntries === null) throw "Error";
    if (resolutionTypeDBEntries === null) throw "Error";
    if (adminActionTypeDBEntries === null) throw "Error";
    if (registerTypeDBEntries === null) throw "Error";

    const entries: {
        dbEntries: DBEntries<TypeEntry>;
        endpoint: DBEntryEndpoint;
        name: string;
    }[] = [
        {
            dbEntries: mayorDecisionTypeDBEntries,
            endpoint: DBEntryEndpoint.MayorDecisionTypes,
            name: "Decyzja Starosty",
        },
        {
            dbEntries: resolutionTypeDBEntries,
            endpoint: DBEntryEndpoint.ResolutionTypes,
            name: "Rozstrzygnięcie",
        },
        {
            dbEntries: adminActionTypeDBEntries,
            endpoint: DBEntryEndpoint.AdminActionTypes,
            name: "Czynność admin.",
        },
        {
            dbEntries: registerTypeDBEntries,
            endpoint: DBEntryEndpoint.RegisterTypes,
            name: "Typ Rejestru",
        },
    ];

    return (
        <>
            <h1>Konfiguracja</h1>
            <div className="config-page">
                <table>
                    <thead>
                        <tr>
                            <th>Decyzje Starosty</th>
                            <th>Rozstrzygnięcia</th>
                            <th>Czynności admin.</th>
                            <th>Typy Rejestrów</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {entries.map((entry) => (
                                <td>
                                    <Wyszukiwarka
                                        fetchWyniki={
                                            entry.dbEntries.fetchEntries
                                        }
                                        liczbaWynikow={
                                            entry.dbEntries.entryCount
                                        }
                                    >
                                        <DBTableEdit
                                            dbEntries={entry.dbEntries}
                                            endpoint={entry.endpoint}
                                            headers={["ID", entry.name]}
                                            rowContentComponent={
                                                ConfigTableEditRowContent
                                            }
                                            emptyEntry={{
                                                id: 0,
                                                typ: "",
                                            }}
                                        />
                                    </Wyszukiwarka>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
