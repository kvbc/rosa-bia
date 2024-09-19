import {
    Dispatch,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import "./TableEditRow.css";

export enum State {
    Viewing,
    Editing,
    Adding,
}

export type Events<TRowData> = {
    onDeleteClicked?: (rowData: TRowData) => void;
    onAddClicked?: (rowData: TRowData) => void;
    onSaveClicked?: (rowData: TRowData) => void;
};

export default function TableEditRow<TRowData>({
    children,
    events,
    rowData,
    setRowData,
    startRowData,
    renderContent,
}: PropsWithChildren<{
    events: Events<TRowData>;
    rowData: TRowData;
    setRowData: Dispatch<SetStateAction<TRowData>>;
    startRowData: TRowData;
    renderContent: (state: State) => ReactNode;
}>) {
    const [state, setState] = useState<State>(
        events.onAddClicked ? State.Adding : State.Viewing
    );

    useEffect(() => {
        if (state == State.Viewing) setRowData(startRowData);
    }, [state, startRowData]);

    const onEditClicked = () => {
        setState(State.Editing);
    };

    const onSaveClicked = () => {
        setState(State.Viewing);
        if (events.onSaveClicked) events.onSaveClicked(rowData);
    };

    const onCancelClicked = () => {
        setState(State.Viewing);
        setRowData(startRowData);
    };

    const onAddClicked = () => {
        onClearClicked();
        if (events.onAddClicked) events.onAddClicked(rowData);
    };

    const onDeleteClicked = () => {
        if (events.onDeleteClicked) events.onDeleteClicked(rowData);
    };

    const onClearClicked = () => {
        setRowData(startRowData);
    };

    return (
        <tr className="table-edit-row">
            {renderContent(state)}
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
