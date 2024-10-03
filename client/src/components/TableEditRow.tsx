import { ComponentType, ReactNode, useEffect, useState } from "react";
import "./TableEditRow.css";
import { TableEditEntry } from "./TableEdit";
import MyInput, { MyInputProps } from "./MyInput";

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

export type TableEditRowContentProps<TEntry> = {
    inputs: { [key in keyof TEntry]?: ReactNode };
    entry: TEntry;
    editable: boolean;
    setEntry: (entry: TEntry) => void;
};

export type TableEditRowInputProps<TEntry extends TableEditEntry> = Omit<
    MyInputProps<TEntry>,
    "entry" | "setEntry"
>;

export type TableEditRowContentComponentType<TEntry> = ComponentType<
    TableEditRowContentProps<TEntry>
>;

export default function TableEditRow<TEntry extends TableEditEntry>({
    events,
    entry,
    editable,
    setEntry,
    inputsProps,
    ContentComponent,
}: {
    events: TableEditRowEvents;
    entry: TEntry;
    editable: boolean;
    setEntry: (entry: TEntry) => void;
    inputsProps: TableEditRowInputProps<TEntry>[];
    ContentComponent?: TableEditRowContentComponentType<TEntry>;
}) {
    const [state, setState] = useState<TableEditRowState>(
        events.onAddClicked
            ? TableEditRowState.Adding
            : TableEditRowState.Viewing
    );

    useEffect(() => {
        setState(
            events.onAddClicked
                ? TableEditRowState.Adding
                : TableEditRowState.Viewing
        );
    }, [events.onAddClicked]);

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

    let content: ReactNode = "";
    if (ContentComponent) {
        const inputs: TableEditRowContentProps<TEntry>["inputs"] = {};
        inputsProps.forEach((inputProps) => {
            inputs[inputProps.entryKey] = (
                <MyInput
                    entry={entry}
                    setEntry={setEntry}
                    {...inputProps}
                    disabled={!editable || state == TableEditRowState.Viewing}
                />
            );
        });
        content = (
            <ContentComponent
                inputs={inputs}
                entry={entry}
                editable={editable && state != TableEditRowState.Viewing}
                setEntry={setEntry}
            />
        );
    } else {
        content = inputsProps.map((inputProps) => (
            <td>
                <MyInput
                    entry={entry}
                    setEntry={setEntry}
                    {...inputProps}
                    disabled={!editable || state == TableEditRowState.Viewing}
                />
            </td>
        ));
    }

    return (
        <tr className="table-edit-row">
            {content}
            <td className="table-edit-row_actions">
                {state == TableEditRowState.Viewing && (
                    <>
                        <button onClick={onEditClicked} disabled={!editable}>
                            Edytuj
                        </button>
                        <button onClick={onDeleteClicked} disabled={!editable}>
                            Usuń
                        </button>
                    </>
                )}
                {state == TableEditRowState.Editing && (
                    <>
                        <button onClick={onSaveClicked} disabled={!editable}>
                            Zapisz
                        </button>
                        <button onClick={onCancelClicked} disabled={!editable}>
                            Anuluj
                        </button>
                    </>
                )}
                {state == TableEditRowState.Adding && (
                    <>
                        <button onClick={onAddClicked} disabled={!editable}>
                            Dodaj
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}
