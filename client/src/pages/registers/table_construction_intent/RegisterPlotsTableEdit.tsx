import * as DB from "@shared/db";
import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import { useMemo } from "react";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { ClientRegister } from "../PageRegisters";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { FaMap } from "react-icons/fa6";
import { Box } from "@chakra-ui/react";
import useDBTable from "@/hooks/useDBTable";
import { RegisterPlotsMentionButton } from "./RegisterPlotsMentionButton";
import { MySelectOption } from "@/components/my_input/MyInputSelect";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion";

export default function RegisterPlotsDataTableEdit({
    row,
    plotType,
    editable,
}: TableEditRowContentComponentProps<ClientRegister> & {
    plotType: DB.Rows.RegisterPlotType;
}) {
    const registerPlotsDBTable = useDBTable<DB.Rows.RegisterPlot>("registers_plots"); // prettier-ignore
    const communesDBTable = useDBTable<DB.Rows.Commune>("communes"); // prettier-ignore
    const placesDBTable = useDBTable<DB.Rows.Place>("places"); // prettier-ignore
    const streetsDBTable = useDBTable<DB.Rows.Street>("streets"); // prettier-ignore

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.RegisterPlot>>(
        () => ({
            register_id: row.id,
            plot: "",
            type: plotType,
            commune_id: 0,
            place_id: 0,
            street_id: row.object_street_id,
        }),
        [row.id, plotType, row.object_street_id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.RegisterPlot>
    >(
        () => [
            {
                type: "text",
                rowKey: "plot",
                placeholder: "Działka",
            },
            {
                type: "select",
                rowKey: "commune_id",
                placeholder: "Gmina",
                getSelectOptions: () =>
                    communesDBTable.rows.map<MySelectOption>((commune) => ({
                        value: commune.id,
                        label: commune.name,
                    })),
            },
            {
                type: "select",
                rowKey: "place_id",
                placeholder: "Miejscowość",
                getSelectOptions: (plotRow) =>
                    placesDBTable.rows
                        .filter(
                            (place) => place.commune_id === plotRow.commune_id
                        )
                        .map<MySelectOption>((place) => ({
                            value: place.id,
                            label: place.name,
                        })),
            },
            {
                type: "select",
                rowKey: "street_id",
                placeholder: "Ulica",
                getSelectOptions: (plotRow) =>
                    streetsDBTable.rows
                        .filter(
                            (street) => street.place_id === plotRow.place_id
                        )
                        .map<MySelectOption>((street) => ({
                            value: street.id,
                            label: street.name,
                        })),
            },
        ],
        [communesDBTable.rows, placesDBTable.rows, streetsDBTable.rows]
    );

    const plotTypeHeaders: Record<DB.Rows.RegisterPlotType, string> = useMemo(
        () => ({
            app: "Działki objęte wnioskiem",
            invest: "Działki objęte inwestycją",
            road: "Działki w pasie drogi",
            limited: "Działki z ograniczonym korzystaniem",
        }),
        []
    );

    const headers = useMemo<TableEditHeader[]>(
        () => ["Działka", "Gmina", "Miejscowość", "Ulica"],
        []
    );

    return (
        <AccordionRoot
            collapsible
            lazyMount
            colorPalette="orange"
            variant="plain"
        >
            <AccordionItem value="1" fontSize="inherit">
                <AccordionItemTrigger fontSize="inherit">
                    <FaMap />
                    <Box>{plotTypeHeaders[plotType]}</Box>
                    <RegisterPlotsMentionButton
                        subtitle={plotTypeHeaders[plotType]}
                        plotType={plotType}
                        registerRowID={row.id}
                    />
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <DBTableEdit
                        hidePagination
                        dbTable={registerPlotsDBTable}
                        rows={registerPlotsDBTable.rows.filter(
                            (fRow) =>
                                fRow.register_id === row.id &&
                                fRow.type === plotType
                        )}
                        editable={editable}
                        defaultRow={defaultRow}
                        // showEmptyState={false}
                        headers={headers}
                        rowInputsProps={rowInputsProps}
                        isCollapsible
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
