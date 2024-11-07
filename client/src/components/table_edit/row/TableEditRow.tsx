//
// TableEditRow.tsx
// Row component for the TableEdit component
//

import React, {
    ContextType,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TableEditRowType } from "../TableEdit";
import {
    TableEditRowInput,
    TableEditRowInputProps,
} from "./input/TableEditRowInput";
import {
    TableEditRowContentComponent,
    TableEditRowContentComponentProps,
} from "./TableEditRowContentComponent";
import { Center, Group, IconButton, Stack } from "@chakra-ui/react";
import { LuPencil, LuPlus, LuSave, LuTrash, LuX } from "react-icons/lu";
import { TableEditRowContext } from "../../../contexts/components/TableEditRowContext";
import { MyTableCell } from "../../my_table/MyTableCell";
import { MyTableRow } from "../../my_table/MyTableRow";

export type TableEditRowState = "viewing" | "editing" | "adding";

export type TableEditRowInputsProps<TRow extends TableEditRowType> = Omit<
    TableEditRowInputProps<TRow>,
    "row" | "setRow" | "onFocusOut" | "disabled"
>[];

export function TableEditRow<TRow extends TableEditRowType>({
    row: rowProp,
    onDeleteClicked,
    onAddClicked,
    stateProp,
    onSaveClicked,
    editable,
    actionButtonOrientation = "horizontal",
    showSaveAction,
    inputsProps,
    ContentComponent,
    saveOnInputFocusOut,
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
    saveOnInputFocusOut: boolean;
}) {
    const [row, setRow] = useState<TRow>({ ...rowProp });
    const [state, setState] = useState<TableEditRowState>(stateProp);
    const [eventTarget] = useState(new EventTarget());
    const upperRowContext = useContext(TableEditRowContext);
    const context = useMemo<ContextType<typeof TableEditRowContext>>(
        () => ({
            state,
            eventTarget,
        }),
        [state, eventTarget]
    );

    const isContentEditable = state === "editing" || state === "adding";

    useEffect(() => {
        setRow({ ...rowProp });
    }, [rowProp]);

    useEffect(() => {
        setState(stateProp);
    }, [stateProp]);

    const handleInputFocusOut = useCallback(() => {
        if (saveOnInputFocusOut) {
            onSaveClicked?.(row);
            eventTarget.dispatchEvent(new CustomEvent("saved"));
        }
    }, [onSaveClicked, row, eventTarget, saveOnInputFocusOut]);

    /*
     *
     * Content
     *
     */

    const renderInput = useCallback(
        (rowKey: keyof TRow) => {
            const inputProps = inputsProps.find(
                (inputProps) => inputProps.rowKey === rowKey
            );
            if (!inputProps) {
                return null;
            }
            return (
                <TableEditRowInput
                    row={row}
                    setRow={setRow}
                    disabled={!isContentEditable}
                    onFocusOut={handleInputFocusOut}
                    {...inputProps}
                />
            );
        },
        [handleInputFocusOut, inputsProps, isContentEditable, row]
    );

    let content: ReactNode = "";
    if (ContentComponent) {
        const inputs: TableEditRowContentComponentProps<TRow>["inputs"] = {};
        inputsProps.forEach((inputProps) => {
            inputs[inputProps.rowKey] = renderInput(inputProps.rowKey);
        });
        content = (
            <MyTableCell>
                <ContentComponent
                    key="1"
                    inputs={inputs}
                    row={row}
                    setRow={setRow}
                    editable={isContentEditable}
                    onInputFocusOut={handleInputFocusOut}
                    eventTarget={eventTarget}
                />
            </MyTableCell>
        );
    } else {
        content = inputsProps.map((inputProps) => (
            <MyTableCell key={inputProps.rowKey}>
                {renderInput(inputProps.rowKey)}
            </MyTableCell>
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
        setRow(rowProp);
        setState("viewing");
    }, [rowProp]);

    const handleActionAddClicked = useCallback(() => {
        eventTarget.dispatchEvent(new CustomEvent("added"));
        onAddClicked?.(row);
    }, [row, onAddClicked, eventTarget]);

    const handleActionDeleteClicked = useCallback(() => {
        onDeleteClicked?.(row);
    }, [row, onDeleteClicked]);

    /*
     *
     *
     *
     */

    useEffect(() => {
        if (upperRowContext) {
            const callback = () => {
                handleActionAddClicked();
            };
            upperRowContext.eventTarget.addEventListener("added", callback);
            return () => {
                upperRowContext.eventTarget.removeEventListener(
                    "added",
                    callback
                );
            };
        }
    }, [handleActionAddClicked, upperRowContext]);

    /*
     *
     * Action buttons
     *
     */

    const actionAddButton = (
        <IconButton
            onClick={handleActionAddClicked}
            size="2xs"
            variant="plain"
            color="fg.success"
        >
            <LuPlus />
        </IconButton>
    );

    const actionDeleteButton = (
        <IconButton
            onClick={handleActionDeleteClicked}
            size="2xs"
            variant="plain"
            color="fg.error"
        >
            <LuTrash />
        </IconButton>
    );

    const actionEditButton = (
        <IconButton
            onClick={handleActionEditClicked}
            size="2xs"
            variant="plain"
            color="fg.info"
        >
            <LuPencil />
        </IconButton>
    );

    const actionSaveButton = (
        <IconButton
            onClick={handleActionSaveClicked}
            size="2xs"
            variant="plain"
            color="fg.success"
        >
            <LuSave />
        </IconButton>
    );

    const actionCancelButton = (
        <IconButton
            onClick={handleActionCancelClicked}
            size="2xs"
            variant="plain"
            color="fg.error"
        >
            <LuX />
        </IconButton>
    );

    /*
     *
     * TableEditRow
     *
     */

    return (
        <MyTableRow>
            <TableEditRowContext.Provider value={context}>
                {content}
            </TableEditRowContext.Provider>
            {editable && (
                <>
                    {!showSaveAction && (
                        <MyTableCell>
                            <Stack>
                                {state !== "adding" && actionDeleteButton}
                                {state === "adding" && actionAddButton}
                            </Stack>
                        </MyTableCell>
                    )}
                    {showSaveAction && (
                        <MyTableCell>
                            {state == "viewing" && (
                                <Group
                                    // attached
                                    orientation={actionButtonOrientation}
                                    grow
                                >
                                    {actionEditButton}
                                    {actionDeleteButton}
                                </Group>
                            )}
                            {state == "editing" && (
                                <Group
                                    // attached
                                    orientation={actionButtonOrientation}
                                    grow
                                >
                                    {actionSaveButton}
                                    {actionCancelButton}
                                </Group>
                            )}
                            {state == "adding" && (
                                <Center>{actionAddButton}</Center>
                            )}
                        </MyTableCell>
                    )}
                </>
            )}
        </MyTableRow>
    );
}