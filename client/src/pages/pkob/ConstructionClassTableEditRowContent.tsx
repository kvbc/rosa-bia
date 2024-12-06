import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import React, { useContext, useMemo } from "react";

import * as DB from "@shared/db";
import { PagePKOBContext } from "@/contexts/pages/PagePKOBContext";
import { Box, HStack } from "@chakra-ui/react";
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
import { ConstructionClassIcon, ConstructionSpecIcon } from "./PagePKOB";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaTags } from "react-icons/fa6";

export default function ConstructionClassTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionClass>) {
    const pageContext = useContext(PagePKOBContext)!;

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.ConstructionSpec>>(
        () => ({
            name: "",
            class_id: row.id,
            ob_cat: "",
            zl_class: "",
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionSpec>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
            {
                type: "text",
                rowKey: "ob_cat",
            },
            {
                type: "text",
                rowKey: "zl_class",
            },
        ],
        []
    );

    return (
        <MyTableCell>
            <AccordionRoot variant="plain" collapsible lazyMount>
                <AccordionItem value="1">
                    <AccordionItemTrigger>
                        <ConstructionClassIcon />
                        <Box>{inputs.name}</Box>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                        <MyTable>
                            <MyTableHeader>PKOB</MyTableHeader>,
                            <MyTableRow>
                                <MyTableCell>{inputs.pkob}</MyTableCell>
                            </MyTableRow>
                            ,
                        </MyTable>
                        <br />
                        <DBTableEdit
                            dbTable={pageContext.constructionSpecsDBTable}
                            rows={pageContext.constructionSpecsDBTable.rows.filter(
                                (fRow) => fRow.class_id === row.id
                            )}
                            editable={editable}
                            hidePagination
                            defaultRow={defaultRow}
                            rowInputsProps={rowInputsProps}
                            title="Wyszczególnienia Budowlane"
                            headers={[
                                <MyTableHeader key="1">
                                    <HStack>
                                        <ConstructionSpecIcon />
                                        Wyszczególnienie Budowlane
                                    </HStack>
                                </MyTableHeader>,
                                <MyTableHeader key="2">
                                    <HStack>
                                        <FaTags />
                                        Kat. Obiektu
                                    </HStack>
                                </MyTableHeader>,
                                <MyTableHeader key="3">
                                    <HStack>
                                        <FaExclamationTriangle />
                                        Kat. Zagrożenia Ludzi
                                    </HStack>
                                </MyTableHeader>,
                            ]}
                        />
                    </AccordionItemContent>
                </AccordionItem>
            </AccordionRoot>
        </MyTableCell>
    );
}
