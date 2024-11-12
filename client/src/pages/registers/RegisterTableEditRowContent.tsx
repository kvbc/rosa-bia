import { DB } from "../../../../server/src/db/types";
import React from "react";
import { MyTableCell } from "../../components/my_table/MyTableCell";
import { TableEditRowContentComponentProps } from "../../components/table_edit/row/TableEditRowContentComponent";
import { MyTable } from "../../components/my_table/MyTable";
import { MyTableRow } from "../../components/my_table/MyTableRow";
import { MyTableHeader } from "../../components/my_table/MyTableHeader";
import { RegisterTableEditRowContentBodyOther } from "./RegisterTableEditRowContentBodyOther";
import { RegisterTableEditRowContentBodyNormal } from "./RegisterTableEditRowContentBodyNormal";

export const topRowHeight = "30px";

export default function RegisterTableEditRowContent(
    props: TableEditRowContentComponentProps<DB.Rows.Register>
) {
    const { row, inputs } = props;

    const isRegisterOther =
        row.type === "Konserwator (Inne)" ||
        row.type === "Lokalizacja inwestycji (Inne)" ||
        row.type === "PiNB (Inne)";

    return (
        <>
            <MyTable
                myHeaders={
                    <>
                        <MyTableHeader>Typ Rejestru</MyTableHeader>
                        <MyTableHeader>Przydział</MyTableHeader>
                    </>
                }
            >
                <MyTableRow>
                    <MyTableCell>{inputs.type}</MyTableCell>
                    <MyTableCell>{inputs.assigned_employee_id}</MyTableCell>
                </MyTableRow>
            </MyTable>
            {/* <MyTable
                myRows={
                    <>
                        <MyTableRow>
                            <MyTableHeaderRow>Przydział</MyTableHeaderRow>
                            <MyTableCell>
                                {inputs.assigned_employee_id}
                            </MyTableCell>
                        </MyTableRow>
                        <MyTableRow>
                            <MyTableHeaderRow width="10%">
                                Typ Rejestru
                            </MyTableHeaderRow>
                            <MyTableCell>{inputs.type}</MyTableCell>
                        </MyTableRow>
                    </>
                }
            /> */}
            {isRegisterOther ? (
                <RegisterTableEditRowContentBodyOther {...props} />
            ) : (
                <RegisterTableEditRowContentBodyNormal {...props} />
            )}
        </>
    );
}
