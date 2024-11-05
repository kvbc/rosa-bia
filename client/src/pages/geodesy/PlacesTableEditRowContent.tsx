import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import { DB } from "../../../../server/src/db/types";
import React, { useContext, useMemo } from "react";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import {
    nextTableEditColorValue,
    TableEditHeader,
} from "../../components/table_edit/TableEdit";
import { Box, Table } from "@chakra-ui/react";
import { LuHome } from "react-icons/lu";
import { PageGeodesyContext } from "../../contexts/pages/PageGeodesyContext";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";

export default function PlacesTableEditRowContent({
    inputs,
    row,
    editable,
    primaryBgcolorValue,
}: TableEditRowContentComponentProps<DB.Rows.Place>) {
    const pageGeodesyContext = useContext(PageGeodesyContext)!;

    const streetsHeaders = useMemo<TableEditHeader[]>(() => ["Ulice"], []);

    const streetsDefaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Street>>(
        () => ({
            place_id: row.id,
            name: "",
        }),
        [row.id]
    );

    const streetsRowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.Street>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
        ],
        []
    );

    return (
        <Table.Cell>
            <AccordionRoot variant="plain" collapsible>
                <AccordionItem value="1">
                    <AccordionItemTrigger>
                        <LuHome />
                        <Box>{inputs.name}</Box>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                        {/* TODO: transform this table */}
                        {/* <Table size="sm">
                            <thead>
                                <tr>
                                    <th>Jedn. ewid.</th>
                                    <th>Obręb</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{inputs.cad_unit}</td>
                                    <td>{inputs.area_place_id}</td>
                                </tr>
                            </tbody>
                        </Table> */}
                        {/* <br /> */}
                        <DBTableEdit
                            dbTable={pageGeodesyContext.streetsDBTable}
                            rows={pageGeodesyContext.streetsDBTable.rows.filter(
                                (fRow) => fRow.place_id === row.id
                            )}
                            editable={editable}
                            hidePagination
                            headers={streetsHeaders}
                            primaryBackgroundColorValue={nextTableEditColorValue(
                                primaryBgcolorValue
                            )}
                            rowActionButtonOrientation="vertical"
                            defaultRow={streetsDefaultRow}
                            rowInputsProps={streetsRowInputsProps}
                        />
                    </AccordionItemContent>
                </AccordionItem>
            </AccordionRoot>
        </Table.Cell>
    );
}
