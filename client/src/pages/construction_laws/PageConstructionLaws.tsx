import React, { ContextType, useMemo } from "react";
import useDBTable from "@/hooks/useDBTable";
import * as DB from "@shared/db";
import { PageConstructionLawsContext } from "@/contexts/pages/PageConstructionLawsContext";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { ConstructionLawCategoriesDBTableEditRowContent } from "./ConstructionLawCategoriesDBTableEditRowContent";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion";
import { FaFolder } from "react-icons/fa6";
import { MyTable } from "@/components/my_table/MyTable";
import { MyTableCell } from "@/components/my_table/MyTableCell";
import { MyTableHeader } from "@/components/my_table/MyTableHeader";
import { MyTableRow } from "@/components/my_table/MyTableRow";

export const PageConstructionLaws: React.FC = () => {
    const constructionLawCategoriesDBTable = useDBTable<DB.Rows.ConstructionLawCategory>("construction_law_categories"); // prettier-ignore
    const constructionLawIntentsDBTable = useDBTable<DB.Rows.ConstructionLawIntent>("construction_law_intents"); // prettier-ignore

    const pageContext = useMemo<
        ContextType<typeof PageConstructionLawsContext>
    >(
        () => ({
            constructionLawIntentsDBTable,
        }),
        [constructionLawIntentsDBTable]
    );

    const headers = useMemo<TableEditHeader[]>(
        () => ["Rodzaj zamierzenia budowlanego"],
        []
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.ConstructionLawCategory>
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
        <PageConstructionLawsContext.Provider value={pageContext}>
            <MyTable
                myHeaders={[
                    <MyTableHeader key="1">Typ rejestru</MyTableHeader>,
                ]}
                myRows={DB.Rows.REGISTER_TYPES.map((registerType) => (
                    <MyTableRow key={registerType}>
                        <MyTableCell>
                            <AccordionRoot collapsible variant="plain">
                                <AccordionItem
                                    value={registerType}
                                    key={registerType}
                                >
                                    <AccordionItemTrigger>
                                        <FaFolder />
                                        {registerType}
                                    </AccordionItemTrigger>
                                    <AccordionItemContent>
                                        <DBTableEdit
                                            hidePagination
                                            dbTable={
                                                constructionLawCategoriesDBTable
                                            }
                                            headers={headers}
                                            rows={constructionLawCategoriesDBTable.rows.filter(
                                                (fRow) =>
                                                    fRow.register_type ===
                                                    registerType
                                            )}
                                            defaultRow={
                                                {
                                                    name: "",
                                                    register_type: registerType,
                                                } satisfies DBTableEditDefaultRow<DB.Rows.ConstructionLawCategory>
                                            }
                                            rowActionButtonOrientation="vertical"
                                            rowInputsProps={rowInputsProps}
                                            RowContentComponent={
                                                ConstructionLawCategoriesDBTableEditRowContent
                                            }
                                        />
                                    </AccordionItemContent>
                                </AccordionItem>
                            </AccordionRoot>
                        </MyTableCell>
                    </MyTableRow>
                ))}
            />
        </PageConstructionLawsContext.Provider>
    );
};
