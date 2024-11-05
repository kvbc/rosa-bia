import { ComponentType, Dispatch, ReactNode, SetStateAction } from "react";
import { TableEditColorValue, TableEditRowType } from "./TableEdit";

export type TableEditRowContentComponentProps<TRow extends TableEditRowType> = {
    renderInput: (
        key: keyof TRow & string,
        primaryBgcolorValue?: TableEditColorValue
    ) => ReactNode;
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    onInputBlur: () => void;
    primaryBgColorValue: TableEditColorValue;
    editable: boolean;
    eventTarget: EventTarget;
};

export type TableEditRowContentComponent<TRow extends TableEditRowType> =
    ComponentType<TableEditRowContentComponentProps<TRow>>;
