import { useEffect, useState } from "react";
import {
    Gmina,
    Miejscowosc,
    PKOB,
    Register,
    RegisterAdminActions,
    RegisterBuildTypes,
    RegisterInvestPlots,
    TypeEntry,
    Ulica,
} from "../../../../server/src/types";
import DBTableEdit from "../../components/DBTableEdit";
import { MyInputSelectOption } from "../../components/MyInput";
import { TableEditRowContentProps } from "../../components/TableEditRow";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
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

export default function RegisterTableEditRowContent(
    props: TableEditRowContentProps<Register>
) {
    const { inputs, entry, editable, setEntry } = props;

    return (
        <td>
            <Table size="sm">
                <tr>
                    <th className="w-[10%] bg-gray-100">Typ Rejestru</th>
                    <td>{inputs.typ}</td>
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
