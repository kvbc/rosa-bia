//
// TableEditRow.tsx
// Row component for the TableEdit component
//
// TODO: Review
//

import {
    ComponentType,
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { TableEditEntry } from "./TableEdit";
import TableEditRowInput, { TableEditRowInputProps } from "./TableEditRowInput";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { MdEdit, MdDelete, MdAdd, MdCancel, MdSave } from "react-icons/md";
import Emittery from "emittery";

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
    eventEmitter: Emittery;
};

export type TableEditRowContentComponentType<TEntry> = ComponentType<
    TableEditRowContentProps<TEntry>
>;

export const TableEditRowContext = createContext<{
    rowState: TableEditRowState;
} | null>(null);

export type TableEditRowProps<TEntry extends TableEditEntry> = {
    events: TableEditRowEvents;
    entry: TEntry;
    editable: boolean;
    actionTDClassName?: string;
    setEntry: (entry: TEntry) => void;
    inputsProps: Omit<TableEditRowInputProps<TEntry>, "entry" | "setEntry">[];
    ContentComponent?: TableEditRowContentComponentType<TEntry>;
};

export default function TableEditRow<TEntry extends TableEditEntry>({
    events,
    entry,
    editable,
    setEntry,
    inputsProps,
    actionTDClassName,
    ContentComponent,
}: TableEditRowProps<TEntry>) {
    const [state, setState] = useState<TableEditRowState>(
        events.onAddClicked
            ? TableEditRowState.Adding
            : TableEditRowState.Viewing
    );
    const [eventEmitter] = useState<Emittery>(new Emittery());
    const tableEditRowContext = useContext(TableEditRowContext);

    useEffect(() => {
        if (
            tableEditRowContext &&
            tableEditRowContext.rowState !== TableEditRowState.Adding
        )
            setState(tableEditRowContext.rowState);
    }, [tableEditRowContext?.rowState]);

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
        eventEmitter.emit("save");
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
                <TableEditRowInput
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
                eventEmitter={eventEmitter}
            />
        );
    } else {
        content = inputsProps.map((inputProps) => (
            <td>
                <TableEditRowInput
                    entry={entry}
                    setEntry={setEntry}
                    {...inputProps}
                    disabled={!editable || state == TableEditRowState.Viewing}
                />
            </td>
        ));
    }

    return (
        <TableEditRowContext.Provider
            value={{
                rowState: state,
            }}
        >
            <tr>
                {content}
                {editable && (
                    <>
                        {tableEditRowContext && (
                            <td className={actionTDClassName}>
                                <div className="w-full h-full flex items-center justify-center">
                                    {state !== TableEditRowState.Adding && (
                                        <IconButton
                                            onClick={onDeleteClicked}
                                            size="sm"
                                            variant="plain"
                                            color="danger"
                                        >
                                            <MdDelete />
                                        </IconButton>
                                    )}
                                    {state === TableEditRowState.Adding && (
                                        <IconButton
                                            onClick={onAddClicked}
                                            size="sm"
                                            variant="plain"
                                            color="success"
                                        >
                                            <MdAdd />
                                        </IconButton>
                                    )}
                                </div>
                            </td>
                        )}
                        {!tableEditRowContext && (
                            <td className={actionTDClassName}>
                                {state == TableEditRowState.Viewing && (
                                    <ButtonGroup>
                                        <IconButton
                                            onClick={onEditClicked}
                                            size="sm"
                                            variant="plain"
                                            color="primary"
                                        >
                                            <MdEdit />
                                        </IconButton>
                                        <IconButton
                                            onClick={onDeleteClicked}
                                            size="sm"
                                            variant="plain"
                                            color="danger"
                                        >
                                            <MdDelete />
                                        </IconButton>
                                    </ButtonGroup>
                                )}
                                {state == TableEditRowState.Editing && (
                                    <ButtonGroup>
                                        <IconButton
                                            onClick={onSaveClicked}
                                            size="sm"
                                            variant="plain"
                                            color="success"
                                        >
                                            <MdSave />
                                        </IconButton>
                                        <IconButton
                                            onClick={onCancelClicked}
                                            size="sm"
                                            variant="plain"
                                            color="danger"
                                        >
                                            <MdCancel />
                                        </IconButton>
                                    </ButtonGroup>
                                )}
                                {state == TableEditRowState.Adding && (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <IconButton
                                            onClick={onAddClicked}
                                            size="sm"
                                            variant="plain"
                                            color="success"
                                        >
                                            <MdAdd />
                                        </IconButton>
                                    </div>
                                )}
                            </td>
                        )}
                    </>
                )}
            </tr>
        </TableEditRowContext.Provider>
    );
}
