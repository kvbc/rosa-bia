import React from "react";
import { MyTableCell } from "@/components/my_table/MyTableCell";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { MyTable } from "@/components/my_table/MyTable";
import { MyTableRow } from "@/components/my_table/MyTableRow";
import { MyTableHeader } from "@/components/my_table/MyTableHeader";
import { RegisterTableEditRowContentBodyOther } from "./RegisterTableEditRowContentBodyOther";
import { RegisterTableEditRowContentBodyNormal } from "./RegisterTableEditRowContentBodyNormal";
import { ClientRegister } from "./PageRegisters";
import { FaBook, FaUserTie } from "react-icons/fa6";
import { HStack } from "@chakra-ui/react";

export const topRowHeight = "30px";

export default function RegisterTableEditRowContent(
    props: TableEditRowContentComponentProps<ClientRegister>
) {
    const { row, inputs, ftoggles } = props;

    const isRegisterOther =
        row.type === "Konserwator (Inne)" ||
        row.type === "Lokalizacja inwestycji (Inne)" ||
        row.type === "PiNB (Inne)";

    return (
        <>
            <MyTable>
                <MyTableHeader width="1/2">
                    <HStack gap="1">
                        {ftoggles.type}
                        <FaBook />
                        Typ Rejestru
                    </HStack>
                </MyTableHeader>
                <MyTableHeader width="1/2">
                    <HStack gap="1">
                        {ftoggles.assigned_employee_id}
                        <FaUserTie />
                        Przydział
                    </HStack>
                </MyTableHeader>
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
