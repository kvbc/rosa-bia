import { ComponentType, Dispatch, ReactNode, SetStateAction } from "react";
import { TableEditColorValue, TableEditRowType } from "./TableEdit";

export type TableEditRowContentComponentProps<TRow extends TableEditRowType> = {
    inputs: { [key in keyof TRow]?: ReactNode };
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    onInputBlur: () => void;
    primaryBgcolorValue: TableEditColorValue;
    editable: boolean;
    eventTarget: EventTarget;
};

export type TableEditRowContentComponent<TRow extends TableEditRowType> =
    ComponentType<TableEditRowContentComponentProps<TRow>>;
