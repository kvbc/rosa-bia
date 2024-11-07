import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { DB } from "../../../../server/src/db/types";
import React, { useContext, useMemo } from "react";
import PlacesTableEditRowContent from "./PlacesTableEditRowContent";
import { Box } from "@chakra-ui/react";
import { TableEditHeader } from "../../components/table_edit/TableEdit";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import { LuBuilding } from "react-icons/lu";
import { PageGeodesyContext } from "../../contexts/pages/PageGeodesyContext";
import { TableEditRowContentComponentProps } from "../../components/table_edit/row/TableEditRowContentComponent";
import { TableEditRowInputsProps } from "../../components/table_edit/row/TableEditRow";
import { MySelectOption } from "../../components/MySelect";

export default function CommunesDBTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.Commune>) {
    const pageGeodesyContext = useContext(PageGeodesyContext)!;

    const placesHeaders = useMemo<TableEditHeader[]>(
        () => ["Miejscowości"],
        []
    );

    const placesDefaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Place>>(
        () => ({
            commune_id: row.id,
            cad_unit: "",
            name: "",
            area_place_id: 0,
        }),
        [row.id]
    );

    const placesRowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.Place>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
            {
                type: "select",
                rowKey: "area_place_id",
                getSelectOptions: () =>
                    pageGeodesyContext.placesDBTable.rows.map<MySelectOption>(
                        (row) => ({
                            value: row.id,
                            name: row.name,
                        })
                    ),
            },
            {
                type: "text",
                rowKey: "cad_unit",
            },
        ],
        [pageGeodesyContext.placesDBTable.rows]
    );

    return (
        <AccordionRoot collapsible variant="plain">
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <LuBuilding />
                    <Box>{inputs.name}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <DBTableEdit
                        hidePagination
                        dbTable={pageGeodesyContext.placesDBTable}
                        rows={pageGeodesyContext.placesDBTable.rows.filter(
                            (fRow) => fRow.commune_id === row.id
                        )}
                        rowActionButtonOrientation="vertical"
                        colorPalette="blue"
                        editable={editable}
                        headers={placesHeaders}
                        defaultRow={placesDefaultRow}
                        rowInputsProps={placesRowInputsProps}
                        RowContentComponent={PlacesTableEditRowContent}
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
