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

import { Stack } from "@mui/joy";
import React, { ReactNode, useContext, useEffect, useMemo } from "react";
import RegisterPropertyDataTableEdit from "./RegisterPropertyDataTableEdit";
import RegisterPlotsDataTableEdit from "./RegisterPlotsTableEdit";
import RegisterCharParamsTableEdit from "./RegisterCharParamsTableEdit";
import { DBRows } from "../../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import { PageRegistersContext } from "../../../contexts/PageRegistersContext";
import MyTableTR from "../../../components/MyTableTR";
import MyTableTH from "../../../components/MyTableth";
import MyTableTD from "../../../components/MyTableTD";
import MyTable from "../../../components/MyTable";

export default function RegisterConstructionIntentTableEdit(
    props: TableEditRowContentComponentProps<DBRows.Register> & {
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

    const constructionIntentNode: { [key in DBRows.RegisterType]: ReactNode } =
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
    const showPlots: Record<DBRows.RegisterPlotType, boolean> = {
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
            <MyTableTR>
                <MyTableTD rowSpan={showUsageChange ? 2 : 1}>
                    Nazwa zamierzenia budowlanego
                </MyTableTD>
                <MyTableTD>{constructionIntentNode[row.type]}</MyTableTD>
            </MyTableTR>
            {showAccompanyInfrastructure && (
                <MyTableTR>
                    <MyTableTD>Infrastruktura towarzysząca</MyTableTD>
                    <MyTableTD>{inputs.object_pnb_acc_infra}</MyTableTD>
                </MyTableTR>
            )}
            {showUnderConservationProtection && (
                <MyTableTR>
                    <MyTableTD>Obiekt objęty ochroną konserwatorską</MyTableTD>
                    <MyTableTD>
                        {inputs.object_demo_under_conservation_protection}
                    </MyTableTD>
                </MyTableTR>
            )}
            {showUsageChange && (
                <MyTableTR>
                    <MyTableTD>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <div>z</div>
                            {inputs.object_usage_change_from}
                            <div>na</div>
                            {inputs.object_usage_change_to}
                        </Stack>
                    </MyTableTD>
                </MyTableTR>
            )}
        </>
    );

    const body = showMore && (
        <>
            {showConstructions && (
                <MyTableTR>
                    <MyTableTD colSpan={2}>
                        <MyTable size="sm">
                            <thead>
                                <MyTableTR>
                                    <MyTableTH colSpan={4}>Geodezja</MyTableTH>
                                </MyTableTR>
                            </thead>
                            <tbody>
                                <MyTableTR>
                                    <MyTableTH>Sekcja</MyTableTH>
                                    <MyTableTD>
                                        {inputs._object_construction_section_id}
                                    </MyTableTD>
                                    <MyTableTH>PKOB</MyTableTH>
                                    <MyTableTD>
                                        {constructionClass?.pkob ?? "-"}
                                    </MyTableTD>
                                </MyTableTR>
                                <MyTableTR>
                                    <MyTableTH>Dział</MyTableTH>
                                    <MyTableTD>
                                        {
                                            inputs._object_construction_division_id
                                        }
                                    </MyTableTD>
                                    <MyTableTH>Kat. Zag. Ludzi</MyTableTH>
                                    <MyTableTD>
                                        {constructionSpec?.zl_class ?? "-"}
                                    </MyTableTD>
                                </MyTableTR>
                                <MyTableTR>
                                    <MyTableTH>Grupa</MyTableTH>
                                    <MyTableTD>
                                        {inputs._object_construction_group_id}
                                    </MyTableTD>
                                    <MyTableTH>Kat. Obiektu</MyTableTH>
                                    <MyTableTD>
                                        {constructionSpec?.ob_cat ?? "-"}
                                    </MyTableTD>
                                </MyTableTR>
                                <MyTableTR>
                                    <MyTableTH>Klasa</MyTableTH>
                                    <MyTableTD>
                                        {inputs._object_construction_class_id}
                                    </MyTableTD>
                                    <MyTableTH>Forma budownictwa</MyTableTH>
                                    <MyTableTD>
                                        {inputs.object_construction_form_type}
                                    </MyTableTD>
                                </MyTableTR>
                                <MyTableTR>
                                    <MyTableTH>Wysz.</MyTableTH>
                                    <MyTableTD>
                                        {inputs.object_construction_spec_id}
                                    </MyTableTD>
                                    <MyTableTH>
                                        Planowanie przestrzenne
                                    </MyTableTH>
                                    <MyTableTD>
                                        {inputs.object_spatial_plan_type}
                                    </MyTableTD>
                                </MyTableTR>
                            </tbody>
                        </MyTable>
                    </MyTableTD>
                </MyTableTR>
            )}
            {showCharParams && (
                <MyTableTR>
                    <MyTableTD colSpan={2}>
                        <RegisterCharParamsTableEdit {...props} />
                    </MyTableTD>
                </MyTableTR>
            )}
            {showPropertyData && (
                <MyTableTR>
                    <MyTableTD colSpan={2}>
                        <RegisterPropertyDataTableEdit
                            {...props}
                            place={place}
                            area={area}
                        />
                    </MyTableTD>
                </MyTableTR>
            )}
            {(Object.keys(showPlots) as DBRows.RegisterPlotType[]).map(
                (plotType) =>
                    showPlots[plotType] && (
                        <MyTableTR key={plotType}>
                            <MyTableTD colSpan={2}>
                                <RegisterPlotsDataTableEdit
                                    {...props}
                                    plotType={plotType}
                                />
                            </MyTableTD>
                        </MyTableTR>
                    )
            )}
        </>
    );

    return (
        <MyTable size="sm" sx={{ height: "100%" }}>
            <thead>
                <MyTableTR>
                    <MyTableTH colSpan={2}>Zamierzenie Budowlane</MyTableTH>
                </MyTableTR>
            </thead>
            <tbody>
                {top}
                {body}
            </tbody>
        </MyTable>
    );
}
