import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import { DB } from "../../../../server/src/db/types";
import React, { useContext, useMemo } from "react";
import PlacesTableEditRowContent from "./PlacesTableEditRowContent";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import { TableEditRowInputSelectOption } from "../../components/table_edit/TableEditRowInputSelect";
import { Box, Table } from "@chakra-ui/react";
import {
    nextTableEditColorValue,
    TableEditHeader,
} from "../../components/table_edit/TableEdit";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import { LuBuilding } from "react-icons/lu";
import { PageGeodesyContext } from "../../contexts/pages/PageGeodesyContext";

export default function CommunesDBTableEditRowContent({
    inputs,
    row,
    editable,
    primaryBgcolorValue,
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
                selectOptions:
                    pageGeodesyContext.placesDBTable.rows.map<TableEditRowInputSelectOption>(
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
        <Table.Cell>
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
                            primaryBackgroundColorValue={nextTableEditColorValue(
                                primaryBgcolorValue
                            )}
                            editable={editable}
                            headers={placesHeaders}
                            defaultRow={placesDefaultRow}
                            rowInputsProps={placesRowInputsProps}
                            RowContentComponent={PlacesTableEditRowContent}
                        />
                    </AccordionItemContent>
                </AccordionItem>
            </AccordionRoot>
        </Table.Cell>
    );
}
