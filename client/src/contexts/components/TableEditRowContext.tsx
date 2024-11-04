import { createContext } from "react";
import { TableEditRowState } from "../../components/table_edit/TableEditRow";

export const TableEditRowContext = createContext<TableEditRowState | null>(
    null
);
