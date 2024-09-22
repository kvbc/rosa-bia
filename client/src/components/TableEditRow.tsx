import {
    ComponentType,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import "./TableEditRow.css";
import { TableEditEntry } from "./TableEdit";

export enum TableEditRowState {
    Viewing,
    Editing,
    Adding,
}

export type TableEditRowEvents = {
    onDeleteClicked?: () => void;
    onAddClicked?: () => void;
    onSaveClicked?: () => void;
};

export type TableEditRowContentProps<TEntry extends TableEditEntry> = {
    state: TableEditRowState;
    entry: TEntry;
    setEntry: (entry: TEntry) => void;
};

export type TableEditRowProps<TEntry extends TableEditEntry> = {
    events: TableEditRowEvents;
    entry: TEntry;
    setEntry: (entry: TEntry) => void;
    rowContentElement: ComponentType<TableEditRowContentProps<TEntry>>;
};

export default function TableEditRow<TEntry extends TableEditEntry>({
    events,
    entry,
    setEntry,
    rowContentElement: RowContentElement,
}: TableEditRowProps<TEntry>) {
    const [state, setState] = useState<TableEditRowState>(
        events.onAddClicked
            ? TableEditRowState.Adding
            : TableEditRowState.Viewing
    );

    const onEditClicked = () => {
        setState(TableEditRowState.Editing);
    };

    const onSaveClicked = () => {
        setState(TableEditRowState.Viewing);
        if (events.onSaveClicked) events.onSaveClicked();
    };

    const onCancelClicked = () => {
        setState(TableEditRowState.Viewing);
    };

    const onAddClicked = () => {
        if (events.onAddClicked) events.onAddClicked();
    };

    const onDeleteClicked = () => {
        if (events.onDeleteClicked) events.onDeleteClicked();
    };

    return (
        <tr className="table-edit-row">
            <RowContentElement
                state={state}
                entry={entry}
                setEntry={setEntry}
            />
            <td className="table-edit-row_actions">
                {state == TableEditRowState.Viewing && (
                    <>
                        <button onClick={onEditClicked}>Edytuj</button>
                        <button onClick={onDeleteClicked}>Usuń</button>
                    </>
                )}
                {state == TableEditRowState.Editing && (
                    <>
                        <button onClick={onSaveClicked}>Zapisz</button>
                        <button onClick={onCancelClicked}>Anuluj</button>
                    </>
                )}
                {state == TableEditRowState.Adding && (
                    <>
                        <button onClick={onAddClicked}>Dodaj</button>
                    </>
                )}
            </td>
        </tr>
    );
}
