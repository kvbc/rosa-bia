import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionDivisionTableEditRowContent from "./ConstructionDivisionTableEditRowContent";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import { useContext, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/pages/PagePKOBContext";
import React from "react";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import { Box, Table } from "@chakra-ui/react";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import { LuCigarette } from "react-icons/lu";
import {
    nextTableEditColorValue,
    TableEditHeader,
} from "../../components/table_edit/TableEdit";

export default function ConstructionSectionTableEditRowContent({
    inputs,
    row,
    editable,
    primaryBgColorValue: primaryBgcolorValue,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionSection>) {
    const pageContext = useContext(PagePKOBContext)!;

    const headers = useMemo<TableEditHeader[]>(() => ["Działy Budowlane"], []);

    const defaultRow = useMemo<
        DBTableEditDefaultRow<DB.Rows.ConstructionDivision>
    >(
        () => ({
            name: "",
            section_id: row.id,
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionDivision>
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
            <AccordionRoot collapsible variant="plain">
                <AccordionItem value="1">
                    <AccordionItemTrigger>
                        <LuCigarette />
                        <Box>{inputs.name}</Box>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                        <DBTableEdit
                            hidePagination
                            dbTable={pageContext.constructionDivisionsDBTable}
                            rows={pageContext.constructionDivisionsDBTable.rows.filter(
                                (fRow) => fRow.section_id === row.id
                            )}
                            primaryBackgroundColorValue={nextTableEditColorValue(
                                primaryBgcolorValue
                            )}
                            editable={editable}
                            headers={headers}
                            defaultRow={defaultRow}
                            rowInputsProps={rowInputsProps}
                            RowContentComponent={
                                ConstructionDivisionTableEditRowContent
                            }
                        />
                    </AccordionItemContent>
                </AccordionItem>
            </AccordionRoot>
        </Table.Cell>
    );
}
