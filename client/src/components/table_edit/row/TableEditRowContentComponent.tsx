import { ComponentType, Dispatch, ReactNode, SetStateAction } from "react";
import { TableEditRowType } from "../TableEdit";

export type TableEditRowContentComponentProps<TRow extends TableEditRowType> = {
    inputs: Partial<Record<keyof TRow & string, ReactNode>>;
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    onInputFocusOut: () => void;
    editable: boolean;
    eventTarget: EventTarget;
};

export type TableEditRowContentComponent<TRow extends TableEditRowType> =
    ComponentType<TableEditRowContentComponentProps<TRow>>;
