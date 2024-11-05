//
// TableEditRow.tsx
// Row component for the TableEdit component
//

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { TableEditColorValue, TableEditRowType } from "./TableEdit";
import { TableEditRowInput, TableEditRowInputProps } from "./TableEditRowInput";
import {
    TableEditRowContentComponent,
    TableEditRowContentComponentProps,
} from "./TableEditRowContentComponent";
import { Center, Group, IconButton, Stack, Table } from "@chakra-ui/react";
import { LuPencil, LuPlus, LuSave, LuTrash, LuX } from "react-icons/lu";
import { TableEditRowContext } from "../../contexts/components/TableEditRowContext";

export type TableEditRowState = "viewing" | "editing" | "adding";

export type TableEditRowInputsProps<TRow extends TableEditRowType> = Omit<
    TableEditRowInputProps<TRow>,
    "row" | "setRow" | "onBlur" | "primaryBgColorValue"
>[];

export function TableEditRow<TRow extends TableEditRowType>({
    row: tableRow,
    onDeleteClicked,
    onAddClicked,
    stateProp,
    onSaveClicked,
    editable,
    actionButtonDirection = "horizontal",
    showSaveAction,
    inputsProps,
    primaryBgColorValue,
    ContentComponent,
    saveOnInputBlur,
}: {
    row: TRow;
    onDeleteClicked?: (row: TRow) => void;
    onAddClicked?: (row: TRow) => void;
    onSaveClicked?: (row: TRow) => void;
    showSaveAction: boolean;
    editable: boolean;
    stateProp: TableEditRowState;
    primaryBgColorValue: TableEditColorValue;
    actionButtonDirection?: "horizontal" | "vertical";
    inputsProps: TableEditRowInputsProps<TRow>;
    ContentComponent?: TableEditRowContentComponent<TRow>;
    saveOnInputBlur: boolean;
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
        if (saveOnInputBlur) {
            eventTarget.dispatchEvent(new CustomEvent("saved"));
            onSaveClicked?.(row);
        }
    }, [onSaveClicked, row, eventTarget, saveOnInputBlur]);

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
            primaryBgColorValue={primaryBgColorValue}
        />
    );

    if (ContentComponent) {
        const inputs: TableEditRowContentComponentProps<TRow>["inputs"] = {};
        inputsProps.forEach((inputProps) => {
            inputs[inputProps.rowKey] = getInputNode(inputProps);
        });
        content = (
            <ContentComponent
                primaryBgcolorValue={primaryBgColorValue}
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
            <Table.Cell key={inputProps.rowKey}>
                {getInputNode(inputProps)}
            </Table.Cell>
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
        <>
            <TableEditRowContext.Provider value={state}>
                {content}
            </TableEditRowContext.Provider>
            {editable && (
                <>
                    {!showSaveAction && (
                        <Table.Cell>
                            <Stack>
                                {state !== "adding" && actionDeleteButton}
                                {state === "adding" && actionAddButton}
                            </Stack>
                        </Table.Cell>
                    )}
                    {showSaveAction && (
                        <Table.Cell>
                            {state == "viewing" && (
                                <Group
                                    attached
                                    direction={actionButtonDirection}
                                    grow
                                >
                                    {actionEditButton}
                                    {actionDeleteButton}
                                </Group>
                            )}
                            {state == "editing" && (
                                <Group
                                    attached
                                    direction={actionButtonDirection}
                                    grow
                                >
                                    {actionSaveButton}
                                    {actionCancelButton}
                                </Group>
                            )}
                            {state == "adding" && (
                                <Center>{actionAddButton}</Center>
                            )}
                        </Table.Cell>
                    )}
                </>
            )}
        </>
    );
}
