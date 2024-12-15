import React, { ComponentProps, useCallback, useContext, useMemo } from "react";
import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import * as DB from "@shared/db";
import RegisterTableEditRowContent from "./RegisterTableEditRowContent";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { MySelectOption } from "@/components/my_input/MyInputSelect";
import { PageRegistersContext } from "@/contexts/pages/PageRegistersContext";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { EmployeeAvatar } from "@/components/EmployeeAvatar";
import { Badge } from "@chakra-ui/react";
import { ClientRegister } from "./PageRegisters";
import useDBTable from "@/hooks/useDBTable";
import { Filter } from "@server/http/routes/table_rows/get";

export default function RegisterTableEdit({
    initialRegistersFilters,
    ...props
}: { initialRegistersFilters: Filter[] } & Omit<
    ComponentProps<typeof DBTableEdit<ClientRegister>>,
    | "dbTable"
    | "headers"
    | "defaultRow"
    | "rowInputsProps"
    | "RowContentComponent"
>) {
    // const pageContext = useContext(PageRegistersContext)!;
    const registersDBTable = useDBTable<DB.Rows.Register>("registers", initialRegistersFilters); // prettier-ignore
    const employeesDBTable = useDBTable<DB.Rows.Employee>("employees"); // prettier-ignore
    const investorsDBTable = useDBTable<DB.Rows.Investor>("investors"); // prettier-ignore

    const defaultRow = useMemo<DBTableEditDefaultRow<ClientRegister>>(
        () => ({
            type: "PnB (6740)",

            assigned_employee_id: 1,

            app_number: "0",
            app_submission_date: "",
            app_investor_id: 1,
            app_decision_type: "Pozytywna",
            app_decision_number: 0,
            app_decision_issue_date: "",
            app_resolution_type: "Bez rozpatrzenia",
            app_resolution_number: 0,
            app_resolution_issue_date: "",
            app_construction_journal_type: "Elektroniczny",

            object_construction_spec_id: 1,
            object_custom_construction_intent: "",
            object_construction_form_type: "Indywidualne",
            object_spatial_plan_type: "MPZP",
            object_number: "",
            object_street_id: 1,
            object_demo_building_count: 0,
            object_demo_premises_count: 1,
            object_demo_volume: 0,
            object_demo_usable_area: 0,
            object_demo_building_area: 0,
            object_demo_under_conservation_protection: 0,
            object_pnb_acc_infra: 0,
            object_usage_change_from: "",
            object_usage_change_to: "",
            object_construction_law_intent_id: 1,
            object_public_info: 0,
            object_localization_date_from: "",
            object_localization_date_to: "",
            object_neighbouring_property_type: "Budynek",

            // CLIENT_object_construction_law_category_id: 1,
            // CLIENT_object_construction_division_id: 0,
            // CLIENT_object_construction_group_id: 0,
            // CLIENT_object_construction_class_id: 0,
            // CLIENT_object_construction_section_id: 1,
            // CLIENT_object_commune_id: 0,
            // CLIENT_object_place_id: 0,

            admin_construction_journal_date: "",
            admin_construction_journal_number: 0,
            admin_construction_journal_tome: 0,

            other_case_title: "",
            other_case_from: "",
            other_case_sign: "",
            other_case_date: "",
            other_case_init_date: "",
            other_case_settle_date: "",
            other_case_comments: "",
        }),
        []
    );

    const headers = useMemo<TableEditHeader[]>(() => ["Rejestr"], []);

    // const getConstructionDivisionOptions = useCallback(
    //     (row: ClientRegister) => {
    //         console.log(pageContext.constructionDivisionsDBTable.rows);
    //         const x = pageContext.constructionDivisionsDBTable.rows.filter(
    //             (fRow) =>
    //                 fRow.section_id ===
    //                 row.CLIENT_object_construction_section_id
    //         );
    //         console.log(
    //             row.CLIENT_object_construction_section_id,
    //             typeof row.CLIENT_object_construction_section_id,
    //             x
    //         );
    //         return x;
    //     },
    //     [pageContext.constructionDivisionsDBTable.rows]
    // );

    // const getConstructionGroupOptions = useCallback(
    //     (row: ClientRegister) =>
    //         pageContext.constructionGroupsDBTable.rows.filter(
    //             (fRow) =>
    //                 fRow.division_id ===
    //                 row.CLIENT_object_construction_division_id
    //         ),
    //     [pageContext.constructionGroupsDBTable.rows]
    // );

    const getSelectRowInputProps = useCallback(function <TOption>(
        rowKey: TableEditRowInputsProps<ClientRegister>[number]["rowKey"],
        options:
            | readonly TOption[]
            | ((row: ClientRegister) => readonly TOption[]),
        getOption: (option: TOption) => MySelectOption,
        isFilterable: boolean = true
    ): TableEditRowInputsProps<ClientRegister>[number] {
        return {
            rowKey,
            type: "select",
            isFilterable,
            getSelectOptions: (row) => {
                // console.log(
                //     rowKey,
                //     row.type,
                //     typeof options === "function" ? options(row) : options
                // );
                return (
                    typeof options === "function" ? options(row) : options
                ).map<MySelectOption>((option) => getOption(option));
            },
        };
    },
    []);
    const rowInputsProps = useMemo<TableEditRowInputsProps<ClientRegister>>(
        () => [
            getSelectRowInputProps("type", DB.Rows.REGISTER_TYPES, (type) => {
                const match = type.match(/([^(]+)\(([^)]+)\)/);
                const name = match?.at(1) ?? type;
                const id = match?.at(2);
                return {
                    value: type,
                    label: name,
                    postLabelNode: id && (
                        <Badge colorPalette="blue">{id}</Badge>
                    ),
                };
            }),
            getSelectRowInputProps(
                "assigned_employee_id",
                employeesDBTable.rows,
                (row) => ({
                    value: row.id,
                    label: row.name,
                    preLabelNode: (
                        <EmployeeAvatar fullName={row.name} size="2xs" />
                    ),
                })
            ),
            { rowKey: "app_number", type: "text", isFilterable: true }, // prettier-ignore
            { rowKey: "app_submission_date", type: "date", isFilterable: true }, // prettier-ignore
            getSelectRowInputProps(
                "app_investor_id",
                investorsDBTable.rows,
                (row) => ({ value: row.id, label: row.name })
            ),
            getSelectRowInputProps(
                "app_decision_type",
                (row) => DB.Rows.getRegisterDecisionTypes(row.type),
                (type) => ({ value: type, label: type })
            ),
            { rowKey: "app_decision_number", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "app_decision_issue_date", type: "date", isFilterable: true }, // prettier-ignore
            getSelectRowInputProps(
                "app_resolution_type",
                (row) => DB.Rows.getRegisterResolutionTypes(row.type),
                (type) => ({ value: type, label: type })
            ),
            { rowKey: "app_resolution_number", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "app_resolution_issue_date", type: "date", isFilterable: true }, // prettier-ignore
            getSelectRowInputProps(
                "app_construction_journal_type",
                DB.Rows.REGISTER_CONSTRUCTION_JOURNAL_TYPES,
                (type) => ({ value: type, label: type })
            ),
            // getSelectRowInputProps(
            //     "object_construction_spec_id",
            //     (row) => pageContext.constructionSpecsDBTable.rows.filter((fRow) => fRow.class_id === row.CLIENT_object_construction_class_id), // prettier-ignore
            //     (row) => ({ value: row.id, name: row.name })
            // ),
            getSelectRowInputProps(
                "object_construction_form_type",
                DB.Rows.REGISTER_CONSTRUCTION_FORM_TYPES,
                (type) => ({ value: type, label: type })
            ),
            getSelectRowInputProps(
                "object_spatial_plan_type",
                DB.Rows.REGISTER_SPATIAL_PLAN_TYPES,
                (type) => ({ value: type, label: type })
            ),
            { rowKey: "object_number", type: "number", isFilterable: true }, // prettier-ignore
            // getSelectRowInputProps(
            //     "object_street_id",
            //     (row) => pageContext.streetsDBTable.rows.filter((fRow) => fRow.place_id === row.CLIENT_object_place_id), // prettier-ignore
            //     (row) => ({ value: row.id, name: row.name })
            // ),
            getSelectRowInputProps(
                "object_neighbouring_property_type",
                DB.Rows.REGISTER_NEIGHBOURING_PROPERTY_TYPES,
                (type) => ({ value: type, label: type })
            ),
            { rowKey: "object_custom_construction_intent", type: "text", isFilterable: true }, // prettier-ignore
            { rowKey: "object_demo_building_count", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "object_demo_premises_count", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "object_demo_volume", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "object_demo_usable_area", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "object_demo_building_area", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "object_demo_under_conservation_protection", type: "checkbox", isFilterable: true }, // prettier-ignore
            { rowKey: "object_pnb_acc_infra", type: "checkbox", isFilterable: true }, // prettier-ignore
            { rowKey: "object_usage_change_from", type: "text", isFilterable: true }, // prettier-ignore
            { rowKey: "object_usage_change_to", type: "text", isFilterable: true }, // prettier-ignore
            { rowKey: "object_public_info", type: "checkbox", isFilterable: true }, // prettier-ignore
            { rowKey: "admin_construction_journal_date", type: "date", isFilterable: true }, // prettier-ignore
            { rowKey: "admin_construction_journal_number", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "object_localization_date_from", type: "date", isFilterable: true }, // prettier-ignore
            { rowKey: "object_localization_date_to", type: "date", isFilterable: true }, // prettier-ignore
            { rowKey: "admin_construction_journal_tome", type: "number", isFilterable: true }, // prettier-ignore
            { rowKey: "other_case_title", type: "text", isFilterable: true },
            { rowKey: "other_case_from", type: "text", isFilterable: true },
            { rowKey: "other_case_sign", type: "text", isFilterable: true },
            { rowKey: "other_case_date", type: "text", isFilterable: true },
            {
                rowKey: "other_case_init_date",
                type: "text",
                isFilterable: true,
            },
            {
                rowKey: "other_case_settle_date",
                type: "text",
                isFilterable: true,
            },
            { rowKey: "other_case_comments", type: "text", isFilterable: true },

            // getSelectRowInputProps(
            //     "object_construction_law_intent_id",
            //     (row) =>
            //         pageContext.constructionLawIntentsDBTable.rows.filter(
            //             (fRow) =>
            //                 fRow.category_id ===
            //                 row.CLIENT_object_construction_law_category_id
            //         ),
            //     (row) => ({ value: row.id, name: row.intent })
            // ),
            // getSelectRowInputProps(
            //     "CLIENT_object_construction_law_category_id",
            //     (row) =>
            //         pageContext.constructionLawCategoriesDBTable.rows.filter(
            //             (fRow) => fRow.register_type === row.type
            //         ),
            //     (row) => ({ value: row.id, name: row.name })
            // ),

            // getSelectRowInputProps(
            //     "CLIENT_object_construction_section_id",
            //     pageContext.constructionSectionsDBTable.rows,
            //     (row) => ({ value: row.id, name: row.name })
            // ),
            // getSelectRowInputProps(
            //     "CLIENT_object_construction_division_id",
            //     getConstructionDivisionOptions,
            //     (row) => ({ value: row.id, name: row.name })
            // ),
            // getSelectRowInputProps(
            //     "CLIENT_object_construction_group_id",
            //     getConstructionGroupOptions,
            //     (row) => ({ value: row.id, name: row.name })
            // ),
            // getSelectRowInputProps(
            //     "CLIENT_object_construction_class_id",
            //     row => pageContext.constructionClassesDBTable.rows.filter(fRow => fRow.group_id === row.CLIENT_object_construction_group_id), // prettier-ignore
            //     (row) => ({ value: row.id, name: row.name })
            // ),

            // getSelectRowInputProps(
            //     "CLIENT_object_commune_id",
            //     pageContext.communesDBTable.rows, // prettier-ignore
            //     (row) => ({ value: row.id, name: row.name })
            // ),
            // getSelectRowInputProps(
            //     "CLIENT_object_place_id",
            //     row => pageContext.placesDBTable.rows.filter(fRow => fRow.commune_id === row.CLIENT_object_commune_id), // prettier-ignore
            //     (row) => ({ value: row.id, name: row.name })
            // ),
        ],
        [
            getSelectRowInputProps,
            employeesDBTable.rows,
            // pageContext.communesDBTable.rows,
            // pageContext.constructionClassesDBTable.rows,
            // pageContext.constructionSectionsDBTable.rows,
            // pageContext.constructionSpecsDBTable.rows,
            investorsDBTable.rows,
            // pageContext.placesDBTable.rows,
            // pageContext.streetsDBTable.rows,
            // pageContext.constructionLawCategoriesDBTable.rows,
            // pageContext.constructionLawIntentsDBTable.rows,
            // getConstructionGroupOptions,
            // getConstructionDivisionOptions,
        ]
    );

    // const rows = useMemo(
    //     () =>
    //         pageContext.registersDBTable.rows.map<ClientRegister>((row) => {
    //             const constructionSpec =
    //                 pageContext.constructionSpecsDBTable.rows.find(
    //                     (fEntry) =>
    //                         fEntry.id === row.object_construction_spec_id
    //                 );
    //             const constructionClass =
    //                 pageContext.constructionClassesDBTable.rows.find(
    //                     (fEntry) => fEntry.id === constructionSpec?.class_id
    //                 );
    //             const constructionGroup =
    //                 pageContext.constructionGroupsDBTable.rows.find(
    //                     (fEntry) => fEntry.id === constructionClass?.group_id
    //                 );
    //             const constructionDivision =
    //                 pageContext.constructionDivisionsDBTable.rows.find(
    //                     (fEntry) => fEntry.id === constructionGroup?.division_id
    //                 );
    //             return {
    //                 ...row,
    //                 CLIENT_object_construction_section_id:
    //                     constructionDivision?.section_id ??
    //                     // pageContext.constructionSectionsDBTable.rows.at(0)?.id ??
    //                     1,
    //                 CLIENT_object_construction_class_id: constructionClass?.id,
    //                 CLIENT_object_construction_division_id:
    //                     constructionDivision?.id,
    //                 CLIENT_object_construction_group_id: constructionGroup?.id,
    //             };
    //         }),
    //     [
    //         pageContext.registersDBTable.rows,
    //         pageContext.constructionSpecsDBTable.rows,
    //         pageContext.constructionClassesDBTable.rows,
    //         pageContext.constructionGroupsDBTable.rows,
    //         pageContext.constructionDivisionsDBTable.rows,
    //         // pageContext.constructionSectionsDBTable.rows,
    //     ]
    // );

    const rows = useMemo(() => {
        const newRows = [...registersDBTable.rows];

        newRows.sort(
            (a, b) =>
                new Date(b.app_submission_date).getTime() -
                new Date(a.app_submission_date).getTime()
        );

        return newRows;
    }, [registersDBTable.rows]);

    return (
        <DBTableEdit<DB.Rows.Register, ClientRegister>
            dbTable={registersDBTable}
            headers={headers}
            rows={rows}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
            RowContentComponent={RegisterTableEditRowContent}
            rowActionButtonOrientation="vertical"
            overflow="visible"
            showFilters
            {...props}
        />
    );
}
