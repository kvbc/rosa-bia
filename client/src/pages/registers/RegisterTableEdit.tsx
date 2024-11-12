import React, { ComponentProps, useCallback, useContext, useMemo } from "react";
import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { DB } from "../../../../server/src/db/types";
import RegisterTableEditRowContent from "./RegisterTableEditRowContent";
import { TableEditRowInputsProps } from "../../components/table_edit/row/TableEditRow";
import { MySelectOption } from "../../components/MySelect";
import { PageRegistersContext } from "../../contexts/pages/PageRegistersContext";
import { TableEditHeader } from "../../components/table_edit/TableEdit";
import { EmployeeAvatar } from "../../components/EmployeeAvatar";
import { Badge } from "@chakra-ui/react";

export default function RegisterTableEdit(
    props: Omit<
        ComponentProps<typeof DBTableEdit<DB.Rows.Register>>,
        | "dbTable"
        | "headers"
        | "defaultRow"
        | "rowInputsProps"
        | "RowContentComponent"
    >
) {
    const pageContext = useContext(PageRegistersContext)!;

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Register>>(
        () => ({
            type: "PnB (6740)",

            assigned_employee_id: 1,

            app_number: "0",
            app_submission_date: "",
            app_investor_id: 0,
            app_decision_type: "Pozytywna",
            app_decision_number: 0,
            app_decision_issue_date: "",
            app_resolution_type: "Bez rozpatrzenia",
            app_resolution_number: 0,
            app_resolution_issue_date: "",
            app_construction_journal_type: "Elektroniczny",

            object_construction_spec_id: 0,
            object_custom_construction_intent: "",
            object_construction_form_type: "Indywidualne",
            object_spatial_plan_type: "MPZP",
            object_number: "",
            object_street_id: 0,
            object_demo_building_count: 0,
            object_demo_volume: 0,
            object_demo_usable_area: 0,
            object_demo_building_area: 0,
            object_demo_under_conservation_protection: 0,
            object_pnb_acc_infra: 0,
            object_usage_change_from: "",
            object_usage_change_to: "",
            object_prbud_intent_id: 1,
            object_public_info: 0,
            object_localization_date_from: "",
            object_localization_date_to: "",
            object_neighbour_property_type: "Budynek",

            _object_prbud_intent_type_id: 1,
            _object_construction_division_id: 0,
            _object_construction_group_id: 0,
            _object_construction_class_id: 0,
            _object_construction_section_id: 0,
            _object_commune_id: 0,
            _object_place_id: 0,

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

    const getSelectRowInputProps = useCallback(function <TOption>(
        rowKey: TableEditRowInputsProps<DB.Rows.Register>[number]["rowKey"],
        options:
            | readonly TOption[]
            | ((row: DB.Rows.Register) => readonly TOption[]),
        getOption: (option: TOption) => MySelectOption
    ): TableEditRowInputsProps<DB.Rows.Register>[number] {
        return {
            rowKey,
            type: "select",
            getSelectOptions: (row) =>
                (typeof options === "function"
                    ? options(row)
                    : options
                ).map<MySelectOption>((option) => getOption(option)),
        };
    },
    []);
    const rowInputsProps = useMemo<TableEditRowInputsProps<DB.Rows.Register>>(
        () => [
            getSelectRowInputProps("type", DB.Rows.REGISTER_TYPES, (type) => {
                const match = type.match(/([^(]+)\(([^)]+)\)/);
                const name = match?.at(1) ?? type;
                const id = match?.at(2);
                return {
                    value: type,
                    name,
                    postNameNode: id && <Badge colorPalette="blue">{id}</Badge>,
                };
            }),
            getSelectRowInputProps(
                "assigned_employee_id",
                pageContext.employeesDBTable.rows,
                (row) => ({
                    value: row.id,
                    name: row.name,
                    preNameNode: (
                        <EmployeeAvatar fullName={row.name} size="2xs" />
                    ),
                })
            ),
            { rowKey: "app_number", type: "text" }, // prettier-ignore
            { rowKey: "app_submission_date", type: "date" }, // prettier-ignore
            getSelectRowInputProps(
                "app_investor_id",
                pageContext.investorsDBTable.rows,
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "app_decision_type",
                row => DB.Rows.REGISTER_SUBTYPE_INFOS[DB.Rows.REGISTER_TYPE_INFOS[row.type].subtype].decisions, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            { rowKey: "app_decision_number", type: "number" }, // prettier-ignore
            { rowKey: "app_decision_issue_date", type: "date" }, // prettier-ignore
            getSelectRowInputProps(
                "app_resolution_type",
                row => DB.Rows.REGISTER_SUBTYPE_INFOS[DB.Rows.REGISTER_TYPE_INFOS[row.type].subtype].resolutions, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            { rowKey: "app_resolution_number", type: "number" }, // prettier-ignore
            { rowKey: "app_resolution_issue_date", type: "date" }, // prettier-ignore
            getSelectRowInputProps(
                "app_construction_journal_type",
                DB.Rows.REGISTER_CONSTRUCTION_JOURNAL_TYPES,
                (type) => ({ value: type, name: type })
            ),
            getSelectRowInputProps(
                "object_construction_spec_id",
                (row) => pageContext.constructionSpecsDBTable.rows.filter((fRow) => fRow.class_id === row._object_construction_class_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "object_construction_form_type",
                DB.Rows.REGISTER_CONSTRUCTION_FORMS, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            getSelectRowInputProps(
                "object_spatial_plan_type",
                DB.Rows.REGISTER_SPATIAL_PLANS, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            { rowKey: "object_number", type: "number" }, // prettier-ignore
            getSelectRowInputProps(
                "object_street_id",
                (row) => pageContext.streetsDBTable.rows.filter((fRow) => fRow.place_id === row._object_place_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "object_neighbour_property_type",
                DB.Rows.REGISTER_NEIGHBOURING_PROPERTY_TYPES,
                (type) => ({ value: type, name: type })
            ),
            { rowKey: "object_custom_construction_intent", type: "text" }, // prettier-ignore
            { rowKey: "object_demo_building_count", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_volume", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_usable_area", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_building_area", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_under_conservation_protection", type: "checkbox" }, // prettier-ignore
            { rowKey: "object_pnb_acc_infra", type: "checkbox" }, // prettier-ignore
            { rowKey: "object_usage_change_from", type: "text" }, // prettier-ignore
            { rowKey: "object_usage_change_to", type: "text" }, // prettier-ignore
            { rowKey: "object_public_info", type: "checkbox" }, // prettier-ignore
            { rowKey: "admin_construction_journal_date", type: "date" }, // prettier-ignore
            { rowKey: "admin_construction_journal_number", type: "number" }, // prettier-ignore
            { rowKey: "object_localization_date_from", type: "date" }, // prettier-ignore
            { rowKey: "object_localization_date_to", type: "date" }, // prettier-ignore
            { rowKey: "admin_construction_journal_tome", type: "number" }, // prettier-ignore
            { rowKey: "other_case_title", type: "text" },
            { rowKey: "other_case_from", type: "text" },
            { rowKey: "other_case_sign", type: "text" },
            { rowKey: "other_case_date", type: "text" },
            { rowKey: "other_case_init_date", type: "text" },
            { rowKey: "other_case_settle_date", type: "text" },
            { rowKey: "other_case_comments", type: "text" },

            getSelectRowInputProps(
                "object_prbud_intent_id",
                (row) =>
                    pageContext.prBudIntentsDBTable.rows.filter(
                        (fRow) =>
                            fRow.type_id === row._object_prbud_intent_type_id
                    ),
                (row) => ({ value: row.id, name: row.intent })
            ),
            getSelectRowInputProps(
                "_object_prbud_intent_type_id",
                (row) =>
                    pageContext.prBudIntentTypesDBTable.rows.filter(
                        (fRow) => fRow.register_type === row.type
                    ),
                (row) => ({ value: row.id, name: row.name })
            ),

            getSelectRowInputProps(
                "_object_construction_section_id",
                pageContext.constructionSectionsDBTable.rows,
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_construction_division_id",
                row => pageContext.constructionDivisionsDBTable.rows.filter(fRow => fRow.section_id === row._object_construction_section_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_construction_group_id",
                row => pageContext.constructionGroupsDBTable.rows.filter(fRow => fRow.division_id === row._object_construction_division_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_construction_class_id",
                row => pageContext.constructionClassesDBTable.rows.filter(fRow => fRow.group_id === row._object_construction_group_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),

            getSelectRowInputProps(
                "_object_commune_id",
                pageContext.communesDBTable.rows, // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_place_id",
                row => pageContext.placesDBTable.rows.filter(fRow => fRow.commune_id === row._object_commune_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
        ],
        [
            getSelectRowInputProps,
            pageContext.employeesDBTable.rows,
            pageContext.communesDBTable.rows,
            pageContext.constructionClassesDBTable.rows,
            pageContext.constructionDivisionsDBTable.rows,
            pageContext.constructionGroupsDBTable.rows,
            pageContext.constructionSectionsDBTable.rows,
            pageContext.constructionSpecsDBTable.rows,
            pageContext.investorsDBTable.rows,
            pageContext.placesDBTable.rows,
            pageContext.streetsDBTable.rows,
            pageContext.prBudIntentTypesDBTable.rows,
            pageContext.prBudIntentsDBTable.rows,
        ]
    );

    return (
        <DBTableEdit
            dbTable={pageContext.registersDBTable}
            headers={headers}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
            RowContentComponent={RegisterTableEditRowContent}
            rowActionButtonOrientation="vertical"
            overflow="visible"
            {...props}
        />
    );
}
