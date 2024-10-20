import React, { useCallback, useMemo } from "react";
import { TableEditRowInputSelectOption } from "../../components/TableEditRowInput";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import useDBTable from "../../hooks/useDBTable";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowInputsProps } from "../../components/TableEditRow";
import RegisterTableEditRowContent from "./RegisterTableEditRowContent";

export default function RegisterTableEdit() {
    const registersDBTable = useDBTable<DBRows.Register>("registers"); // prettier-ignore
    const communesDBTable = useDBTable<DBRows.Commune>("communes"); // prettier-ignore
    const placesDBTable = useDBTable<DBRows.Place>("places"); // prettier-ignore
    const streetsDBTable = useDBTable<DBRows.Street>('streets'); // prettier-ignore
    const constructionClassesDBTable = useDBTable<DBRows.ConstructionClass>("construction_classes"); // prettier-ignore
    const constructionSectionsDBTable = useDBTable<DBRows.ConstructionSection>("construction_sections"); // prettier-ignore
    const constructionGroupsDBTable = useDBTable<DBRows.ConstructionGroup>("construction_groups"); // prettier-ignore
    const constructionDivisionsDBTable = useDBTable<DBRows.ConstructionDivision>("construction_divisions"); // prettier-ignore
    const constructionSpecsDBTable = useDBTable<DBRows.ConstructionSpec>("construction_specs"); // prettier-ignore
    const investorsDBTable = useDBTable<DBRows.Investor>("investors"); // prettier-ignore

    const defaultRow = useMemo<DBTableEditDefaultRow<DBRows.Register>>(
        () => ({
            type: "PnB (6740)",

            app_number: 0,
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

            _object_construction_division_id: 0,
            _object_construction_group_id: 0,
            _object_construction_class_id: 0,
            _object_construction_section_id: 0,
            _object_commune_id: 0,
            _object_place_id: 0,

            admin_construction_journal_date: "",
            admin_construction_journal_number: 0,
            admin_construction_journal_tome: 0,
        }),
        []
    );

    const getSelectRowInputProps = useCallback(function <TOption>(
        rowKey: TableEditRowInputsProps<DBRows.Register>[number]["rowKey"],
        options:
            | readonly TOption[]
            | ((row: DBRows.Register) => readonly TOption[]),
        getOption: (option: TOption) => TableEditRowInputSelectOption
    ): TableEditRowInputsProps<DBRows.Register>[number] {
        return {
            rowKey,
            type: "select",
            getSelectOptions: (row) =>
                (typeof options === "function"
                    ? options(row)
                    : options
                ).map<TableEditRowInputSelectOption>((option) =>
                    getOption(option)
                ),
        };
    },
    []);
    const rowInputsProps = useMemo<TableEditRowInputsProps<DBRows.Register>>(
        () => [
            getSelectRowInputProps("type", DBRows.REGISTER_TYPES, (type) => ({
                value: type,
                name: type,
            })),
            { rowKey: "app_number", type: "number" }, // prettier-ignore
            { rowKey: "app_submission_date", type: "date" }, // prettier-ignore
            getSelectRowInputProps(
                "app_investor_id",
                investorsDBTable.rows,
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "app_decision_type",
                row => DBRows.REGISTER_SUBTYPE_INFOS[DBRows.REGISTER_TYPE_INFOS[row.type].subtype].decisions, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            { rowKey: "app_decision_number", type: "number" }, // prettier-ignore
            { rowKey: "app_decision_issue_date", type: "date" }, // prettier-ignore
            getSelectRowInputProps(
                "app_resolution_type",
                row => DBRows.REGISTER_SUBTYPE_INFOS[DBRows.REGISTER_TYPE_INFOS[row.type].subtype].resolutions, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            { rowKey: "app_resolution_number", type: "number" }, // prettier-ignore
            { rowKey: "app_resolution_issue_date", type: "date" }, // prettier-ignore
            getSelectRowInputProps(
                "app_construction_journal_type",
                DBRows.REGISTER_CONSTRUCTION_JOURNAL_TYPES,
                (type) => ({ value: type, name: type })
            ),
            getSelectRowInputProps(
                "object_construction_spec_id",
                (row) => constructionSpecsDBTable.rows.filter((fRow) => fRow.class_id === row._object_construction_class_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "object_construction_form_type",
                DBRows.REGISTER_CONSTRUCTION_FORMS, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            getSelectRowInputProps(
                "object_spatial_plan_type",
                DBRows.REGISTER_SPATIAL_PLANS, // prettier-ignore
                (type) => ({ value: type, name: type })
            ),
            { rowKey: "object_number", type: "number" }, // prettier-ignore
            getSelectRowInputProps(
                "object_street_id",
                (row) => streetsDBTable.rows.filter((fRow) => fRow.place_id === row._object_place_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            { rowKey: "object_demo_building_count", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_volume", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_usable_area", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_building_area", type: "number" }, // prettier-ignore
            { rowKey: "object_demo_under_conservation_protection", type: "checkbox" }, // prettier-ignore
            { rowKey: "object_pnb_acc_infra", type: "checkbox" }, // prettier-ignore
            { rowKey: "object_usage_change_from", type: "text" }, // prettier-ignore
            { rowKey: "object_usage_change_to", type: "text" }, // prettier-ignore
            { rowKey: "admin_construction_journal_date", type: "date" }, // prettier-ignore
            { rowKey: "admin_construction_journal_number", type: "number" }, // prettier-ignore
            { rowKey: "admin_construction_journal_tome", type: "number" }, // prettier-ignore

            getSelectRowInputProps(
                "_object_construction_section_id",
                constructionSectionsDBTable.rows,
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_construction_division_id",
                row => constructionDivisionsDBTable.rows.filter(fRow => fRow.section_id === row._object_construction_section_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_construction_group_id",
                row => constructionGroupsDBTable.rows.filter(fRow => fRow.division_id === row._object_construction_division_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_construction_class_id",
                row => constructionClassesDBTable.rows.filter(fRow => fRow.group_id === row._object_construction_group_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),

            getSelectRowInputProps(
                "_object_commune_id",
                communesDBTable.rows, // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
            getSelectRowInputProps(
                "_object_place_id",
                row => placesDBTable.rows.filter(fRow => fRow.commune_id === row._object_commune_id), // prettier-ignore
                (row) => ({ value: row.id, name: row.name })
            ),
        ],
        [
            getSelectRowInputProps,
            communesDBTable.rows,
            constructionClassesDBTable.rows,
            constructionDivisionsDBTable.rows,
            constructionGroupsDBTable.rows,
            constructionSectionsDBTable.rows,
            constructionSpecsDBTable.rows,
            investorsDBTable.rows,
            placesDBTable.rows,
            streetsDBTable.rows,
        ]
    );

    return (
        <DBTableEdit
            dbTable={registersDBTable}
            headers={["Rejestr"]}
            defaultRow={defaultRow}
            rowInputsProps={rowInputsProps}
            RowContentComponent={RegisterTableEditRowContent}
        />
    );
}
