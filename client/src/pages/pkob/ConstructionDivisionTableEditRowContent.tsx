import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import ConstructionGroupTableEditRowContent from "./ConstructionGroupTableEditRowContent";
import * as DB from "@shared/db";
import { useContext, useMemo } from "react";
import { PagePKOBContext } from "@/contexts/pages/PagePKOBContext";
import React from "react";
import { Box } from "@chakra-ui/react";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { ConstructionDivisionIcon } from "./PagePKOB";

export default function ConstructionDivisionTableEditRowContent({
    inputs,
    row,
    editable,
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
        <AccordionRoot variant="plain" collapsible>
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <ConstructionDivisionIcon />
                    <Box>{inputs.name}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <DBTableEdit
                        dbTable={pageContext.constructionGroupsDBTable}
                        rows={pageContext.constructionGroupsDBTable.rows.filter(
                            (fRow) => fRow.division_id === row.id
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
    );
}
