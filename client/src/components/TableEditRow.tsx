//
// TableEditRow.tsx
// Row component for the TableEdit component
//

import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { TableEditRowType } from "./TableEdit";
import TableEditRowInput, { TableEditRowInputProps } from "./TableEditRowInput";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { MdEdit, MdDelete, MdAdd, MdCancel, MdSave } from "react-icons/md";
import Emittery from "emittery";
import { Stack } from "@mui/joy";
import {
    TableEditRowContentComponent,
    TableEditRowContentComponentProps,
} from "./TableEditRowContentComponent";

export type TableEditRowState = "viewing" | "editing" | "adding";

const newEmittery = () =>
    new Emittery<{
        rowSaved: undefined;
        rowAdded: undefined;
        rowDeleted: undefined;
        rowCanceled: undefined;
    }>();

export const TableEditRowContext = createContext<{
    state: TableEditRowState;
    eventEmitter: ReturnType<typeof newEmittery>;
} | null>(null);

export default function TableEditRow<TRow extends TableEditRowType>({
    row,
    setRow,
    onDeleteClicked,
    onAddClicked,
    onSaveClicked,
    editable,
    inputsProps,
    ContentComponent,
}: {
    row: TRow;
    setRow: Dispatch<SetStateAction<TRow>>;
    onDeleteClicked?: () => void;
    onAddClicked?: () => void;
    onSaveClicked?: () => void;
    editable: boolean;
    inputsProps: Omit<TableEditRowInputProps<TRow>, "row" | "setRow">[];
    ContentComponent?: TableEditRowContentComponent<TRow>;
}) {
    const [state, setState] = useState<TableEditRowState>(
        onAddClicked ? "adding" : "viewing"
    );
    const [eventEmitter] = useState(newEmittery()); // event emitter used to propagate events to components lower in the tree
    const upperTableEditRowContext = useContext(TableEditRowContext);

    useEffect(() => {
        setState(onAddClicked ? "adding" : "viewing");
    }, [onAddClicked]);

    /*
     *
     * Content
     *
     */

    let content: ReactNode = "";

    const getInputNode = (inputProps: (typeof inputsProps)[number]) => (
        <TableEditRowInput
            row={row}
            setRow={setRow}
            {...inputProps}
            disabled={!editable || state == "viewing"}
        />
    );

    if (ContentComponent) {
        const inputs: TableEditRowContentComponentProps<TRow>["inputs"] = {};
        inputsProps.forEach((inputProps) => {
            inputs[inputProps.rowKey] = getInputNode(inputProps);
        });
        content = <ContentComponent inputs={inputs} />;
    } else {
        content = inputsProps.map((inputProps) => (
            <td key={inputProps.rowKey}>{getInputNode(inputProps)}</td>
        ));
    }

    /*
     *
     * Action handlers
     *
     */

    const handleActionEditClicked = () => {
        setState("editing");
    };

    const handleActionSaveClicked = () => {
        setState("viewing");
        if (onSaveClicked) onSaveClicked();
        eventEmitter.emit("rowSaved");
    };

    const handleActionCancelClicked = () => {
        setState("viewing");
        eventEmitter.emit("rowCanceled");
    };

    const handleActionAddClicked = () => {
        if (onAddClicked) onAddClicked();
        eventEmitter.emit("rowAdded");
    };

    const handleActionDeleteClicked = () => {
        if (onDeleteClicked) onDeleteClicked();
        eventEmitter.emit("rowDeleted");
    };

    /*
     *
     * Action buttons
     *
     */

    const actionAddButton = (
        <IconButton
            onClick={handleActionAddClicked}
            size="sm"
            variant="plain"
            color="success"
        >
            <MdAdd />
        </IconButton>
    );
    const actionDeleteButton = (
        <IconButton
            onClick={handleActionDeleteClicked}
            size="sm"
            variant="plain"
            color="danger"
        >
            <MdDelete />
        </IconButton>
    );
    const actionEditButton = (
        <IconButton
            onClick={handleActionEditClicked}
            size="sm"
            variant="plain"
            color="primary"
        >
            <MdEdit />
        </IconButton>
    );
    const actionSaveButton = (
        <IconButton
            onClick={handleActionSaveClicked}
            size="sm"
            variant="plain"
            color="success"
        >
            <MdSave />
        </IconButton>
    );
    const actionCancelButton = (
        <IconButton
            onClick={handleActionCancelClicked}
            size="sm"
            variant="plain"
            color="danger"
        >
            <MdCancel />
        </IconButton>
    );

    /*
     *
     * TableEditRow
     *
     */

    return (
        <TableEditRowContext.Provider value={{ state, eventEmitter }}>
            <tr>
                {content}
                {editable && (
                    <>
                        {upperTableEditRowContext && (
                            <td>
                                <Stack>
                                    {state !== "adding" && actionDeleteButton}
                                    {state === "adding" && actionAddButton}
                                </Stack>
                            </td>
                        )}
                        {!upperTableEditRowContext && (
                            <td>
                                {state == "viewing" && (
                                    <ButtonGroup>
                                        {actionEditButton}
                                        {actionDeleteButton}
                                    </ButtonGroup>
                                )}
                                {state == "editing" && (
                                    <ButtonGroup>
                                        {actionSaveButton}
                                        {actionCancelButton}
                                    </ButtonGroup>
                                )}
                                {state == "adding" && (
                                    <Stack>{actionAddButton}</Stack>
                                )}
                            </td>
                        )}
                    </>
                )}
            </tr>
        </TableEditRowContext.Provider>
    );
}
