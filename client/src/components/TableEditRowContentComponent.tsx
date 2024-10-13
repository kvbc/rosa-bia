import { ComponentType, ReactNode } from "react";
import { TableEditRowType } from "./TableEdit";

export type TableEditRowContentComponentProps<TRow extends TableEditRowType> = {
    inputs: { [key in keyof TRow]?: ReactNode };
};

export type TableEditRowContentComponent<TRow extends TableEditRowType> =
    ComponentType<TableEditRowContentComponentProps<TRow>>;
