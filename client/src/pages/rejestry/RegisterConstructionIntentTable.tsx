/*
 *
 * W pełni obsługiwane typy rejestrów:
 * [x] PnB (6740)
 * [x] PnRozb. (6741)
 * [x] Zg. Rozb. (6743.1)
 * [ ] Zg. Zwykłe (6743.2)
 * [ ] Zm. Sp. Użytk. (6743.3)
 * [x] BiP (6743.4)
 * [x] ZRiD (7012)
 * [ ] Pisma różne (670)
 * [ ] Samodz. Lokali (705)
 * [ ] Dz. bud
 *
 */

import { Table } from "@mui/joy";
import {
    Gmina,
    Miejscowosc,
    PKOB,
    Register,
    RegisterInvestPlots,
    RegisterType,
    Ulica,
} from "../../../../server/src/types";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import { ReactNode, useEffect, useMemo } from "react";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import DBTableEdit from "../../components/DBTableEdit";
import RegisterPropertyDataTable from "./RegisterPropertyDataTable";
import RegisterInvestPlotsDataTable from "./RegisterInvestPlotsTable";
import RegisterCharParamsTable from "./RegisterCharParamsTable";

export default function RegisterConstructionIntentTable(
    props: TableEditRowContentProps<Register>
) {
    const { inputs, entry, editable, setEntry } = props;

    const constructionSpecDBEntries = useDBEntriesStore<PKOB.ConstructionSpec>("wyszczegolnienia_budowlane")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<PKOB.ConstructionClass>("klasy_budowlane")(); // prettier-ignore
    const constructionGroupDBEntries = useDBEntriesStore<PKOB.ConstructionGroup>("grupy_budowlane")(); // prettier-ignore
    const constructionDivisionDBEntries = useDBEntriesStore<PKOB.ConstructionDivision>("dzialy_budowlane")(); // prettier-ignore
    const placeDBEntries = useDBEntriesStore<Miejscowosc>("miejscowosci")(); // prettier-ignore
    const communeDBEntries = useDBEntriesStore<Gmina>("gminy")(); // prettier-ignore
    const streetDBEntries = useDBEntriesStore<Ulica>("ulice")(); // prettier-ignore

    const constructionSpec = useMemo(() => constructionSpecDBEntries.entries.find((fEntry) => fEntry.id === entry.obiekt_wyszczegolnienie_id), [entry.obiekt_wyszczegolnienie_id]); // prettier-ignore
    const constructionClass = useMemo(() => constructionClassDBEntries.entries.find((fEntry) => fEntry.id === constructionSpec?.klasa_id), [constructionSpec]); // prettier-ignore
    const constructionGroup = useMemo(() => constructionGroupDBEntries.entries.find(fEntry => fEntry.id === constructionClass?.grupa_id), [constructionClass]); // prettier-ignore
    const constructionDivision = useMemo(() => constructionDivisionDBEntries.entries.find(fEntry => fEntry.id === constructionGroup?.dzial_id), [constructionGroup]); // prettier-ignore
    const street = useMemo(() => streetDBEntries.entries.find(fEntry => fEntry.id === entry.obiekt_ulica_id), [entry.obiekt_ulica_id]) // prettier-ignore
    const place = useMemo(() => placeDBEntries.entries.find(fEntry => fEntry.id === street?.miejscowosc_id), [street]) // prettier-ignore
    const commune = useMemo(() => communeDBEntries.entries.find(fEntry => fEntry.id === place?.gmina_id), [place]) // prettier-ignore
    const area = useMemo(() => placeDBEntries.entries.find(fEntry => fEntry.id === place?.obreb_id), [place]) // prettier-ignore

    useEffect(() => setEntry({...entry, _obiekt_klasa_id: constructionSpec?.klasa_id ?? 0}), [constructionSpec]); // prettier-ignore
    useEffect(() => setEntry({...entry, _obiekt_grupa_id: constructionClass?.grupa_id ?? 0}), [constructionClass]); // prettier-ignore
    useEffect(() => setEntry({...entry, _obiekt_dzial_id: constructionGroup?.dzial_id ?? 0}), [constructionGroup]); // prettier-ignore
    useEffect(() => setEntry({...entry, _obiekt_sekcja_id: constructionDivision?.sekcja_id ?? 0}), [constructionDivision]); // prettier-ignore
    useEffect(() => setEntry({...entry, _obiekt_miejscowosc_id: street?.miejscowosc_id ?? 0}), [street]) // prettier-ignore
    useEffect(() => setEntry({...entry, _obiekt_gmina_id: place?.gmina_id ?? 0}), [place]) // prettier-ignore

    const constructionIntentNode: { [key in RegisterType]: ReactNode } = {
        "PnB (6740)": inputs._obiekt_grupa_id,
        "PnRozb. (6741)": "Rozbiórka budynku",
        "Zg. Rozb. (6743.1)": "Rozbiórka budynku",
        "Zg. Zwykłe (6743.2)": "???",
        "Zm. Sp. Użytk. (6743.3)": "???",
        "BiP (6743.4)": "Budowa",
        "ZRiD (7012)": "???",
        "Pisma różne (670)": "???",
        "Samodz. Lokali (705)": "???",
        "Dz. bud": "???",
    };

    return (
        <Table size="sm" sx={{ height: "100%" }}>
            <thead>
                <tr>
                    <th colSpan={2}>Zamierzenie Budowlane</th>
                </tr>
            </thead>
            <tbody>
                {/* 
                
                Top (always visible)    

                */}
                <tr>
                    <td rowSpan={entry.typ === "BiP (6743.4)" ? 2 : 1}>
                        Nazwa zamierzenia budowlanego
                    </td>
                    <td rowSpan={entry.typ === "BiP (6743.4)" ? 2 : 1}>
                        {constructionIntentNode[entry.typ]}
                    </td>
                </tr>
                {entry.typ !== "BiP (6743.4)" && (
                    <tr>
                        {(entry.typ === "PnB (6740)" ||
                            entry.typ === "ZRiD (7012)") && (
                            <>
                                <td>Infrastruktura towarzysząca</td>
                                <td>
                                    {
                                        inputs.obiekt_pnb_infrastruktura_towarzyszaca
                                    }
                                </td>
                            </>
                        )}
                        {(entry.typ === "PnRozb. (6741)" ||
                            entry.typ === "Zg. Rozb. (6743.1)") && (
                            <>
                                <td>Obiekt objęty ochroną konserwatorską</td>
                                <td>
                                    {
                                        inputs.obiekt_rozbiorka_objety_ochrona_konserwatorska
                                    }
                                </td>
                            </>
                        )}
                    </tr>
                )}
                {/* 
                
                Body (complex)

                */}
                {/* Body :: PnB, ZRiD */}
                {(entry.typ === "PnB (6740)" ||
                    entry.typ === "ZRiD (7012)") && (
                    <>
                        <tr>
                            <td>
                                <Table
                                    size="sm"
                                    sx={{
                                        backgroundColor: "rgb(243 244 246)",
                                    }}
                                >
                                    <tr>
                                        <th className="bg-gray-100">Sekcja</th>
                                        <td>{inputs._obiekt_sekcja_id}</td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Dział</th>
                                        <td>{inputs._obiekt_dzial_id}</td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Grupa</th>
                                        <td>{inputs._obiekt_grupa_id}</td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Klasa</th>
                                        <td>{inputs._obiekt_klasa_id}</td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Wysz.</th>
                                        <td>
                                            {inputs.obiekt_wyszczegolnienie_id}
                                        </td>
                                    </tr>
                                </Table>
                            </td>
                            <td>
                                <Table
                                    size="sm"
                                    sx={{
                                        height: "100%",
                                        backgroundColor: "rgb(243 244 246)",
                                    }}
                                >
                                    <tr>
                                        <th className="bg-gray-100">PKOB</th>
                                        <td>
                                            {constructionClass?.pkob ?? "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">
                                            Kat. Zag. Ludzi
                                        </th>
                                        <td>
                                            {constructionSpec?.klasa_zl ?? "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">
                                            Kat. Obiektu
                                        </th>
                                        <td>
                                            {constructionSpec?.kat_ob ?? "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">
                                            Forma budownictwa
                                        </th>
                                        <td>
                                            {inputs.obiekt_forma_budownictwa_id}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">
                                            Planowanie przestrzenne
                                        </th>
                                        <td>
                                            {
                                                inputs.obiekt_planowanie_przestrzenne_id
                                            }
                                        </td>
                                    </tr>
                                </Table>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <RegisterCharParamsTable {...props} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <RegisterPropertyDataTable
                                    {...props}
                                    place={place}
                                    area={area}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <RegisterInvestPlotsDataTable {...props} />
                            </td>
                        </tr>
                    </>
                )}
                {/* Body :: PnRozb., Zg. Rozb. */}
                {(entry.typ === "PnRozb. (6741)" ||
                    entry.typ === "Zg. Rozb. (6743.1)" ||
                    entry.typ === "BiP (6743.4)") && (
                    <>
                        <tr>
                            <td colSpan={2}>
                                <RegisterCharParamsTable {...props} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <RegisterPropertyDataTable
                                    {...props}
                                    place={place}
                                    area={area}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <RegisterInvestPlotsDataTable {...props} />
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </Table>
    );
}
