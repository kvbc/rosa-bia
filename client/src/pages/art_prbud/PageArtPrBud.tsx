import React, { ContextType, useMemo } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { PagePrBudContext } from "../../contexts/pages/PagePrBudContext";
import { TableEditHeader } from "../../components/table_edit/TableEdit";
import {
    DBTableEdit,
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowInputsProps } from "../../components/table_edit/row/TableEditRow";
import { PrBudTypesDBTableEditRowContent } from "./PrBudTypesDBTableEditRowContent";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import { FaFolder } from "react-icons/fa6";
import { MyTable } from "../../components/my_table/MyTable";
import { MyTableCell } from "../../components/my_table/MyTableCell";
import { MyTableHeader } from "../../components/my_table/MyTableHeader";
import { MyTableRow } from "../../components/my_table/MyTableRow";

export const PageArtPrBud: React.FC = () => {
    const prBudTypesDBTable = useDBTable<DB.Rows.PrBudType>("prbud_types"); // prettier-ignore
    const prBudIntentsDBTable = useDBTable<DB.Rows.PrBudIntent>("prbud_intents"); // prettier-ignore

    const pageContext = useMemo<ContextType<typeof PagePrBudContext>>(
        () => ({
            prBudIntentsDBTable,
        }),
        [prBudIntentsDBTable]
    );

    const prBudTypesHeaders = useMemo<TableEditHeader[]>(
        () => ["Rodzaj zamierzenia budowlanego"],
        []
    );

    const prBudTypesRowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.PrBudType>
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
        <PagePrBudContext.Provider value={pageContext}>
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
                                            dbTable={prBudTypesDBTable}
                                            headers={prBudTypesHeaders}
                                            rows={prBudTypesDBTable.rows.filter(
                                                (fRow) =>
                                                    fRow.register_type ===
                                                    registerType
                                            )}
                                            defaultRow={
                                                {
                                                    name: "",
                                                    register_type: registerType,
                                                } satisfies DBTableEditDefaultRow<DB.Rows.PrBudType>
                                            }
                                            rowActionButtonOrientation="vertical"
                                            rowInputsProps={
                                                prBudTypesRowInputsProps
                                            }
                                            RowContentComponent={
                                                PrBudTypesDBTableEditRowContent
                                            }
                                        />
                                    </AccordionItemContent>
                                </AccordionItem>
                            </AccordionRoot>
                        </MyTableCell>
                    </MyTableRow>
                ))}
            />
        </PagePrBudContext.Provider>
    );
};
