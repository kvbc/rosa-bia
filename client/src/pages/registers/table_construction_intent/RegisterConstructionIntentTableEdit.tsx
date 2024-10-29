/*
 *
 * W pełni obsługiwane typy rejestrów:
 * [x] PnB (6740)
 * [x] PnRozb. (6741)
 * [x] Zg. Rozb. (6743.1)
 * [x] Zg. Zwykłe (6743.2)
 * [x] Zm. Sp. Użytk. (6743.3)
 * [x] BiP (6743.4)
 * [x] ZRiD (7012)
 * [x] Pisma różne (670)
 * [x] Samodz. Lokali (705)
 * [x] Dz. bud
 *
 */

import { Stack, Table } from "@mui/joy";
import React, { ReactNode, useContext, useEffect, useMemo } from "react";
import RegisterPropertyDataTableEdit from "./RegisterPropertyDataTableEdit";
import RegisterPlotsDataTableEdit from "./RegisterPlotsTableEdit";
import RegisterCharParamsTableEdit from "./RegisterCharParamsTableEdit";
import { DB } from "../../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import { PageRegistersContext } from "../../../contexts/PageRegistersContext";

export default function RegisterConstructionIntentTableEdit(
    props: TableEditRowContentComponentProps<DB.Rows.Register> & {
        showMore: boolean;
    }
) {
    const { inputs, row, setRow, showMore } = props;

    const pageContext = useContext(PageRegistersContext);
    if (!pageContext) {
        throw "Error";
    }

    const constructionSpec = useMemo(() => pageContext.constructionSpecsDBTable.rows.find((fEntry) => fEntry.id === row.object_construction_spec_id), [row.object_construction_spec_id, pageContext.constructionSpecsDBTable.rows]); // prettier-ignore
    const constructionClass = useMemo(() => pageContext.constructionClassesDBTable.rows.find((fEntry) => fEntry.id === constructionSpec?.class_id), [constructionSpec, pageContext.constructionClassesDBTable.rows]); // prettier-ignore
    const constructionGroup = useMemo(() => pageContext.constructionGroupsDBTable.rows.find(fEntry => fEntry.id === constructionClass?.group_id), [constructionClass, pageContext.constructionGroupsDBTable.rows]); // prettier-ignore
    const constructionDivision = useMemo(() => pageContext.constructionDivisionsDBTable.rows.find(fEntry => fEntry.id === constructionGroup?.division_id), [constructionGroup, pageContext.constructionDivisionsDBTable.rows]); // prettier-ignore
    const street = useMemo(() => pageContext.streetsDBTable.rows.find(fEntry => fEntry.id === row.object_street_id), [row.object_street_id, pageContext.streetsDBTable.rows]) // prettier-ignore
    const place = useMemo(() => pageContext.placesDBTable.rows.find(fEntry => fEntry.id === street?.place_id), [street, pageContext.placesDBTable.rows]) // prettier-ignore
    // const commune = useMemo(() => pageContext.communesDBTable.rows.find(fEntry => fEntry.id === place?.commune_id), [place, pageContext.communesDBTable.rows]) // prettier-ignore
    const area = useMemo(() => pageContext.placesDBTable.rows.find(fEntry => fEntry.id === place?.area_place_id), [place, pageContext.placesDBTable.rows]) // prettier-ignore

    useEffect(() => setRow(row => ({...row, _object_construction_class_id: constructionSpec?.class_id ?? 0})), [setRow, constructionSpec?.class_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_construction_group_id: constructionClass?.group_id ?? 0})), [setRow, constructionClass?.group_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_construction_division_id: constructionGroup?.division_id ?? 0})), [setRow, constructionGroup?.division_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_construction_section_id: constructionDivision?.section_id ?? 0})), [setRow, constructionDivision?.section_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_place_id: street?.place_id ?? 0})), [setRow, street?.place_id]) // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_commune_id: place?.commune_id ?? 0})), [setRow, place?.commune_id]) // prettier-ignore

    const constructionIntentNode: { [key in DB.Rows.RegisterType]: ReactNode } =
        useMemo(
            () => ({
                // "PnB (6740)": inputs._object_construction_group_id,
                "PnB (6740)": constructionGroup?.name,
                "PnRozb. (6741)": "Rozbiórka budynku",
                "Zg. Rozb. (6743.1)": "Rozbiórka budynku",
                "Zg. Zwykłe (6743.2)": "Budowa...",
                "Zm. Sp. Użytk. (6743.3)": "Zmiana sposobu użytkowania",
                "BiP (6743.4)": "Budowa",
                "ZRiD (7012)": "???",
                "Pisma różne (670)": "???",
                "Samodz. Lokali (705)": "???",
                "Dz. bud": "???",
            }),
            [constructionGroup?.name]
        );

    const showAccompanyInfrastructure =
        row.type === "PnB (6740)" || row.type === "ZRiD (7012)";
    const showUnderConservationProtection =
        row.type === "PnRozb. (6741)" || row.type === "Zg. Rozb. (6743.1)";
    const showUsageChange = row.type === "Zm. Sp. Użytk. (6743.3)";
    const showConstructions =
        row.type === "PnB (6740)" || row.type === "Zm. Sp. Użytk. (6743.3)";
    const showCharParams =
        row.type === "PnRozb. (6741)" ||
        row.type === "Zg. Rozb. (6743.1)" ||
        row.type === "Zg. Zwykłe (6743.2)" ||
        row.type === "BiP (6743.4)";
    const showPropertyData = true;
    const showAppPlots =
        row.type === "Pisma różne (670)" || row.type === "Samodz. Lokali (705)";
    const showPlots: Record<DB.Rows.RegisterPlotType, boolean> = {
        app: showAppPlots,
        invest: !showAppPlots,
        road: row.type === "ZRiD (7012)",
        limited: row.type === "ZRiD (7012)",
    };

    //
    // Top (Always visible)
    //
    const top = (
        <>
            <tr>
                <td rowSpan={showUsageChange ? 2 : 1}>
                    Nazwa zamierzenia budowlanego
                </td>
                <td>{constructionIntentNode[row.type]}</td>
            </tr>
            {showAccompanyInfrastructure && (
                <tr>
                    <td>Infrastruktura towarzysząca</td>
                    <td>{inputs.object_pnb_acc_infra}</td>
                </tr>
            )}
            {showUnderConservationProtection && (
                <tr>
                    <td>Obiekt objęty ochroną konserwatorską</td>
                    <td>{inputs.object_demo_under_conservation_protection}</td>
                </tr>
            )}
            {showUsageChange && (
                <tr>
                    <td>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <div>z</div>
                            {inputs.object_usage_change_from}
                            <div>na</div>
                            {inputs.object_usage_change_to}
                        </Stack>
                    </td>
                </tr>
            )}
        </>
    );

    const body = showMore && (
        <>
            {showConstructions && (
                <tr>
                    <td colSpan={2}>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Geodezja</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Sekcja</th>
                                    <td>
                                        {inputs._object_construction_section_id}
                                    </td>
                                    <th scope="row">PKOB</th>
                                    <td>{constructionClass?.pkob ?? "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Dział</th>
                                    <td>
                                        {
                                            inputs._object_construction_division_id
                                        }
                                    </td>
                                    <th scope="row">Kat. Zag. Ludzi</th>
                                    <td>{constructionSpec?.zl_class ?? "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Grupa</th>
                                    <td>
                                        {inputs._object_construction_group_id}
                                    </td>
                                    <th scope="row">Kat. Obiektu</th>
                                    <td>{constructionSpec?.ob_cat ?? "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Klasa</th>
                                    <td>
                                        {inputs._object_construction_class_id}
                                    </td>
                                    <th scope="row">Forma budownictwa</th>
                                    <td>
                                        {inputs.object_construction_form_type}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Wysz.</th>
                                    <td>
                                        {inputs.object_construction_spec_id}
                                    </td>
                                    <th scope="row">Planowanie przestrzenne</th>
                                    <td>{inputs.object_spatial_plan_type}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </td>
                </tr>
            )}
            {showCharParams && (
                <tr>
                    <td colSpan={2}>
                        <RegisterCharParamsTableEdit {...props} />
                    </td>
                </tr>
            )}
            {showPropertyData && (
                <tr>
                    <td colSpan={2}>
                        <RegisterPropertyDataTableEdit
                            {...props}
                            place={place}
                            area={area}
                        />
                    </td>
                </tr>
            )}
            {(Object.keys(showPlots) as DB.Rows.RegisterPlotType[]).map(
                (plotType) =>
                    showPlots[plotType] && (
                        <tr key={plotType}>
                            <td colSpan={2}>
                                <RegisterPlotsDataTableEdit
                                    {...props}
                                    plotType={plotType}
                                />
                            </td>
                        </tr>
                    )
            )}
        </>
    );

    return (
        <Table size="sm" sx={{ height: "100%" }}>
            <thead>
                <tr>
                    <th colSpan={2}>Zamierzenie Budowlane</th>
                </tr>
            </thead>
            <tbody>
                {top}
                {body}
            </tbody>
        </Table>
    );
}
