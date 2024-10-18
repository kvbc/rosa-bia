import { Stack, Table } from "@mui/joy";
import RegisterDataTableEdit from "./table_app_data/RegisterDataTableEdit";
import { DBRows } from "../../../../server/src/dbTypes";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import React from "react";
import RegisterConstructionIntentTableEdit from "./table_construction_intent/RegisterConstructionIntentTableEdit";
import RegisterAdminProceduresTableEdit from "./table_admin_procedures/RegisterAdminProceduresTableEdit";

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
            <Stack direction="row" justifyContent="stretch">
                <RegisterDataTableEdit {...props} />
                <RegisterConstructionIntentTableEdit {...props} />
                <RegisterAdminProceduresTableEdit {...props} />
            </Stack>
        </td>
    );
}
