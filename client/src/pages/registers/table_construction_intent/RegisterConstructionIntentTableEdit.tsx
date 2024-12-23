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

import {
    ComponentProps,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import RegisterPropertyDataTableEdit from "./RegisterPropertyDataTableEdit";
import RegisterPlotsDataTableEdit from "./RegisterPlotsTableEdit";
import RegisterCharParamsTableEdit from "./RegisterCharParamsTableEdit";
import * as DB from "@shared/db";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { MyTable, MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import { MyTableHeaderRow as ThRow } from "@/components/my_table/MyTableHeaderRow";
import { HStack } from "@chakra-ui/react";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";
import { topRowHeight } from "../RegisterTableEditRowContent";
import { ClientRegister } from "../PageRegisters";
import {
    MyInputSelect,
    MySelectOption,
} from "@/components/my_input/MyInputSelect";
import { FaMapMarkedAlt } from "react-icons/fa";
import useDBTable from "@/hooks/useDBTable";

export default function RegisterConstructionIntentTableEdit(
    props: ComponentProps<typeof MyTable> &
        TableEditRowContentComponentProps<ClientRegister> & {
            showMore: boolean;
        }
) {
    const {
        inputs,
        ftoggles,
        row,
        setRow,
        showMore,
        editable,
        onInputFocusOut,
        ...myTableProps
    } = props;

    // const pageContext = useContext(PageRegistersContext)!;
    const constructionClassesDBTable = useDBTable<DB.Rows.ConstructionClass>("construction_classes"); // prettier-ignore
    const constructionSectionsDBTable = useDBTable<DB.Rows.ConstructionSection>("construction_sections"); // prettier-ignore
    const constructionGroupsDBTable = useDBTable<DB.Rows.ConstructionGroup>("construction_groups"); // prettier-ignore
    const constructionDivisionsDBTable = useDBTable<DB.Rows.ConstructionDivision>("construction_divisions"); // prettier-ignore
    const constructionSpecsDBTable = useDBTable<DB.Rows.ConstructionSpec>("construction_specs"); // prettier-ignore
    const constructionLawCategoriesDBTable = useDBTable<DB.Rows.ConstructionLawCategory>("construction_law_categories"); // prettier-ignore
    const constructionLawIntentsDBTable = useDBTable<DB.Rows.ConstructionLawIntent>("construction_law_intents"); // prettier-ignore

    const [constructionSectionID, setConstructionSectionID] = useState<number>(0); // prettier-ignore
    const [constructionDivisionID, setConstructionDivisionID] = useState<number>(0); // prettier-ignore
    const [constructionGroupID, setConstructionGroupID] = useState<number>(0);
    const [constructionClassID, setConstructionClassID] = useState<number>(0);
    const [constructionLawCategoryID, setConstructionLawCategoryID] = useState<number>(0); // prettier-ignore

    const constructionSpec = useMemo(
        () =>
            constructionSpecsDBTable.rows.find(
                (fEntry) => fEntry.id === row.object_construction_spec_id
            ),
        [row.object_construction_spec_id, constructionSpecsDBTable.rows]
    );
    const constructionClass = useMemo(
        () =>
            constructionClassesDBTable.rows.find(
                (fEntry) => fEntry.id === constructionClassID
            ),
        [constructionClassID, constructionClassesDBTable.rows]
    );
    const constructionGroup = useMemo(
        () =>
            constructionGroupsDBTable.rows.find(
                (fEntry) => fEntry.id === constructionGroupID
            ),
        [constructionGroupID, constructionGroupsDBTable.rows]
    );
    const constructionDivision = useMemo(
        () =>
            constructionDivisionsDBTable.rows.find(
                (fEntry) => fEntry.id === constructionDivisionID
            ),
        [constructionDivisionID, constructionDivisionsDBTable.rows]
    );
    const constructionSection = useMemo(
        () =>
            constructionSectionsDBTable.rows.find(
                (fRow) => fRow.id === constructionSectionID
            ),
        [constructionSectionsDBTable.rows, constructionSectionID]
    );
    //
    const constructionLawIntent = useMemo(
        () =>
            constructionLawIntentsDBTable.rows.find(
                (fRow) => fRow.id === row.object_construction_law_intent_id
            ),
        [
            constructionLawIntentsDBTable.rows,
            row.object_construction_law_intent_id,
        ]
    );
    // const constructionLawCategory = useMemo(
    //     () =>
    //         constructionLawCategoriesDBTable.rows.find(
    //             (row) => row.id === constructionLawCategoryID
    //         ),
    //     [
    //         constructionLawCategoriesDBTable.rows,
    //         constructionLawCategoryID,
    //     ]
    // );

    //
    //
    //

    useEffect(() => {
        if (constructionSpec?.class_id) {
            setConstructionClassID(constructionSpec.class_id);
        }
    }, [constructionSpec?.class_id]);
    useEffect(() => {
        if (constructionClass?.group_id) {
            setConstructionGroupID(constructionClass.group_id);
        }
    }, [constructionClass?.group_id]);
    useEffect(() => {
        if (constructionGroup?.division_id) {
            setConstructionDivisionID(constructionGroup.division_id);
        }
    }, [constructionGroup?.division_id]);
    useEffect(() => {
        if (constructionDivision?.section_id) {
            setConstructionSectionID(constructionDivision.section_id);
        }
    }, [constructionDivision?.section_id]);
    //
    useEffect(() => {
        if (constructionLawIntent?.category_id) {
            setConstructionLawCategoryID(constructionLawIntent.category_id);
        }
    }, [constructionLawIntent?.category_id]);

    //
    //
    //

    const usersetFrom = useCallback(
        (
            from: ("section" | "division" | "group" | "class") | "law_category",
            id: number
        ) => {
            /* eslint-disable no-fallthrough */
            switch (from) {
                case "section":
                    setConstructionSectionID(id);
                    id =
                        constructionDivisionsDBTable.rows.find(
                            (row) => row.section_id === id
                        )?.id ?? 0;
                case "division":
                    setConstructionDivisionID(id);
                    id =
                        constructionGroupsDBTable.rows.find(
                            (row) => row.division_id === id
                        )?.id ?? 0;
                case "group":
                    setConstructionGroupID(id);
                    id =
                        constructionClassesDBTable.rows.find(
                            (row) => row.group_id === id
                        )?.id ?? 0;
                case "class":
                    setConstructionClassID(id);
                    setRow((row) => ({
                        ...row,
                        object_construction_spec_id:
                            constructionSpecsDBTable.rows.find(
                                (fRow) => fRow.class_id === id
                            )?.id ?? 0,
                    }));
            }
            //
            switch (from) {
                case "law_category":
                    setConstructionLawCategoryID(id);
                    setRow((row) => ({
                        ...row,
                        object_construction_law_intent_id:
                            constructionLawIntentsDBTable.rows.find(
                                (fRow) => fRow.category_id === id
                            )?.id ?? 0,
                    }));
            }
            /* eslint-enable no-fallthrough */
        },
        [
            setRow,
            constructionDivisionsDBTable.rows,
            constructionGroupsDBTable.rows,
            constructionClassesDBTable.rows,
            constructionSpecsDBTable.rows,
            constructionLawIntentsDBTable.rows,
        ]
    );

    //
    //
    //

    const handleConstructionSectionIDChanged = useCallback(
        (constructionSectionID: number) => {
            usersetFrom("section", constructionSectionID);
        },
        [usersetFrom]
    );
    const handleConstructionDivisionIDChanged = useCallback(
        (constructionDivisionID: number) => {
            usersetFrom("division", constructionDivisionID);
        },
        [usersetFrom]
    );
    const handleConstructionGroupIDChanged = useCallback(
        (constructionGroupID: number) => {
            usersetFrom("group", constructionGroupID);
        },
        [usersetFrom]
    );
    const handleConstructionClassIDChanged = useCallback(
        (constructionClassID: number) => {
            usersetFrom("class", constructionClassID);
        },
        [usersetFrom]
    );
    const handleConstructionSpecIDChanged = useCallback(
        (constructionSpecID: number) => {
            setRow((row) => ({
                ...row,
                object_construction_spec_id: constructionSpecID,
            }));
        },
        [setRow]
    );
    //
    const handleConstructionLawCategoryIDChanged = useCallback(
        (constructionLawCategoryID: number) => {
            usersetFrom("law_category", constructionLawCategoryID);
        },
        [usersetFrom]
    );
    const handleConstructionLawIndentIDChanged = useCallback(
        (constructionLawIndentID: number) => {
            setRow((row) => ({
                ...row,
                object_construction_law_intent_id: constructionLawIndentID,
            }));
        },
        [setRow]
    );

    //
    //
    //

    const constructionSectionsSelectOptions = useMemo(
        () =>
            constructionSectionsDBTable.rows.map<MySelectOption>((row) => ({
                label: row.name,
                value: row.id,
            })),
        [constructionSectionsDBTable.rows]
    );
    const constructionDivisionsSelectOptions = useMemo(
        () =>
            constructionDivisionsDBTable.rows
                .filter((row) => row.section_id === constructionSectionID)
                .map<MySelectOption>((row) => ({
                    value: row.id,
                    label: row.name,
                })),
        [constructionSectionID, constructionDivisionsDBTable.rows]
    );
    const constructionGroupsSelectOptions = useMemo(
        () =>
            constructionGroupsDBTable.rows
                .filter((row) => row.division_id === constructionDivisionID)
                .map<MySelectOption>((row) => ({
                    value: row.id,
                    label: row.name,
                })),
        [constructionDivisionID, constructionGroupsDBTable.rows]
    );
    const constructionClassesSelectOptions = useMemo(
        () =>
            constructionClassesDBTable.rows
                .filter((row) => row.group_id === constructionGroupID)
                .map<MySelectOption>((row) => ({
                    value: row.id,
                    label: row.name,
                })),
        [constructionGroupID, constructionClassesDBTable.rows]
    );
    const constructionSpecsSelectOptions = useMemo(
        () =>
            constructionSpecsDBTable.rows
                .filter((row) => row.class_id === constructionClassID)
                .map<MySelectOption>((row) => ({
                    value: row.id,
                    label: row.name,
                })),
        [constructionClassID, constructionSpecsDBTable.rows]
    );
    //
    const constructionLawCategoriesSelectOptions = useMemo(
        () =>
            constructionLawCategoriesDBTable.rows
                .filter((cRow) => cRow.register_type === row.type)
                .map<MySelectOption>((row) => ({
                    value: row.id,
                    label: row.name,
                })),
        [constructionLawCategoriesDBTable.rows, row.type]
    );
    const constructionLawIntentsSelectOptions = useMemo(
        () =>
            constructionLawIntentsDBTable.rows
                .filter((row) => row.category_id === constructionLawCategoryID)
                .map<MySelectOption>((row) => ({
                    value: row.id,
                    label: row.intent,
                })),
        [constructionLawCategoryID, constructionLawIntentsDBTable.rows]
    );

    //
    //
    //

    // const pnbConstructionIntent = constructionGroup?.name;
    let pnbConstructionIntent = "";
    if (constructionSection && constructionSection.name !== "-") {
        pnbConstructionIntent += constructionSection.name;
    }
    if (constructionDivision && constructionDivision.name !== "-") {
        pnbConstructionIntent += " " + constructionDivision.name;
    }
    if (constructionGroup && constructionGroup.name !== "-") {
        pnbConstructionIntent += " " + constructionGroup.name;
    }
    if (pnbConstructionIntent === "") {
        pnbConstructionIntent = "-";
    }

    useEffect(() => {
        if (
            row.object_custom_construction_intent.trim() === "" ||
            row.object_custom_construction_intent.trim() === "-" || 
            pnbConstructionIntent.trim().includes(row.object_custom_construction_intent.trim())
        ) {
            // FIXME yeah
            setRow((row) => ({
                ...row,
                object_custom_construction_intent: pnbConstructionIntent,
            }));
        }
    }, [
        pnbConstructionIntent,
        constructionSection?.name,
        constructionDivision?.name,
        constructionGroup?.name,
        row.object_custom_construction_intent,
        setRow,
    ]);

    const constructionLawCategoryInput = useMemo(
        () => (
            <MyInputSelect
                options={constructionLawCategoriesSelectOptions}
                value={String(constructionLawCategoryID)}
                onValueChanged={(value) =>
                    handleConstructionLawCategoryIDChanged(Number(value))
                }
                isDisabled={!editable}
                onBlur={onInputFocusOut}
            />
        ),
        [
            constructionLawCategoriesSelectOptions,
            constructionLawCategoryID,
            editable,
            onInputFocusOut,
            handleConstructionLawCategoryIDChanged,
        ]
    );
    const constructionLawIntentInput = (
        <MyInputSelect
            options={constructionLawIntentsSelectOptions}
            value={String(row.object_construction_law_intent_id)}
            onValueChanged={(value) =>
                handleConstructionLawIndentIDChanged(Number(value))
            }
            isDisabled={!editable}
            onBlur={onInputFocusOut}
            maxWidth="200px"
        />
    );

    const constructionIntentNodes: {
        [key in DB.Rows.RegisterType]: ReactNode;
    } = useMemo(
        () => ({
            "PnB (6740)": inputs.object_custom_construction_intent, // pnbConstructionIntent,
            "PnRozb. (6741)": "Rozbiórka budynku",
            "Zg. Rozb. (6743.1)": "Rozbiórka budynku",
            "Zg. Zwykłe (6743.2)": constructionLawCategoryInput,
            "Zm. Sp. Użytk. (6743.3)": "Zmiana sposobu użytkowania",
            "BiP (6743.4)": constructionLawCategoryInput,
            "ZRiD (7012)": inputs.object_custom_construction_intent,
            "Pisma różne (670)": inputs.object_custom_construction_intent,
            "Samodz. Lokali (705)": inputs.object_custom_construction_intent,
            "Dz. bud": <FeatureUnfinishedIcon />,
            "Tymczasowe (6743.5)": constructionLawCategoryInput,
            Uzupełniający: <FeatureUnfinishedIcon />,
            "Wejście na dz. sąsiednią": "Zgoda wejścia na działkę sąsiednią",
            "Konserwator (Inne)": <FeatureUnfinishedIcon />,
            "Lokalizacja inwestycji (Inne)": <FeatureUnfinishedIcon />,
            "PiNB (Inne)": <FeatureUnfinishedIcon />,
        }),
        [
            constructionLawCategoryInput,
            inputs.object_custom_construction_intent,
            // pnbConstructionIntent,
        ]
    );

    const showAccompanyInfrastructure =
        row.type === "PnB (6740)" || row.type === "ZRiD (7012)";

    const showUnderConservationProtection =
        row.type === "PnRozb. (6741)" || row.type === "Zg. Rozb. (6743.1)";

    const showUsageChange = row.type === "Zm. Sp. Użytk. (6743.3)";

    const showConstructions =
        row.type === "PnB (6740)" || row.type === "Zm. Sp. Użytk. (6743.3)";

    const showLocalizationDateRange = row.type === "Tymczasowe (6743.5)";

    const showPrBud =
        row.type === "Zg. Zwykłe (6743.2)" ||
        row.type === "BiP (6743.4)" ||
        row.type === "Tymczasowe (6743.5)";

    const showPublicInfo =
        row.type === "Pisma różne (670)" || row.type === "Samodz. Lokali (705)";

    const showCharParams =
        row.type === "PnRozb. (6741)" ||
        row.type === "Zg. Rozb. (6743.1)" ||
        row.type === "Zg. Zwykłe (6743.2)" ||
        row.type === "BiP (6743.4)" ||
        row.type === "Tymczasowe (6743.5)";

    const showNeighbouringPropertyType =
        row.type === "Wejście na dz. sąsiednią";

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
            <Tr height={topRowHeight}>
                <Tc rowSpan={showUsageChange ? 2 : 1} width="1/2">
                    Nazwa zamierzenia budowlanego
                </Tc>
                <Tc>{constructionIntentNodes[row.type]}</Tc>
            </Tr>
            {showAccompanyInfrastructure && (
                <Tr height={topRowHeight}>
                    <Tc>
                        <HStack gap="1">
                            {ftoggles.object_pnb_acc_infra}
                            Infrastruktura towarzysząca
                        </HStack>
                    </Tc>
                    <Tc>{inputs.object_pnb_acc_infra}</Tc>
                </Tr>
            )}
            {showUnderConservationProtection && (
                <Tr height={topRowHeight}>
                    <Tc>
                        <HStack gap="1">
                            {ftoggles.object_demo_under_conservation_protection}
                            Obiekt objęty ochroną konserwatorską
                        </HStack>
                    </Tc>
                    <Tc>{inputs.object_demo_under_conservation_protection}</Tc>
                </Tr>
            )}
            {showUsageChange && (
                <Tr height={topRowHeight}>
                    <Tc>
                        <HStack alignItems="center">
                            <HStack gap="1">
                                {ftoggles.object_usage_change_from}z
                            </HStack>
                            {inputs.object_usage_change_from}
                            <HStack gap="1">
                                {ftoggles.object_usage_change_to}
                                na
                            </HStack>
                            {inputs.object_usage_change_to}
                        </HStack>
                    </Tc>
                </Tr>
            )}
            {showPrBud && (
                <Tr height={topRowHeight}>
                    <Tc>{constructionLawIntent?.legal_basis ?? "-"}</Tc>
                    <Tc>{constructionLawIntentInput}</Tc>
                </Tr>
            )}
            {showPublicInfo && (
                <Tr height={topRowHeight}>
                    <Tc>
                        <HStack gap="1">
                            {ftoggles.object_public_info}
                            Informacja publiczna
                        </HStack>
                    </Tc>
                    <Tc>{inputs.object_public_info}</Tc>
                </Tr>
            )}
            {showNeighbouringPropertyType && (
                <Tr height={topRowHeight}>
                    <Tc>
                        <HStack gap="1">
                            {ftoggles.object_neighbouring_property_type}
                            Dane nieruchomości sąsiedniej
                        </HStack>
                    </Tc>
                    <Tc>{inputs.object_neighbouring_property_type}</Tc>
                </Tr>
            )}
        </>
    );

    const body = showMore && (
        <>
            {showLocalizationDateRange && (
                <Tr height={topRowHeight}>
                    <Tc>Termin lokalizacji obiektu</Tc>
                    <Tc>
                        <Tb>
                            <Tr>
                                <ThRow>
                                    <HStack gap="1">
                                        {ftoggles.object_localization_date_from}
                                        od
                                    </HStack>
                                </ThRow>
                                <Tc>{inputs.object_localization_date_from}</Tc>
                            </Tr>
                            <Tr>
                                <ThRow>
                                    <HStack gap="1">
                                        {ftoggles.object_localization_date_to}
                                        do
                                    </HStack>
                                </ThRow>
                                <Tc>{inputs.object_localization_date_to}</Tc>
                            </Tr>
                        </Tb>
                    </Tc>
                </Tr>
            )}
            {showConstructions && (
                <Tr>
                    <Tc colSpan={2}>
                        <Tb
                            // dontAdvanceIndentLevel
                            isCollapsible
                            // defaultIsCollapsed
                        >
                            <Th>
                                <HStack gap="1">
                                    <FaMapMarkedAlt />
                                    PKOB
                                </HStack>
                            </Th>
                            <Tr>
                                <Tc>
                                    <Tb customIndentLevel={4}>
                                        <Tr>
                                            <ThRow>Sekcja</ThRow>
                                            <Tc>
                                                <MyInputSelect
                                                    options={
                                                        constructionSectionsSelectOptions
                                                    }
                                                    value={String(
                                                        constructionSectionID
                                                    )}
                                                    onValueChanged={(value) =>
                                                        handleConstructionSectionIDChanged(
                                                            Number(value)
                                                        )
                                                    }
                                                    isDisabled={!editable}
                                                    onBlur={onInputFocusOut}
                                                    maxWidth="300px"
                                                />
                                                {/* {
                                                    inputs.CLIENT_object_construction_section_id
                                                } */}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>Dział</ThRow>
                                            <Tc>
                                                <MyInputSelect
                                                    options={
                                                        constructionDivisionsSelectOptions
                                                    }
                                                    value={String(
                                                        constructionDivisionID
                                                    )}
                                                    onValueChanged={(value) =>
                                                        handleConstructionDivisionIDChanged(
                                                            Number(value)
                                                        )
                                                    }
                                                    isDisabled={!editable}
                                                    onBlur={onInputFocusOut}
                                                    maxWidth="300px"
                                                />
                                                {/* {
                                                    inputs.CLIENT_object_construction_division_id
                                                } */}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>Grupa</ThRow>
                                            <Tc>
                                                <MyInputSelect
                                                    options={
                                                        constructionGroupsSelectOptions
                                                    }
                                                    value={String(
                                                        constructionGroupID
                                                    )}
                                                    onValueChanged={(value) =>
                                                        handleConstructionGroupIDChanged(
                                                            Number(value)
                                                        )
                                                    }
                                                    isDisabled={!editable}
                                                    onBlur={onInputFocusOut}
                                                    maxWidth="300px"
                                                />
                                                {/* {
                                                    inputs.CLIENT_object_construction_group_id
                                                } */}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>Klasa</ThRow>
                                            <Tc>
                                                <MyInputSelect
                                                    options={
                                                        constructionClassesSelectOptions
                                                    }
                                                    value={String(
                                                        constructionClassID
                                                    )}
                                                    onValueChanged={(value) =>
                                                        handleConstructionClassIDChanged(
                                                            Number(value)
                                                        )
                                                    }
                                                    isDisabled={!editable}
                                                    onBlur={onInputFocusOut}
                                                    maxWidth="300px"
                                                />
                                                {/* {
                                                    inputs.CLIENT_object_construction_class_id
                                                } */}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <ThRow>
                                                <HStack gap="1">
                                                    {
                                                        ftoggles.object_construction_spec_id
                                                    }
                                                    Wysz.
                                                </HStack>
                                            </ThRow>
                                            <Tc>
                                                <MyInputSelect
                                                    options={
                                                        constructionSpecsSelectOptions
                                                    }
                                                    value={String(
                                                        row.object_construction_spec_id
                                                    )}
                                                    onValueChanged={(value) =>
                                                        handleConstructionSpecIDChanged(
                                                            Number(value)
                                                        )
                                                    }
                                                    isDisabled={!editable}
                                                    onBlur={onInputFocusOut}
                                                    maxWidth="300px"
                                                />
                                                {/* {
                                                    inputs.object_construction_spec_id
                                                } */}
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
                                    <Tb customIndentLevel={4}>
                                        <Th>PKOB</Th>
                                        <Th>Kat. Zag. Ludzi</Th>
                                        <Th>Kat. Obiektu</Th>
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
                                    <Tb customIndentLevel={4}>
                                        <Th>
                                            <HStack gap="1">
                                                {
                                                    ftoggles.object_construction_form_type
                                                }
                                                Forma budownictwa
                                            </HStack>
                                        </Th>
                                        <Th>
                                            <HStack gap="1">
                                                {
                                                    ftoggles.object_spatial_plan_type
                                                }
                                                Planowanie przestrzenne
                                            </HStack>
                                        </Th>
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
                        <RegisterPropertyDataTableEdit {...props} />
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
            {...myTableProps}
            // sx={{ height: "100%" }}
        >
            <Th colSpan={2}>
                {/* <HStack gap="1">
                    <FaHammer />
                    Zamierzenie Budowlane
                </HStack> */}
                Zamierzenie Budowlane
            </Th>
            {top}
            {body}
        </Tb>
    );
}
