import { useState } from "react";
import useDBEntriesStore, { DBEntries } from "../../hooks/useDBEntriesStore";
import { TableEditRowInputSelectOption } from "../../components/TableEditRowInput";
import RegisterTableEditRowContent from "./RegisterTableEditRowContent";
import { TableEditRowInputProps } from "../../components/TableEditRow";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { FaStamp } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { Scale } from "@mui/icons-material";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import DBTableEdit from "../../components/DBTableEdit";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/joy";
import { FaDatabase, FaGear } from "react-icons/fa6";
import { DB, DBRow } from "../../../../server/src/dbTypes";

export default function RejestryStrona() {
    const registerDBEntries = useDBEntriesStore<DB.Register>("registers")(); // prettier-ignore
    const communeDBEntries = useDBEntriesStore<DB.Commune>("communes")(); // prettier-ignore
    const placeDBEntries = useDBEntriesStore<DB.Place>("places")(); // prettier-ignore
    const streetDBEntries = useDBEntriesStore<DB.Street>('streets')(); // prettier-ignore
    const constructionClassDBEntries = useDBEntriesStore<DB.ConstructionClass>("construction_classes")(); // prettier-ignore
    const constructionSectionDBEntries = useDBEntriesStore<DB.ConstructionSection>("construction_sections")(); // prettier-ignore
    const constructionGroupDBEntries = useDBEntriesStore<DB.ConstructionGroup>("construction_groups")(); // prettier-ignore
    const constructionDivisionDBEntries = useDBEntriesStore<DB.ConstructionDivision>("construction_divisions")(); // prettier-ignore
    const constructionSpecDBEntries = useDBEntriesStore<DB.ConstructionSpec>("construction_specs")(); // prettier-ignore
    const investorDBEntries = useDBEntriesStore<DB.Investor>("investors")(); // prettier-ignore

    const emptyEntry: DB.Register = {
        id: registerDBEntries.entryCount + 1,
        // object_construction_form_type: "",
        object_number: "",
        // object_spatial_plan_type: "",
        object_street_id: 0,
        object_construction_spec_id: 0,
        _object_construction_division_id: 0,
        _object_construction_group_id: 0,
        _object_construction_class_id: 0,
        _object_construction_section_id: 0,
        _object_commune_id: 0,
        _object_place_id: 0,
        admin_construction_journal_date: "",
        admin_construction_journal_number: 0,
        object_demo_building_count: 0,
        object_demo_volume: 0,
        object_demo_usable_area: 0,
        object_demo_building_area: 0,
        object_demo_under_conservation_protection: false,
        object_pnb_acc_infra: false,
        type: "PnB (6740)",
        app_submission_date: "",
        app_decision_issue_date: "",
        app_decision_number: 0,
        // wniosek_decyzja_typ: "",
        app_investor_id: 0,
        app_number: 0,
        app_resolution_issue_date: "",
        app_resolution_number: 0,
        // wniosek_rozstrzygniecie_typ: "",
    };
    const rowInputsProps: TableEditRowInputProps<DB.Register>[] = [];
    const addInputProps = (
        entryKey: TableEditRowInputProps<DB.Register>["entryKey"],
        type: TableEditRowInputProps<DB.Register>["type"]
    ) => {
        rowInputsProps.push({ type, entryKey });
    };
    const addSelectInputProps = <T extends DBRow>(
        entryKey: keyof DB.Register,
        dbEntries: DBEntries<T>,
        selectEntryNameKey: keyof T
    ) => {
        rowInputsProps.push({
            type: "select",
            entryKey: entryKey,
            selectOptions: dbEntries.entries.map<TableEditRowInputSelectOption>(
                (entry) => ({
                    value: entry.id,
                    name: entry[selectEntryNameKey],
                })
            ),
        });
    };
    rowInputsProps.push({
        type: "select",
        entryKey: "object_construction_form_type",
        selectOptions:
            DB.REGISTER_CONSTRUCTION_FORMS.map<TableEditRowInputSelectOption>(
                (constructionForm) => ({
                    value: constructionForm,
                    name: constructionForm,
                })
            ),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "object_spatial_plan_type",
        selectOptions:
            DB.REGISTER_SPATIAL_PLANS.map<TableEditRowInputSelectOption>(
                (spatialPlan) => ({
                    value: spatialPlan,
                    name: spatialPlan,
                })
            ),
    });
    // addSelectInputProps('objec', constructionFormDBEntries, 'forma') // prettier-ignore
    addInputProps('object_number', 'text') // prettier-ignore
    addInputProps('object_demo_building_count', 'number') // prettier-ignore
    addInputProps('object_demo_usable_area', 'number') // prettier-ignore
    addInputProps('object_demo_building_area', 'number') // prettier-ignore
    addInputProps('object_demo_volume', 'number') // prettier-ignore
    addInputProps('admin_construction_journal_date', 'date') // prettier-ignore
    addInputProps('admin_construction_journal_number', 'number') // prettier-ignore
    // addSelectInputProps("obiekt_planowanie_przestrzenne_id", spatialPlanDBEntries, 'planowanie'); // prettier-ignore
    // addSelectInputProps("obiekt_ulica_id", streetDBEntries, 'nazwa'); // prettier-ignore
    // addSelectInputProps("obiekt_klasa_id", constructionClassDBEntries, 'klasa'); // prettier-ignore
    addInputProps("object_pnb_acc_infra", "checkbox");
    addInputProps("object_demo_under_conservation_protection", "checkbox");
    addSelectInputProps("_object_commune_id", communeDBEntries, 'name'); // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "_object_place_id",
        getSelectOptions: (entry) =>
            placeDBEntries.entries
                .filter(
                    (fEntry) => fEntry.commune_id === entry._object_commune_id
                )
                .map<TableEditRowInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.name,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "object_street_id",
        getSelectOptions: (entry) =>
            streetDBEntries.entries
                .filter((fEntry) => fEntry.place_id === entry._object_place_id)
                .map<TableEditRowInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.name,
                })),
    });
    addSelectInputProps("_object_construction_section_id", constructionSectionDBEntries, 'name'); // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "_object_construction_division_id",
        getSelectOptions: (entry) =>
            constructionDivisionDBEntries.entries
                .filter(
                    (fEntry) =>
                        fEntry.section_id ===
                        entry._object_construction_section_id
                )
                .map<TableEditRowInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.name,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "_object_construction_group_id",
        getSelectOptions: (entry) =>
            constructionGroupDBEntries.entries
                .filter(
                    (fEntry) =>
                        fEntry.division_id ===
                        entry._object_construction_division_id
                )
                .map<TableEditRowInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.name,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "_object_construction_class_id",
        getSelectOptions: (entry) =>
            constructionClassDBEntries.entries
                .filter(
                    (fEntry) =>
                        fEntry.group_id === entry._object_construction_group_id
                )
                .map<TableEditRowInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.name,
                })),
    });
    rowInputsProps.push({
        type: "select",
        entryKey: "object_construction_spec_id",
        getSelectOptions: (entry) =>
            constructionSpecDBEntries.entries
                .filter(
                    (fEntry) =>
                        fEntry.class_id === entry._object_construction_class_id
                )
                .map<TableEditRowInputSelectOption>((entry) => ({
                    value: entry.id,
                    name: entry.name,
                })),
    });
    // addSelectInputProps("typ_id", registerTypeDBEntries, 'typ'); // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "type",
        selectOptions: DB.REGISTER_TYPES.map<TableEditRowInputSelectOption>(
            (registerType) => ({
                value: registerType,
                name: registerType,
            })
        ),
    });
    addInputProps('app_submission_date', 'date') // prettier-ignore
    addInputProps('app_decision_issue_date', 'date') // prettier-ignore
    addInputProps('app_decision_number', 'number') // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "app_decision_type",
        getSelectOptions: (entry) =>
            DB.REGISTER_SUBTYPE_INFOS[
                DB.REGISTER_TYPE_INFOS[entry.type].subtype
            ].decisions.map<TableEditRowInputSelectOption>((type) => ({
                value: type,
                name: type,
            })),
    });
    addSelectInputProps("app_investor_id", investorDBEntries, 'name'); // prettier-ignore
    addInputProps('app_number', 'number') // prettier-ignore
    addInputProps('app_resolution_issue_date', 'date') // prettier-ignore
    addInputProps('app_resolution_number', 'number') // prettier-ignore
    rowInputsProps.push({
        type: "select",
        entryKey: "app_resolution_type",
        getSelectOptions: (entry) =>
            DB.REGISTER_SUBTYPE_INFOS[
                DB.REGISTER_TYPE_INFOS[entry.type].subtype
            ].resolutions.map<TableEditRowInputSelectOption>((type) => ({
                value: type,
                name: type,
            })),
    });

    return (
        <div>
            <DBTableEdit
                dbEntries={registerDBEntries}
                headers={["Rejestr"]}
                emptyEntry={emptyEntry}
                rowInputsProps={rowInputsProps}
                RowContentComponent={RegisterTableEditRowContent}
            />
        </div>
    );
}
