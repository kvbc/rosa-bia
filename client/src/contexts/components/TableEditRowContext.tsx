import { createContext } from "react";
import { TableEditRowState } from "../../components/table_edit/row/TableEditRow";

export const TableEditRowContext = createContext<{
    state: TableEditRowState;
} | null>(null);
