//
// TableEditRow.tsx
// Row component for the TableEdit component
//

import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
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

export type TableEditRowContextData = {
    state: TableEditRowState;
    eventEmitter: ReturnType<typeof newEmittery>;
};
export const TableEditRowContext =
    createContext<TableEditRowContextData | null>(null);

export default function TableEditRow<TRow extends TableEditRowType>({
    row: tableRow,
    onDeleteClicked,
    onCancelClicked,
    onAddClicked,
    onSaveClicked,
    editable,
    inputsProps,
    ContentComponent,
}: {
    row: TRow;
    onDeleteClicked?: (row: TRow) => void;
    onCancelClicked?: (row: TRow) => void;
    onAddClicked?: (row: TRow) => void;
    onSaveClicked?: (row: TRow) => void;
    editable: boolean;
    inputsProps: Omit<TableEditRowInputProps<TRow>, "row" | "setRow">[];
    ContentComponent?: TableEditRowContentComponent<TRow>;
}) {
    const [row, setRow] = useState<TRow>(tableRow);
    const [state, setState] = useState<TableEditRowState>(
        onAddClicked ? "adding" : "viewing"
    );
    const [eventEmitter] = useState(newEmittery()); // event emitter used to propagate events to components lower in the tree
    const upperTableEditRowContext = useContext(TableEditRowContext);
    const contextData = useMemo<TableEditRowContextData>(
        () => ({
            state,
            eventEmitter,
        }),
        [state, eventEmitter]
    );

    useEffect(() => {
        setRow(tableRow);
    }, [tableRow]);

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
        onSaveClicked?.(row);
        eventEmitter.emit("rowSaved");
    };

    const handleActionCancelClicked = () => {
        setRow(tableRow);
        setState("viewing");
        onCancelClicked?.(row);
        eventEmitter.emit("rowCanceled");
    };

    const handleActionAddClicked = () => {
        onAddClicked?.(row);
        eventEmitter.emit("rowAdded");
    };

    const handleActionDeleteClicked = () => {
        onDeleteClicked?.(row);
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
        <TableEditRowContext.Provider value={contextData}>
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
