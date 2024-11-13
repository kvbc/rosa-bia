import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import ConstructionDivisionTableEditRowContent from "./ConstructionDivisionTableEditRowContent";
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
import { ConstructionSectionIcon } from "./PagePKOB";

export default function ConstructionSectionTableEditRowContent({
    inputs,
    row,
    editable,
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
        <AccordionRoot collapsible variant="plain">
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <ConstructionSectionIcon />
                    <Box>{inputs.name}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <DBTableEdit
                        hidePagination
                        dbTable={pageContext.constructionDivisionsDBTable}
                        rows={pageContext.constructionDivisionsDBTable.rows.filter(
                            (fRow) => fRow.section_id === row.id
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
    );
}
