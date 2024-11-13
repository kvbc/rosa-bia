import React, { useContext, useMemo } from "react";
import * as DB from "@shared/db";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { PageConstructionLawsContext } from "@/contexts/pages/PageConstructionLawsContext";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion";
import { Box } from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa6";

export function ConstructionLawCategoriesDBTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionLawCategory>) {
    const pageContext = useContext(PageConstructionLawsContext)!;

    const prBudIntentsHeaders = useMemo<TableEditHeader[]>(
        () => [
            "Zamierzenie budowlane",
            "Podstawa prawna",
            "Dodatkowe wymagania",
        ],
        []
    );

    const prBudIntentsDefaultRow = useMemo<
        DBTableEditDefaultRow<DB.Rows.ConstructionLawIntent>
    >(
        () => ({
            additional_requirements: "",
            intent: "",
            legal_basis: "",
            category_id: row.id,
        }),
        [row.id]
    );

    const prBudIntentsRowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionLawIntent>
    >(
        () => [
            {
                type: "text",
                rowKey: "intent",
            },
            {
                type: "text",
                rowKey: "legal_basis",
            },
            {
                type: "text",
                rowKey: "additional_requirements",
            },
        ],
        []
    );

    return (
        <AccordionRoot collapsible variant="plain">
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <FaFolder />
                    <Box>{inputs.name}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <DBTableEdit
                        hidePagination
                        dbTable={pageContext.constructionLawIntentsDBTable}
                        rows={pageContext.constructionLawIntentsDBTable.rows.filter(
                            (fRow) => fRow.category_id === row.id
                        )}
                        editable={editable}
                        headers={prBudIntentsHeaders}
                        defaultRow={prBudIntentsDefaultRow}
                        rowInputsProps={prBudIntentsRowInputsProps}
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
