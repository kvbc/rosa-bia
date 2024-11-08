import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionClassTableEditRowContent from "./ConstructionClassTableEditRowContent";
import { Box } from "@mui/joy";
import { DB } from "../../../../server/src/db/types";
import React, { useContext, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/pages/PagePKOBContext";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import { TableEditRowInputsProps } from "../../components/table_edit/row/TableEditRow";
import { TableEditRowContentComponentProps } from "../../components/table_edit/row/TableEditRowContentComponent";
import { ConstructionGroupIcon } from "./PagePKOB";

export default function ConstructionGroupTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.ConstructionGroup>) {
    const pageContext = useContext(PagePKOBContext)!;

    const defaultRow = useMemo<
        DBTableEditDefaultRow<DB.Rows.ConstructionClass>
    >(
        () => ({
            name: "",
            pkob: 0,
            group_id: row.id,
        }),
        [row.id]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionClass>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
            {
                type: "number",
                rowKey: "pkob",
            },
        ],
        []
    );

    return (
        <AccordionRoot variant="plain" collapsible>
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <ConstructionGroupIcon />
                    <Box>{inputs.name}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <DBTableEdit
                        dbTable={pageContext.constructionClassesDBTable}
                        rows={pageContext.constructionClassesDBTable.rows.filter(
                            (fRow) => fRow.group_id === row.id
                        )}
                        editable={editable}
                        headers={["Klasy Budowlane"]}
                        hidePagination
                        defaultRow={defaultRow}
                        rowInputsProps={rowInputsProps}
                        RowContentComponent={
                            ConstructionClassTableEditRowContent
                        }
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
