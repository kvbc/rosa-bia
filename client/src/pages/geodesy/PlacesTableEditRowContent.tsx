import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import { DB } from "../../../../server/src/db/types";
import React, { useContext, useMemo } from "react";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import {
    getTableEditColor,
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
    renderInput,
    row,
    editable,
    primaryBgColorValue,
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

    primaryBgColorValue = nextTableEditColorValue(primaryBgColorValue);
    const secondaryBgColorValue = nextTableEditColorValue(primaryBgColorValue); // prettier-ignore
    const thirdBgColorValue = nextTableEditColorValue(secondaryBgColorValue); // prettier-ignore
    const primaryBgColor = getTableEditColor(primaryBgColorValue); // prettier-ignore
    const secondaryBgColor = getTableEditColor(secondaryBgColorValue); // prettier-ignore
    const thirdBgColor = getTableEditColor(thirdBgColorValue);

    return (
        <AccordionRoot variant="plain" collapsible>
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <LuHome />
                    <Box>{renderInput("name")}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <Table.Root size="sm" variant="outline">
                        <Table.Header>
                            <Table.Row backgroundColor={secondaryBgColor}>
                                <Table.ColumnHeader borderColor={thirdBgColor}>
                                    Jedn. ewid.
                                </Table.ColumnHeader>
                                <Table.ColumnHeader borderColor={thirdBgColor}>
                                    Obręb
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row backgroundColor={primaryBgColor}>
                                <Table.Cell>
                                    {renderInput(
                                        "cad_unit",
                                        primaryBgColorValue
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    {renderInput(
                                        "area_place_id",
                                        primaryBgColorValue
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                    <br />
                    <DBTableEdit
                        dbTable={pageGeodesyContext.streetsDBTable}
                        rows={pageGeodesyContext.streetsDBTable.rows.filter(
                            (fRow) => fRow.place_id === row.id
                        )}
                        editable={editable}
                        hidePagination
                        headers={streetsHeaders}
                        primaryBackgroundColorValue={primaryBgColorValue}
                        rowActionButtonOrientation="vertical"
                        defaultRow={streetsDefaultRow}
                        rowInputsProps={streetsRowInputsProps}
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
