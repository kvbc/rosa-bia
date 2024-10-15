//
// TableEditRow.tsx
// Row component for the TableEdit component
//

import React, {
    createContext,
    ReactNode,
    useCallback,
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
        save: "lower" | "higher";
        add: "lower" | "higher";
        delete: "lower" | "higher";
        cancel: "lower" | "higher";
        lowerRowRegistered: undefined;
        stateChanged: TableEditRowState;
    }>();

export type TableEditRowContextType = {
    eventEmitter: ReturnType<typeof newEmittery>;
    depth: number;
};

export const TableEditRowContext =
    createContext<TableEditRowContextType | null>(null);

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
    const upperRowContext = useContext(TableEditRowContext);
    const [maxRowDepth, setMaxRowDepth] = useState(1);
    const contextData = useMemo<TableEditRowContextType>(
        () => ({
            eventEmitter,
            depth: upperRowContext ? upperRowContext.depth + 1 : 0,
        }),
        [eventEmitter, upperRowContext]
    );

    useEffect(() => {
        setMaxRowDepth(contextData.depth);
        upperRowContext?.eventEmitter.emit("lowerRowRegistered");
    }, []);
    useEffect(() => {
        eventEmitter.on("lowerRowRegistered", () => {
            setMaxRowDepth((maxRowDepth) => maxRowDepth + 1);
            upperRowContext?.eventEmitter.emit("lowerRowRegistered");
        });
    }, [eventEmitter, upperRowContext?.eventEmitter]);

    useEffect(() => {
        setRow(tableRow);
    }, [tableRow]);

    useEffect(() => {
        setState(onAddClicked ? "adding" : "viewing");
    }, [onAddClicked]);

    useEffect(() => {
        eventEmitter.emit("stateChanged", state);
    }, [state, eventEmitter]);

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
        content = (
            <ContentComponent inputs={inputs} row={row} editable={editable} />
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
        eventEmitter.emit("save", "lower");
        console.log("yes ok");
    }, [eventEmitter]);

    const handleActionCancelClicked = useCallback(() => {
        setRow(tableRow);
        setState("viewing");
        eventEmitter.emit("cancel", "lower");
    }, [eventEmitter, tableRow]);

    const handleActionAddClicked = useCallback(() => {
        eventEmitter.emit("add", "lower");
    }, [eventEmitter]);

    const handleActionDeleteClicked = useCallback(() => {
        eventEmitter.emit("delete", "lower");
    }, [eventEmitter]);

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

    useEffect(() => {
        // console.log("update");
        const connectAction = (
            action: "add" | "cancel" | "save" | "delete",
            callback?: (row: TRow) => void
        ) => {
            return upperRowContext?.eventEmitter.on(action, (dir) => {
                if (dir === "lower") {
                    console.log(">>>", action, dir);
                    if (contextData.depth === maxRowDepth) {
                        callback?.(row);
                        // setRow((row) => {
                        //     callback?.(row);
                        //     return row;
                        // });
                        eventEmitter.emit(action, "higher");
                    } else {
                        eventEmitter.emit(action, "lower");
                    }
                } else if (dir === "higher") {
                    callback?.(row);
                    // setRow((row) => {
                    //     callback?.(row);
                    //     return row;
                    // });
                    upperRowContext.eventEmitter.emit(action, "higher");
                }
            });
        };
        const offs = [
            upperRowContext?.eventEmitter.on("stateChanged", setState),
            connectAction("add", onAddClicked),
            connectAction("save", onSaveClicked),
            connectAction("delete", onDeleteClicked),
            connectAction("cancel", onCancelClicked),
        ];
        return () => {
            offs.forEach((off) => off?.());
        };
    }, [
        upperRowContext?.eventEmitter,
        eventEmitter,
        onAddClicked,
        onCancelClicked,
        onDeleteClicked,
        onSaveClicked,
        row,
        contextData.depth,
        maxRowDepth,
    ]);

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
                        {upperRowContext && (
                            <td>
                                <Stack>
                                    {state !== "adding" && actionDeleteButton}
                                    {state === "adding" && actionAddButton}
                                </Stack>
                            </td>
                        )}
                        {!upperRowContext && (
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
