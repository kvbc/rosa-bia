import { MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { ClientRegister } from "../PageRegisters";
import { FaRuler } from "react-icons/fa6";
import { HStack } from "@chakra-ui/react";

export default function RegisterCharParamsTableEdit(
    props: TableEditRowContentComponentProps<ClientRegister>
) {
    const { inputs } = props;

    return (
        <Tb height="full" isCollapsible>
            <Th colSpan={2}>
                <HStack gap="1">
                    <FaRuler />
                    Charakterystyczne parametry
                </HStack>
            </Th>
            <Tr>
                <Tc>Powierzchnia zabudowy [m²]</Tc>
                <Tc>{inputs.object_demo_building_area}</Tc>
            </Tr>
            <Tr>
                <Tc>Powierzchnia użytkowa [m²]</Tc>
                <Tc>{inputs.object_demo_usable_area}</Tc>
            </Tr>
            <Tr>
                <Tc>Kubatura [m³]</Tc>
                <Tc>{inputs.object_demo_volume}</Tc>
            </Tr>
            <Tr>
                <Tc>Ilość budynków [szt.]</Tc>
                <Tc>{inputs.object_demo_building_count}</Tc>
            </Tr>
            <Tr>
                <Tc>Ilość lokali [szt.]</Tc>
                <Tc>{inputs.object_demo_premises_count}</Tc>
            </Tr>
        </Tb>
    );
}
