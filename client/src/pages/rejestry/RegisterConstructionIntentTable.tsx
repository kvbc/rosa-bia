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
import { TableEditRowContentProps } from "../../components/TableEditRow";
import { ReactNode, useEffect, useMemo } from "react";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import DBTableEdit from "../../components/DBTableEdit";
import RegisterPropertyDataTable from "./RegisterPropertyDataTable";
import RegisterInvestPlotsDataTable from "./RegisterInvestPlotsTable";
import RegisterCharParamsTable from "./RegisterCharParamsTable";
import { DB } from "../../../../server/src/dbTypes";

export default function RegisterConstructionIntentTable(
    props: TableEditRowContentProps<DB.Register>
) {
    const { inputs, entry, editable, setEntry } = props;

    const constructionSpecDBEntries = useDBEntriesStore<DB.ConstructionSpec>("construction_specs")(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<DB.ConstructionClass>("construction_classes")(); // prettier-ignore
    const constructionGroupDBEntries = useDBEntriesStore<DB.ConstructionGroup>("construction_groups")(); // prettier-ignore
    const constructionDivisionDBEntries = useDBEntriesStore<DB.ConstructionDivision>("construction_divisions")(); // prettier-ignore
    const placeDBEntries = useDBEntriesStore<DB.Place>("places")(); // prettier-ignore
    const communeDBEntries = useDBEntriesStore<DB.Commune>("communes")(); // prettier-ignore
    const streetDBEntries = useDBEntriesStore<DB.Street>("streets")(); // prettier-ignore

    const constructionSpec = useMemo(() => constructionSpecDBEntries.entries.find((fEntry) => fEntry.id === entry.object_construction_spec_id), [entry.object_construction_spec_id]); // prettier-ignore
    const constructionClass = useMemo(() => constructionClassDBEntries.entries.find((fEntry) => fEntry.id === constructionSpec?.class_id), [constructionSpec]); // prettier-ignore
    const constructionGroup = useMemo(() => constructionGroupDBEntries.entries.find(fEntry => fEntry.id === constructionClass?.group_id), [constructionClass]); // prettier-ignore
    const constructionDivision = useMemo(() => constructionDivisionDBEntries.entries.find(fEntry => fEntry.id === constructionGroup?.division_id), [constructionGroup]); // prettier-ignore
    const street = useMemo(() => streetDBEntries.entries.find(fEntry => fEntry.id === entry.object_street_id), [entry.object_street_id]) // prettier-ignore
    const place = useMemo(() => placeDBEntries.entries.find(fEntry => fEntry.id === street?.place_id), [street]) // prettier-ignore
    const commune = useMemo(() => communeDBEntries.entries.find(fEntry => fEntry.id === place?.commune_id), [place]) // prettier-ignore
    const area = useMemo(() => placeDBEntries.entries.find(fEntry => fEntry.id === place?.area_place_id), [place]) // prettier-ignore

    useEffect(() => setEntry({...entry, _object_construction_class_id: constructionSpec?.class_id ?? 0}), [constructionSpec]); // prettier-ignore
    useEffect(() => setEntry({...entry, _object_construction_group_id: constructionClass?.group_id ?? 0}), [constructionClass]); // prettier-ignore
    useEffect(() => setEntry({...entry, _object_construction_division_id: constructionGroup?.division_id ?? 0}), [constructionGroup]); // prettier-ignore
    useEffect(() => setEntry({...entry, _object_construction_section_id: constructionDivision?.section_id ?? 0}), [constructionDivision]); // prettier-ignore
    useEffect(() => setEntry({...entry, _object_place_id: street?.place_id ?? 0}), [street]) // prettier-ignore
    useEffect(() => setEntry({...entry, _object_commune_id: place?.commune_id ?? 0}), [place]) // prettier-ignore

    const constructionIntentNode: { [key in DB.RegisterType]: ReactNode } = {
        "PnB (6740)": inputs._object_construction_group_id,
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
                    <td rowSpan={entry.type === "BiP (6743.4)" ? 2 : 1}>
                        Nazwa zamierzenia budowlanego
                    </td>
                    <td rowSpan={entry.type === "BiP (6743.4)" ? 2 : 1}>
                        {constructionIntentNode[entry.type]}
                    </td>
                </tr>
                {entry.type !== "BiP (6743.4)" && (
                    <tr>
                        {(entry.type === "PnB (6740)" ||
                            entry.type === "ZRiD (7012)") && (
                            <>
                                <td>Infrastruktura towarzysząca</td>
                                <td>{inputs.object_pnb_acc_infra}</td>
                            </>
                        )}
                        {(entry.type === "PnRozb. (6741)" ||
                            entry.type === "Zg. Rozb. (6743.1)") && (
                            <>
                                <td>Obiekt objęty ochroną konserwatorską</td>
                                <td>
                                    {
                                        inputs.object_demo_under_conservation_protection
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
                {(entry.type === "PnB (6740)" ||
                    entry.type === "ZRiD (7012)") && (
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
                                        <td>
                                            {
                                                inputs._object_construction_section_id
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Dział</th>
                                        <td>
                                            {
                                                inputs._object_construction_division_id
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Grupa</th>
                                        <td>
                                            {
                                                inputs._object_construction_group_id
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Klasa</th>
                                        <td>
                                            {
                                                inputs._object_construction_class_id
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">Wysz.</th>
                                        <td>
                                            {inputs.object_construction_spec_id}
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
                                            {constructionSpec?.zl_class ?? "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">
                                            Kat. Obiektu
                                        </th>
                                        <td>
                                            {constructionSpec?.ob_cat ?? "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">
                                            Forma budownictwa
                                        </th>
                                        <td>
                                            {
                                                inputs.object_construction_form_type
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-100">
                                            Planowanie przestrzenne
                                        </th>
                                        <td>
                                            {inputs.object_spatial_plan_type}
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
                {(entry.type === "PnRozb. (6741)" ||
                    entry.type === "Zg. Rozb. (6743.1)" ||
                    entry.type === "BiP (6743.4)") && (
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
