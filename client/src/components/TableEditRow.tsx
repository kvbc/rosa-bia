import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
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

export type TableEditRowInputSelectOption = {
    value: string | number;
    name: string;
};

export type TableEditRowInputInfo<TEntry extends TableEditEntry> = {
    type: HTMLInputTypeAttribute | "select";
    entryKey: keyof TEntry;
    uneditable?: boolean;
    selectOptions?: TableEditRowInputSelectOption[];
    placeholder?: string;
};

export default function TableEditRow<TEntry extends TableEditEntry>({
    events,
    entry,
    setEntry,
    inputInfos,
}: {
    events: TableEditRowEvents;
    entry: TEntry;
    setEntry: (entry: TEntry) => void;
    inputInfos: TableEditRowInputInfo<TEntry>[];
}) {
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
            {inputInfos.map((inputInfo) => (
                <td>
                    {inputInfo.type === "select" && (
                        <select
                            value={entry[inputInfo.entryKey]}
                            onChange={(e) =>
                                setEntry({
                                    ...entry,
                                    [inputInfo.entryKey]: e.target.value,
                                })
                            }
                            disabled={
                                inputInfo.uneditable
                                    ? true
                                    : state == TableEditRowState.Viewing
                            }
                        >
                            {inputInfo.selectOptions &&
                                inputInfo.selectOptions.map((selectOption) => (
                                    <option
                                        value={selectOption.value}
                                        key={selectOption.value}
                                    >
                                        {selectOption.name}
                                    </option>
                                ))}
                        </select>
                    )}
                    {inputInfo.type !== "select" && (
                        <input
                            type={inputInfo.type}
                            value={entry[inputInfo.entryKey]}
                            onChange={(e) =>
                                setEntry({
                                    ...entry,
                                    [inputInfo.entryKey]: e.target.value,
                                })
                            }
                            disabled={
                                inputInfo.uneditable
                                    ? true
                                    : state == TableEditRowState.Viewing
                            }
                            placeholder={inputInfo.placeholder}
                        />
                    )}
                </td>
            ))}
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
