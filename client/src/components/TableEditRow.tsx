//
// TableEditRow.tsx
// Row component for the TableEdit component
//

import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { TableEditRowType } from "./TableEdit";
import TableEditRowInput, { TableEditRowInputProps } from "./TableEditRowInput";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { MdEdit, MdDelete, MdAdd, MdCancel, MdSave } from "react-icons/md";
import { Stack } from "@mui/joy";
import {
    TableEditRowContentComponent,
    TableEditRowContentComponentProps,
} from "./TableEditRowContentComponent";

export type TableEditRowState = "viewing" | "editing" | "adding";

export const TableEditRowStateContext = createContext<TableEditRowState | null>(
    null
);

export type TableEditRowInputsProps<TRow extends TableEditRowType> = Omit<
    TableEditRowInputProps<TRow>,
    "row" | "setRow" | "onBlur"
>[];

export default function TableEditRow<TRow extends TableEditRowType>({
    row: tableRow,
    onDeleteClicked,
    onAddClicked,
    stateProp,
    onSaveClicked,
    editable,
    actionButtonOrientation = "horizontal",
    showSaveAction,
    inputsProps,
    ContentComponent,
}: {
    row: TRow;
    onDeleteClicked?: (row: TRow) => void;
    onAddClicked?: (row: TRow) => void;
    onSaveClicked?: (row: TRow) => void;
    showSaveAction: boolean;
    editable: boolean;
    stateProp: TableEditRowState;
    actionButtonOrientation?: "horizontal" | "vertical";
    inputsProps: TableEditRowInputsProps<TRow>;
    ContentComponent?: TableEditRowContentComponent<TRow>;
}) {
    const [row, setRow] = useState<TRow>({ ...tableRow });
    const [state, setState] = useState<TableEditRowState>(stateProp);
    const [eventTarget] = useState(new EventTarget());

    useEffect(() => {
        setRow({ ...tableRow });
    }, [tableRow]);

    useEffect(() => {
        setState(stateProp);
    }, [stateProp]);

    const isContentEditable = state === "editing" || state === "adding";

    const handleInputBlur = useCallback(() => {
        console.log("lul");
        eventTarget.dispatchEvent(new CustomEvent("saved"));
        onSaveClicked?.(row);
    }, [onSaveClicked, row, eventTarget]);

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
            disabled={!isContentEditable}
            onBlur={handleInputBlur}
        />
    );

    if (ContentComponent) {
        const inputs: TableEditRowContentComponentProps<TRow>["inputs"] = {};
        inputsProps.forEach((inputProps) => {
            inputs[inputProps.rowKey] = getInputNode(inputProps);
        });
        content = (
            <ContentComponent
                inputs={inputs}
                row={row}
                setRow={setRow}
                editable={isContentEditable}
                onInputBlur={handleInputBlur}
                eventTarget={eventTarget}
            />
        );
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

    const handleActionSaveClicked = useCallback(() => {
        setState("viewing");
        eventTarget.dispatchEvent(new CustomEvent("saved"));
        onSaveClicked?.(row);
    }, [onSaveClicked, row, eventTarget]);

    const handleActionCancelClicked = useCallback(() => {
        setRow(tableRow);
        setState("viewing");
    }, [tableRow]);

    const handleActionAddClicked = useCallback(() => {
        onAddClicked?.(row);
    }, [row, onAddClicked]);

    const handleActionDeleteClicked = useCallback(() => {
        onDeleteClicked?.(row);
    }, [row, onDeleteClicked]);

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
     *
     *
     */

    // useEffect(() => {
    //     // console.log("update");
    //     const connectAction = (
    //         action: "add" | "cancel" | "save" | "delete",
    //         callback?: (row: TRow) => void
    //     ) => {
    //         return upperRowContext?.eventEmitter.on(action, (dir) => {
    //             if (dir === "lower") {
    //                 console.log(">>>", action, dir);
    //                 if (contextData.depth === maxRowDepth) {
    //                     callback?.(row);
    //                     // setRow((row) => {
    //                     //     callback?.(row);
    //                     //     return row;
    //                     // });
    //                     eventEmitter.emit(action, "higher");
    //                 } else {
    //                     eventEmitter.emit(action, "lower");
    //                 }
    //             } else if (dir === "higher") {
    //                 callback?.(row);
    //                 // setRow((row) => {
    //                 //     callback?.(row);
    //                 //     return row;
    //                 // });
    //                 upperRowContext.eventEmitter.emit(action, "higher");
    //             }
    //         });
    //     };
    //     const offs = [
    //         upperRowContext?.eventEmitter.on("stateChanged", setState),
    //         connectAction("add", onAddClicked),
    //         connectAction("save", onSaveClicked),
    //         connectAction("delete", onDeleteClicked),
    //         connectAction("cancel", onCancelClicked),
    //     ];
    //     return () => {
    //         offs.forEach((off) => off?.());
    //     };
    // }, [
    //     upperRowContext?.eventEmitter,
    //     eventEmitter,
    //     onAddClicked,
    //     onCancelClicked,
    //     onDeleteClicked,
    //     onSaveClicked,
    //     row,
    //     contextData.depth,
    //     maxRowDepth,
    // ]);

    /*
     *
     * TableEditRow
     *
     */

    return (
        <tr>
            <TableEditRowStateContext.Provider value={state}>
                {content}
            </TableEditRowStateContext.Provider>
            {editable && (
                <>
                    {!showSaveAction && (
                        <td>
                            <Stack>
                                {state !== "adding" && actionDeleteButton}
                                {state === "adding" && actionAddButton}
                            </Stack>
                        </td>
                    )}
                    {showSaveAction && (
                        <td>
                            {state == "viewing" && (
                                <ButtonGroup
                                    orientation={actionButtonOrientation}
                                >
                                    {actionEditButton}
                                    {actionDeleteButton}
                                </ButtonGroup>
                            )}
                            {state == "editing" && (
                                <ButtonGroup
                                    orientation={actionButtonOrientation}
                                >
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
    );
}
