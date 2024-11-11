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

import React, { ReactNode, useContext, useEffect, useMemo } from "react";
import RegisterPropertyDataTableEdit from "./RegisterPropertyDataTableEdit";
import RegisterPlotsDataTableEdit from "./RegisterPlotsTableEdit";
import RegisterCharParamsTableEdit from "./RegisterCharParamsTableEdit";
import { DB } from "../../../../../server/src/db/types";
import { PageRegistersContext } from "../../../contexts/pages/PageRegistersContext";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";
import { MyTable as Tb } from "../../../components/my_table/MyTable";
import { MyTableCell as Tc } from "../../../components/my_table/MyTableCell";
import { MyTableHeader as Th } from "../../../components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "../../../components/my_table/MyTableRow";
import { MyTableHeaderRow as ThRow } from "../../../components/my_table/MyTableHeaderRow";
import { HStack, Text } from "@chakra-ui/react";
import { FeatureUnfinishedIcon } from "../../../components/FeatureUnfinishedIcon";

export default function RegisterConstructionIntentTableEdit(
    props: TableEditRowContentComponentProps<DB.Rows.Register> & {
        showMore: boolean;
    }
) {
    const { inputs, row, setRow, showMore } = props;

    const pageContext = useContext(PageRegistersContext)!;

    const constructionSpec = useMemo(() => pageContext.constructionSpecsDBTable.rows.find((fEntry) => fEntry.id === row.object_construction_spec_id), [row.object_construction_spec_id, pageContext.constructionSpecsDBTable.rows]); // prettier-ignore
    const constructionClass = useMemo(() => pageContext.constructionClassesDBTable.rows.find((fEntry) => fEntry.id === constructionSpec?.class_id), [constructionSpec, pageContext.constructionClassesDBTable.rows]); // prettier-ignore
    const constructionGroup = useMemo(() => pageContext.constructionGroupsDBTable.rows.find(fEntry => fEntry.id === constructionClass?.group_id), [constructionClass, pageContext.constructionGroupsDBTable.rows]); // prettier-ignore
    const constructionDivision = useMemo(() => pageContext.constructionDivisionsDBTable.rows.find(fEntry => fEntry.id === constructionGroup?.division_id), [constructionGroup, pageContext.constructionDivisionsDBTable.rows]); // prettier-ignore
    const street = useMemo(() => pageContext.streetsDBTable.rows.find(fEntry => fEntry.id === row.object_street_id), [row.object_street_id, pageContext.streetsDBTable.rows]) // prettier-ignore
    const place = useMemo(() => pageContext.placesDBTable.rows.find(fEntry => fEntry.id === street?.place_id), [street, pageContext.placesDBTable.rows]) // prettier-ignore
    // const commune = useMemo(() => pageContext.communesDBTable.rows.find(fEntry => fEntry.id === place?.commune_id), [place, pageContext.communesDBTable.rows]) // prettier-ignore
    const area = useMemo(() => pageContext.placesDBTable.rows.find(fEntry => fEntry.id === place?.area_place_id), [place, pageContext.placesDBTable.rows]) // prettier-ignore
    const prBudIntent = useMemo(() => pageContext.prBudIntentsDBTable.rows.find(fRow => fRow.id === row.object_prbud_intent_id), [pageContext.prBudIntentsDBTable.rows, row.object_prbud_intent_id]) // prettier-ignore

    useEffect(() => setRow(row => ({...row, _object_construction_class_id: constructionSpec?.class_id ?? 0})), [setRow, constructionSpec?.class_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_construction_group_id: constructionClass?.group_id ?? 0})), [setRow, constructionClass?.group_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_construction_division_id: constructionGroup?.division_id ?? 0})), [setRow, constructionGroup?.division_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_construction_section_id: constructionDivision?.section_id ?? 0})), [setRow, constructionDivision?.section_id]); // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_place_id: street?.place_id ?? 0})), [setRow, street?.place_id]) // prettier-ignore
    useEffect(() => setRow(row => ({...row, _object_commune_id: place?.commune_id ?? 0})), [setRow, place?.commune_id]) // prettier-ignore

    const constructionIntentNodes: {
        [key in DB.Rows.RegisterType]: ReactNode;
    } = useMemo(
        () => ({
            "PnB (6740)": constructionGroup?.name ?? "-",
            "PnRozb. (6741)": "Rozbiórka budynku",
            "Zg. Rozb. (6743.1)": "Rozbiórka budynku",
            "Zg. Zwykłe (6743.2)": inputs._object_prbud_intent_type_id,
            "Zm. Sp. Użytk. (6743.3)": "Zmiana sposobu użytkowania",
            "BiP (6743.4)": inputs._object_prbud_intent_type_id,
            "ZRiD (7012)": <FeatureUnfinishedIcon />,
            "Pisma różne (670)": <FeatureUnfinishedIcon />,
            "Samodz. Lokali (705)": <FeatureUnfinishedIcon />,
            "Dz. bud": <FeatureUnfinishedIcon />,
        }),
        [constructionGroup?.name, inputs._object_prbud_intent_type_id]
    );

    const showAccompanyInfrastructure =
        row.type === "PnB (6740)" || row.type === "ZRiD (7012)";

    const showUnderConservationProtection =
        row.type === "PnRozb. (6741)" || row.type === "Zg. Rozb. (6743.1)";

    const showUsageChange = row.type === "Zm. Sp. Użytk. (6743.3)";

    const showConstructions =
        row.type === "PnB (6740)" || row.type === "Zm. Sp. Użytk. (6743.3)";

    const showPrBud =
        row.type === "Zg. Zwykłe (6743.2)" || row.type === "BiP (6743.4)";

    const showPublicInfo =
        row.type === "Pisma różne (670)" || row.type === "Samodz. Lokali (705)";

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
            <Tr>
                <Tc height="60px" rowSpan={showUsageChange ? 2 : 1}>
                    Nazwa zamierzenia budowlanego
                </Tc>
                <Tc height="60px">{constructionIntentNodes[row.type]}</Tc>
            </Tr>
            {showAccompanyInfrastructure && (
                <Tr>
                    <Tc height="60px">Infrastruktura towarzysząca</Tc>
                    <Tc height="60px">{inputs.object_pnb_acc_infra}</Tc>
                </Tr>
            )}
            {showUnderConservationProtection && (
                <Tr>
                    <Tc height="60px">Obiekt objęty ochroną konserwatorską</Tc>
                    <Tc height="60px">
                        {inputs.object_demo_under_conservation_protection}
                    </Tc>
                </Tr>
            )}
            {showUsageChange && (
                <Tr>
                    <Tc height="60px">
                        <HStack alignItems="center">
                            <Text>z</Text>
                            {inputs.object_usage_change_from}
                            <Text>na</Text>
                            {inputs.object_usage_change_to}
                        </HStack>
                    </Tc>
                </Tr>
            )}
            {showPrBud && (
                <Tr>
                    <Tc height="60px">{inputs.object_prbud_intent_id}</Tc>
                    <Tc height="60px">{prBudIntent?.legal_basis ?? "-"}</Tc>
                </Tr>
            )}
            {showPublicInfo && (
                <Tr>
                    <Tc height="60px">Informacja publiczna</Tc>
                    <Tc height="60px">{inputs.object_public_info}</Tc>
                </Tr>
            )}
        </>
    );

    const body = showMore && (
        <>
            {showConstructions && (
                <Tr>
                    <Tc colSpan={2}>
                        <Tb
                            isCollapsible
                            // defaultIsCollapsed
                            myHeaders={
                                <>
                                    <Th>Geodezja</Th>
                                </>
                            }
                        >
                            <Tr>
                                <Tc>
                                    <Tb>
                                        <Tr>
                                            <ThRow>Sekcja</ThRow>
                                            <Tc>
                                                {
                                                    inputs._object_construction_section_id
                                                }
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>Dział</ThRow>
                                            <Tc>
                                                {
                                                    inputs._object_construction_division_id
                                                }
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>Grupa</ThRow>
                                            <Tc>
                                                {
                                                    inputs._object_construction_group_id
                                                }
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>Klasa</ThRow>
                                            <Tc>
                                                {
                                                    inputs._object_construction_class_id
                                                }
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>Wysz.</ThRow>
                                            <Tc>
                                                {
                                                    inputs.object_construction_spec_id
                                                }
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            {/* <Tr>
                                <Tc>
                                    <Tb
                                        myHeaders={
                                            <>
                                                <Th>Sekcja</Th>
                                                <Th>Dział</Th>
                                                <Th>Grupa</Th>
                                            </>
                                        }
                                    >
                                        <Tr>
                                            <Tc>
                                                {
                                                    inputs._object_construction_section_id
                                                }
                                            </Tc>
                                            <Tc>
                                                {
                                                    inputs._object_construction_division_id
                                                }
                                            </Tc>
                                            <Tc>
                                                {
                                                    inputs._object_construction_group_id
                                                }
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            <Tr>
                                <Tc>
                                    <Tb
                                        myHeaders={
                                            <>
                                                <Th>Klasa</Th>
                                                <Th>Wyszczególnienie</Th>
                                            </>
                                        }
                                    >
                                        <Tr>
                                            <Tc>
                                                {
                                                    inputs._object_construction_class_id
                                                }
                                            </Tc>
                                            <Tc>
                                                {
                                                    inputs.object_construction_spec_id
                                                }
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr> */}
                            <Tr>
                                <Tc>
                                    <Tb
                                        myHeaders={
                                            <>
                                                <Th>PKOB</Th>
                                                <Th>Kat. Zag. Ludzi</Th>
                                                <Th>Kat. Obiektu</Th>
                                            </>
                                        }
                                    >
                                        <Tr>
                                            <Tc>
                                                {constructionClass?.pkob ?? "-"}
                                            </Tc>
                                            <Tc>
                                                {constructionSpec?.zl_class ??
                                                    "-"}
                                            </Tc>
                                            <Tc>
                                                {constructionSpec?.ob_cat ??
                                                    "-"}
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            <Tr>
                                <Tc>
                                    <Tb
                                        myHeaders={
                                            <>
                                                <Th>Forma budownictwa</Th>
                                                <Th>Planowanie przestrzenne</Th>
                                            </>
                                        }
                                    >
                                        <Tr>
                                            <Tc>
                                                {
                                                    inputs.object_construction_form_type
                                                }
                                            </Tc>
                                            <Tc>
                                                {
                                                    inputs.object_spatial_plan_type
                                                }
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                        </Tb>
                    </Tc>
                </Tr>
                // <Tr>
                //     <Tc colSpan={2}>
                //         <Tb
                //             myHeaders={
                //                 <>
                //                     <Th colSpan={3}>Geodezja</Th>
                //                 </>
                //             }
                //         >
                //             <Tr>
                //                 <Tc>Sekcja</Tc>
                //                 <Tc>Dział</Tc>
                //                 <Tc>Grupa</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>
                //                     {inputs._object_construction_section_id}
                //                 </Tc>
                //                 <Tc>
                //                     {inputs._object_construction_division_id}
                //                 </Tc>
                //                 <Tc>{inputs._object_construction_group_id}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Klasa</Tc>
                //                 <Tc colSpan={2}>Wyszczególnienie</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>{inputs._object_construction_class_id}</Tc>
                //                 <Tc colSpan={2}>
                //                     {inputs.object_construction_spec_id}
                //                 </Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc fontWeight="bold">PKOB</Tc>
                //                 <Tc fontWeight="bold">Kat. Zag. Ludzi</Tc>
                //                 <Tc fontWeight="bold">Kat. Obiektu</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>{constructionClass?.pkob ?? "-"}</Tc>
                //                 <Tc>{constructionSpec?.zl_class ?? "-"}</Tc>
                //                 <Tc>{constructionSpec?.ob_cat ?? "-"}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc fontWeight="bold">Forma budownictwa</Tc>
                //                 <Tc fontWeight="bold">
                //                     Planowanie przestrzenne
                //                 </Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>{inputs.object_construction_form_type}</Tc>
                //                 <Tc>{inputs.object_spatial_plan_type}</Tc>
                //             </Tr>

                //             {/* <Tr>
                //                 <Tc>Sekcja</Tc>
                //                 <Tc>
                //                     {inputs._object_construction_section_id}
                //                 </Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Dział</Tc>
                //                 <Tc>
                //                     {inputs._object_construction_division_id}
                //                 </Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Grupa</Tc>
                //                 <Tc>{inputs._object_construction_group_id}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Klasa</Tc>
                //                 <Tc>{inputs._object_construction_class_id}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Wysz.</Tc>
                //                 <Tc>{inputs.object_construction_spec_id}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>PKOB</Tc>
                //                 <Tc>{constructionClass?.pkob ?? "-"}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Kat. Zag. Ludzi</Tc>
                //                 <Tc>{constructionSpec?.zl_class ?? "-"}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Kat. Obiektu</Tc>
                //                 <Tc>{constructionSpec?.ob_cat ?? "-"}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Forma budownictwa</Tc>
                //                 <Tc>{inputs.object_construction_form_type}</Tc>
                //             </Tr>
                //             <Tr>
                //                 <Tc>Planowanie przestrzenne</Tc>
                //                 <Tc>{inputs.object_spatial_plan_type}</Tc>
                //             </Tr> */}
                //         </Tb>
                //     </Tc>
                // </Tr>
            )}
            {showCharParams && (
                <Tr>
                    <Tc colSpan={2}>
                        <RegisterCharParamsTableEdit {...props} />
                    </Tc>
                </Tr>
            )}
            {showPropertyData && (
                <Tr>
                    <Tc colSpan={2}>
                        <RegisterPropertyDataTableEdit
                            {...props}
                            place={place}
                            area={area}
                        />
                    </Tc>
                </Tr>
            )}
            {(Object.keys(showPlots) as DB.Rows.RegisterPlotType[]).map(
                (plotType) =>
                    showPlots[plotType] && (
                        <Tr key={plotType}>
                            <Tc colSpan={2}>
                                <RegisterPlotsDataTableEdit
                                    {...props}
                                    plotType={plotType}
                                />
                            </Tc>
                        </Tr>
                    )
            )}
        </>
    );

    return (
        <Tb
            myHeaders={
                <>
                    <Th colSpan={2}>Zamierzenie Budowlane</Th>
                </>
            }
            // sx={{ height: "100%" }}
        >
            {top}
            {body}
        </Tb>
    );
}
