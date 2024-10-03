import { useState } from "react";
import Wyszukiwarka from "../../components/Wyszukiwarka";
import useDBEntriesStore, { DBEntries } from "../../hooks/useDBEntriesStore";
import {
    DBEntry,
    Inwestor,
    Miejscowosc,
    PKOB,
    Register,
    TypeEntry,
    Ulica,
} from "../../../../server/src/types";
import { MyInputSelectOption } from "../../components/MyInput";
import RegisterTableEditRowContent from "./RegisterTableEditRowContent";
import { TableEditRowInputProps } from "../../components/TableEditRow";
import DBTableEdit from "../../components/DBTableEdit";

export default function RejestryStrona() {
    const registerDBEntries = useDBEntriesStore<Register>("rejestry")(); // prettier-ignore
    const registerTypeDBEntries = useDBEntriesStore<TypeEntry>("typy_rejestrow")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")(); // prettier-ignore
    const constructionFormDBEntries = useDBEntriesStore<PKOB.ConstructionForm>("formy_budownictwa")(); // prettier-ignore
    const investorDBEntries = useDBEntriesStore<Inwestor>("inwestorzy")(); // prettier-ignore
    const mayorDecisionDBEntries = useDBEntriesStore<TypeEntry>("typy_decyzji_starosty")(); // prettier-ignore
    const spatialPlanDBEntries = useDBEntriesStore<PKOB.SpatialPlan>('planowania_przestrzenne')(); // prettier-ignore
    const streetDBEntries = useDBEntriesStore<Ulica>('ulice')(); // prettier-ignore
    const resolutionDBEntries = useDBEntriesStore<TypeEntry>('typy_rozstrzygniec')(); // prettier-ignore

    const emptyEntry: Register = {
        id: registerDBEntries.entryCount + 1,
        obiekt_forma_budownictwa_id: 0,
        obiekt_nr: "",
        obiekt_planowanie_przestrzenne_id: 0,
        obiekt_ulica_id: 0,
        obiekt_klasa_id: 0,
        typ_id: 0,
        wniosek_data_zlozenia: "",
        wniosek_decyzja_data_wydania: "",
        wniosek_decyzja_numer: 0,
        wniosek_decyzja_typ_id: 0,
        wniosek_inwestor_id: 0,
        wniosek_numer: 0,
        wniosek_rozstrzygniecie_data_wydania: "",
        wniosek_rozstrzygniecie_numer_pisma: 0,
        wniosek_rozstrzygniecie_typ_id: 0,
    };
    const rowInputsProps: TableEditRowInputProps<Register>[] = [];
    const addInputProps = (
        entryKey: TableEditRowInputProps<Register>["entryKey"],
        type: TableEditRowInputProps<Register>["type"]
    ) => {
        rowInputsProps.push({ type, entryKey });
    };
    const addSelectInputProps = <T extends DBEntry>(
        entryKey: keyof Register,
        dbEntries: DBEntries<T>,
        selectEntryNameKey: keyof T
    ) => {
        rowInputsProps.push({
            type: "select",
            entryKey: entryKey,
            selectOptions: dbEntries.entries.map<MyInputSelectOption>(
                (entry) => ({
                    value: entry.id,
                    name: entry[selectEntryNameKey],
                })
            ),
        });
    };
    addSelectInputProps('obiekt_forma_budownictwa_id', constructionFormDBEntries, 'forma') // prettier-ignore
    addInputProps('obiekt_nr', 'text') // prettier-ignore
    addSelectInputProps("obiekt_planowanie_przestrzenne_id", spatialPlanDBEntries, 'planowanie'); // prettier-ignore
    // addSelectInputProps("obiekt_ulica_id", streetDBEntries, 'nazwa'); // prettier-ignore
    // addSelectInputProps("obiekt_klasa_id", constructionClassDBEntries, 'klasa'); // prettier-ignore
    addSelectInputProps("typ_id", registerTypeDBEntries, 'typ'); // prettier-ignore
    addInputProps('wniosek_data_zlozenia', 'date') // prettier-ignore
    addInputProps('wniosek_decyzja_data_wydania', 'date') // prettier-ignore
    addInputProps('wniosek_decyzja_numer', 'number') // prettier-ignore
    addSelectInputProps("wniosek_decyzja_typ_id", mayorDecisionDBEntries, 'typ'); // prettier-ignore
    addSelectInputProps("wniosek_inwestor_id", investorDBEntries, 'nazwa'); // prettier-ignore
    addInputProps('wniosek_numer', 'number') // prettier-ignore
    addInputProps('wniosek_rozstrzygniecie_data_wydania', 'date') // prettier-ignore
    addInputProps('wniosek_rozstrzygniecie_numer_pisma', 'number') // prettier-ignore
    addSelectInputProps("wniosek_rozstrzygniecie_typ_id", resolutionDBEntries, 'typ'); // prettier-ignore

    return (
        <div id="registers-page">
            <Wyszukiwarka
                fetchWyniki={registerDBEntries.fetchEntries}
                liczbaWynikow={registerDBEntries.entryCount}
            >
                <DBTableEdit
                    dbEntries={registerDBEntries}
                    headers={["Rejestr"]}
                    emptyEntry={emptyEntry}
                    rowInputsProps={rowInputsProps}
                    RowContentComponent={RegisterTableEditRowContent}
                />
            </Wyszukiwarka>
        </div>
    );
}
