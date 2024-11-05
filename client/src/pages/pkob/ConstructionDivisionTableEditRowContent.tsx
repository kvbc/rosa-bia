import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionGroupTableEditRowContent from "./ConstructionGroupTableEditRowContent";
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

export default function ConstructionDivisionTableEditRowContent({
    inputs,
    row,
    editable,
    primaryBgcolorValue,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionDivision>) {
    const pageContext = useContext(PagePKOBContext)!;

    const headers = useMemo<TableEditHeader[]>(() => ["Grupy Budowlane"], []);

    const defaultRow = useMemo<
        DBTableEditDefaultRow<DB.Rows.ConstructionGroup>
    >(
        () => ({
            name: "",
            division_id: row.id,
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionGroup>
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
                        <LuCigarette />
                        <Box>{inputs.name}</Box>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                        <DBTableEdit
                            dbTable={pageContext.constructionGroupsDBTable}
                            rows={pageContext.constructionGroupsDBTable.rows.filter(
                                (fRow) => fRow.division_id === row.id
                            )}
                            primaryBackgroundColorValue={nextTableEditColorValue(
                                primaryBgcolorValue
                            )}
                            hidePagination
                            editable={editable}
                            headers={headers}
                            defaultRow={defaultRow}
                            rowInputsProps={rowInputsProps}
                            RowContentComponent={
                                ConstructionGroupTableEditRowContent
                            }
                        />
                    </AccordionItemContent>
                </AccordionItem>
            </AccordionRoot>
        </Table.Cell>
    );
}
