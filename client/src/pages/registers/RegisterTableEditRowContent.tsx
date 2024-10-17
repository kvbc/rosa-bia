import { Stack, Table } from "@mui/joy";
import RegisterDataTable from "./subtables/RegisterDataTable";
import RegisterConstructionIntentTable from "./subtables/RegisterConstructionIntentTable";
import RegisterAdminProcedureTable from "./subtables/RegisterAdminProcedureTable";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import React from "react";

export default function RegisterTableEditRowContent(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { inputs } = props;

    return (
        <td>
            <Table size="sm">
                <tr>
                    <th className="w-[10%]">Typ Rejestru</th>
                    <td>{inputs.type}</td>
                </tr>
            </Table>
            <Stack direction="row">
                <RegisterDataTable {...props} />
                <RegisterConstructionIntentTable {...props} />
                <RegisterAdminProcedureTable {...props} />
            </Stack>
        </td>
    );
}
