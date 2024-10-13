import { useEffect, useState } from "react";
import DBTableEdit from "../../components/DBTableEdit";
import { TableEditRowInputSelectOption } from "../../components/TableEditRowInput";
import { TableEditRowContentComponentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBTableStore";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Select,
    Table,
} from "@mui/joy";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaDatabase } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { MdMore } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import RegisterDataTable from "./RegisterDataTable";
import RegisterConstructionIntentTable from "./RegisterConstructionIntentTable";
import RegisterAdminProcedureActionsTable from "./RegisterAdminProcedureActionsTable";
import RegisterAdminProcedureTable from "./RegisterAdminProcedureTable";
import { DBRows } from "../../../../server/src/dbTypes";

export default function RegisterTableEditRowContent(
    props: TableEditRowContentComponentProps<DBRows.Register>
) {
    const { inputs, row: entry, editable, setRow: setEntry } = props;

    return (
        <td>
            <Table size="sm">
                <tr>
                    <th className="w-[10%] bg-gray-100">Typ Rejestru</th>
                    <td>{inputs.type}</td>
                </tr>
            </Table>
            <div className="flex">
                <RegisterDataTable {...props} />
                <RegisterConstructionIntentTable {...props} />
                <RegisterAdminProcedureTable {...props} />
            </div>
        </td>
    );
}
