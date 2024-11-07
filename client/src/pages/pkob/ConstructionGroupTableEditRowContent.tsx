import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import ConstructionClassTableEditRowContent from "./ConstructionClassTableEditRowContent";
import { FaHouse } from "react-icons/fa6";
import { Box } from "@mui/joy";
import { DB } from "../../../../server/src/db/types";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import React, { useContext, useMemo } from "react";
import { PagePKOBContext } from "../../contexts/pages/PagePKOBContext";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import { nextTableEditColorValue } from "../../components/table_edit/TableEdit";

export default function ConstructionGroupTableEditRowContent({
    renderInput,
    row,
    editable,
    primaryBgColorValue,
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
                    <FaHouse />
                    <Box>{renderInput("name")}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <DBTableEdit
                        dbTable={pageContext.constructionClassesDBTable}
                        rows={pageContext.constructionClassesDBTable.rows.filter(
                            (fRow) => fRow.group_id === row.id
                        )}
                        primaryBackgroundColorValue={nextTableEditColorValue(
                            primaryBgColorValue
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
