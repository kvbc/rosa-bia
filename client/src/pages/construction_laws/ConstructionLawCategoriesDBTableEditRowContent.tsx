import { useMemo } from "react";
import * as DB from "@shared/db";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion";
import { Box } from "@chakra-ui/react";
import { FaFolder } from "react-icons/fa6";
import { MyTableCell } from "@/components/my_table/MyTableCell";
import useDBTable from "@/hooks/useDBTable";

export function ConstructionLawCategoriesDBTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionLawCategory>) {
    // const pageContext = useContext(PageConstructionLawsContext)!;
    const constructionLawIntentsDBTable = useDBTable<DB.Rows.ConstructionLawIntent>("construction_law_intents"); // prettier-ignore

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
        <MyTableCell>
            <AccordionRoot collapsible variant="plain" lazyMount>
                <AccordionItem value="1">
                    <AccordionItemTrigger>
                        <FaFolder />
                        <Box>{inputs.name}</Box>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                        <DBTableEdit
                            hidePagination
                            dbTable={constructionLawIntentsDBTable}
                            rows={constructionLawIntentsDBTable.rows.filter(
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
        </MyTableCell>
    );
}
