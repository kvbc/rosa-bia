import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import * as DB from "@shared/db";
import React, { useContext, useMemo } from "react";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { Box, HStack } from "@chakra-ui/react";
import { PageGeodesyContext } from "@/contexts/pages/PageGeodesyContext";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { MyTable } from "@/components/my_table/MyTable";
import { MyTableHeader } from "@/components/my_table/MyTableHeader";
import { MyTableRow } from "@/components/my_table/MyTableRow";
import { MyTableCell } from "@/components/my_table/MyTableCell";
import { FaRoad } from "react-icons/fa6";
import { FaFileAlt, FaHome } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function PlacesTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.Place>) {
    const pageGeodesyContext = useContext(PageGeodesyContext)!;

    const streetsHeaders = useMemo<TableEditHeader[]>(
        () => [
            <MyTableHeader key="1">
                <HStack>
                    <FaRoad />
                    Ulice
                </HStack>
            </MyTableHeader>,
        ],
        []
    );

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
        <AccordionRoot variant="plain" collapsible>
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <FaHome />
                    <Box>{inputs.name}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <MyTable
                        myHeaders={[
                            <MyTableHeader key="1">
                                <HStack>
                                    <FaFileAlt />
                                    Jednostka ewidencyjna
                                </HStack>
                            </MyTableHeader>,
                            <MyTableHeader key="2">
                                <HStack>
                                    <FaMapMarkedAlt />
                                    Obręb
                                </HStack>
                            </MyTableHeader>,
                        ]}
                        myRows={[
                            <MyTableRow key="1">
                                <MyTableCell>{inputs.cad_unit}</MyTableCell>
                                <MyTableCell>
                                    {inputs.area_place_id}
                                </MyTableCell>
                            </MyTableRow>,
                        ]}
                    />
                    <br />
                    <DBTableEdit
                        dbTable={pageGeodesyContext.streetsDBTable}
                        rows={pageGeodesyContext.streetsDBTable.rows.filter(
                            (fRow) => fRow.place_id === row.id
                        )}
                        editable={editable}
                        hidePagination
                        headers={streetsHeaders}
                        rowActionButtonOrientation="vertical"
                        defaultRow={streetsDefaultRow}
                        rowInputsProps={streetsRowInputsProps}
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
