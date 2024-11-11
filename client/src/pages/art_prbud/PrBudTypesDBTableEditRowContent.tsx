import React, { useContext, useMemo } from "react";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../components/table_edit/row/TableEditRowContentComponent";
import { TableEditHeader } from "../../components/table_edit/TableEdit";
import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowInputsProps } from "../../components/table_edit/row/TableEditRow";
import { PagePrBudContext } from "../../contexts/pages/PagePrBudContext";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import { Box } from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa6";

export function PrBudTypesDBTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.PrBudType>) {
    const pageContext = useContext(PagePrBudContext)!;

    const prBudIntentsHeaders = useMemo<TableEditHeader[]>(
        () => [
            "Zamierzenie budowlane",
            "Podstawa prawna",
            "Dodatkowe wymagania",
        ],
        []
    );

    const prBudIntentsDefaultRow = useMemo<
        DBTableEditDefaultRow<DB.Rows.PrBudIntent>
    >(
        () => ({
            additional_requirements: "",
            intent: "",
            legal_basis: "",
            type_id: row.id,
        }),
        [row.id]
    );

    const prBudIntentsRowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.PrBudIntent>
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
                        dbTable={pageContext.prBudIntentsDBTable}
                        rows={pageContext.prBudIntentsDBTable.rows.filter(
                            (fRow) => fRow.type_id === row.id
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
