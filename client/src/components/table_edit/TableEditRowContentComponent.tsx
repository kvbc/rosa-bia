import { ComponentType, Dispatch, ReactNode, SetStateAction } from "react";
import { TableEditRowType } from "./TableEdit";

export type TableEditRowContentComponentProps<TRow extends TableEditRowType> = {
    inputs: { [key in keyof TRow]?: ReactNode };
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    onInputBlur: () => void;
    editable: boolean;
    eventTarget: EventTarget;
};

export type TableEditRowContentComponent<TRow extends TableEditRowType> =
    ComponentType<TableEditRowContentComponentProps<TRow>>;
