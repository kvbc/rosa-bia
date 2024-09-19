import { PropsWithChildren, useState } from "react";
import "./TableEditRow.css";

export enum State {
    Viewing,
    Editing,
    Adding,
}

export default function TableEditRow({
    children,
    onDeleteClicked,
    onAddClicked: _onAddClicked,
    onSaveClicked: _onSaveClicked,
    onEditClicked: _onEditClicked,
    onCancelClicked: _onCancelClicked,
    onClearClicked,
}: PropsWithChildren<{
    onDeleteClicked?: () => void;
    onAddClicked?: () => void;
    onSaveClicked?: () => void;
    onCancelClicked?: () => void;
    onClearClicked?: () => void;
    onEditClicked?: () => void;
}>) {
    const [state, setState] = useState<State>(
        _onAddClicked ? State.Adding : State.Viewing
    );

    const onEditClicked = () => {
        setState(State.Editing);
        if (_onEditClicked) _onEditClicked();
    };

    const onSaveClicked = () => {
        setState(State.Viewing);
        if (_onSaveClicked) _onSaveClicked();
    };

    const onCancelClicked = () => {
        setState(State.Viewing);
        if (_onCancelClicked) _onCancelClicked();
    };

    const onAddClicked = () => {
        if (onClearClicked) onClearClicked();
        if (_onAddClicked) _onAddClicked();
    };

    return (
        <tr className="table-edit-row">
            {children}
            <td className="table-edit-row_actions">
                {state == State.Viewing && (
                    <>
                        <button onClick={onEditClicked}>Edytuj</button>
                        <button onClick={onDeleteClicked}>Usuń</button>
                    </>
                )}
                {state == State.Editing && (
                    <>
                        <button onClick={onSaveClicked}>Zapisz</button>
                        <button onClick={onCancelClicked}>Anuluj</button>
                    </>
                )}
                {state == State.Adding && (
                    <>
                        <button onClick={onAddClicked}>Dodaj</button>
                        <button onClick={onClearClicked}>Wyczyść</button>
                    </>
                )}
            </td>
        </tr>
    );
}
