import RegisterAdminProcedureActionsTable from "./RegisterAdminProcedureActionsTable";
import { DB } from "../../../../../server/src/db/types";
import React, { ComponentProps } from "react";
import { TableEditRowContentComponentProps } from "../../../components/table_edit/row/TableEditRowContentComponent";
import { MyTable, MyTable as Tb } from "../../../components/my_table/MyTable";
import { MyTableCell as Tc } from "../../../components/my_table/MyTableCell";
import { MyTableHeader as Th } from "../../../components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "../../../components/my_table/MyTableRow";
import RegisterCharParamsTableEdit from "../table_construction_intent/RegisterCharParamsTableEdit";
import { FeatureUnfinishedIcon } from "../../../components/FeatureUnfinishedIcon";
import { topRowHeight } from "../RegisterTableEditRowContent";

export default function RegisterAdminProceduresTableEdit(
    props: ComponentProps<typeof MyTable> &
        TableEditRowContentComponentProps<DB.Rows.Register> & {
            showMore: boolean;
        }
) {
    const { inputs, row, showMore, ...myTableProps } = props;

    const showCharParamsTable = row.type === "PnB (6740)";

    return (
        <Tb
            myHeaders={
                <>
                    <Th colSpan={2}>Postępowanie administracyjne</Th>
                </>
            }
            {...myTableProps}
        >
            <Tr height={topRowHeight}>
                <Tc>Informacja o postępowaniu</Tc>
                <Tc>
                    <FeatureUnfinishedIcon />
                </Tc>
            </Tr>
            <Tr height={topRowHeight}>
                <Tc>Upływający czas (dni)</Tc>
                <Tc>
                    <FeatureUnfinishedIcon />
                </Tc>
            </Tr>
            {showMore && (
                <>
                    <Tr>
                        <Tc colSpan={2}>
                            <RegisterAdminProcedureActionsTable {...props} />
                        </Tc>
                    </Tr>
                    {DB.Rows.REGISTER_TYPE_INFOS[row.type]
                        .showAdminConstructionJournal && (
                        <Tr>
                            <Tc colSpan={2}>
                                <Tb
                                    isCollapsible
                                    myHeaders={
                                        <>
                                            <Th colSpan={2}>Dziennik budowy</Th>
                                        </>
                                    }
                                >
                                    <Tr>
                                        <Tc>Numer</Tc>
                                        <Tc>
                                            {
                                                inputs.admin_construction_journal_number
                                            }
                                        </Tc>
                                    </Tr>
                                    <Tr>
                                        <Tc>Z dnia</Tc>
                                        <Tc>
                                            {
                                                inputs.admin_construction_journal_date
                                            }
                                        </Tc>
                                    </Tr>
                                </Tb>
                            </Tc>
                        </Tr>
                    )}
                    {showCharParamsTable && (
                        <Tr>
                            <Tc colSpan={2}>
                                <RegisterCharParamsTableEdit {...props} />
                            </Tc>
                        </Tr>
                    )}
                </>
            )}
        </Tb>
    );
}
