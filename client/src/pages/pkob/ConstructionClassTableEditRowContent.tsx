import { FaHouse } from "react-icons/fa6";
import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import React, { useContext, useMemo } from "react";
import { TableEditRowContentComponentProps } from "../../components/table_edit/TableEditRowContentComponent";
import { DB } from "../../../../server/src/db/types";
import { PagePKOBContext } from "../../contexts/pages/PagePKOBContext";
import { TableEditRowInputsProps } from "../../components/table_edit/TableEditRow";
import { Box, Table } from "@chakra-ui/react";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import {
    getTableEditColor,
    nextTableEditColorValue,
} from "../../components/table_edit/TableEdit";

export default function ConstructionClassTableEditRowContent({
    renderInput,
    row,
    editable,
    primaryBgColorValue,
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
        <AccordionRoot variant="plain" collapsible>
            <AccordionItem value="1">
                <AccordionItemTrigger>
                    <FaHouse />
                    <Box>{renderInput("name")}</Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row
                                backgroundColor={getTableEditColor(
                                    nextTableEditColorValue(
                                        primaryBgColorValue,
                                        2
                                    )
                                )}
                            >
                                <Table.ColumnHeader border="none">
                                    PKOB
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row
                                backgroundColor={getTableEditColor(
                                    nextTableEditColorValue(primaryBgColorValue)
                                )}
                            >
                                <Table.Cell>
                                    {renderInput(
                                        "pkob",
                                        nextTableEditColorValue(
                                            primaryBgColorValue
                                        )
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                    <br />
                    <DBTableEdit
                        dbTable={pageContext.constructionSpecsDBTable}
                        rows={pageContext.constructionSpecsDBTable.rows.filter(
                            (fRow) => fRow.class_id === row.id
                        )}
                        primaryBackgroundColorValue={nextTableEditColorValue(
                            primaryBgColorValue
                        )}
                        editable={editable}
                        hidePagination
                        defaultRow={defaultRow}
                        rowInputsProps={rowInputsProps}
                        // headers={["Wyszczególnienia Budowlane"]}
                        // RowContentComponent={
                        //     ConstructionSpecTableEditRowContent
                        // }
                        title="Wyszczególnienia Budowlane"
                        headers={[
                            "Wyszczególnienie Budowlane",
                            "Kat. OB",
                            "Klasa ZL",
                        ]}
                    />
                </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
