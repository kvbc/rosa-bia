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
import { TableEditRowContext } from "@/contexts/components/TableEditRowContext";
import { MyTableCell } from "@/components/my_table/MyTableCell";
import { MyTableRow } from "@/components/my_table/MyTableRow";
import { Tooltip } from "@/components/ui/tooltip";
import { MyInputCheckbox } from "@/components/my_input/MyInputCheckbox";

export type TableEditRowState = "viewing" | "editing" | "adding";

export type TableEditRowInputsProps<TRow extends TableEditRowType> = Omit<
    TableEditRowInputProps<TRow>,
    "row" | "setRow" | "onFocusOut" | "disabled" | "isLocked" | "onLockClicked"
>[];

export function TableEditRow<TRow extends TableEditRowType>({
    row: rowProp,
    onDeleteClicked,
    onAddClicked,
    stateProp,
    onSaveClicked,
    isFilterRow: isFilterRowProp,
    editable,
    actionButtonOrientation = "horizontal",
    showSaveAction,
    inputsProps,
    disableActions,
    ContentComponent,
    saveOnInputFocusOut,
}: {
    row: TRow;
    onDeleteClicked?: (row: TRow) => void;
    onAddClicked?: (row: TRow) => void;
    onSaveClicked?: (row: TRow) => void;
    showSaveAction: boolean;
    editable: boolean;
    isFilterRow?: boolean;
    stateProp: TableEditRowState;
    disableActions: boolean;
    actionButtonOrientation?: "horizontal" | "vertical";
    inputsProps: TableEditRowInputsProps<TRow>;
    ContentComponent?: TableEditRowContentComponent<TRow>;
    saveOnInputFocusOut: boolean;
}) {
    const [row, setRow] = useState<TRow>({ ...rowProp });
    const [state, setState] = useState<TableEditRowState>(stateProp);
    const [eventTarget] = useState(new EventTarget());
    const upperRowContext = useContext(TableEditRowContext);
    const isFilterRow =
        isFilterRowProp ?? upperRowContext?.isFilterRow ?? false;
    const context = useMemo<ContextType<typeof TableEditRowContext>>(
        () => ({
            state,
            isFilterRow,
        }),
        [state, isFilterRow]
    );

    const isContentEditable = state === "editing" || state === "adding";
    const isActionAddButtonDisabled = upperRowContext?.state === "adding";

    useEffect(() => {
        setRow((row) => ({ ...row, ...rowProp }));
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

    const isKeyFiltered = useCallback(
        (rowKey: keyof TRow & string): boolean =>
            row["FILTER_" + rowKey] as boolean,
        [row]
    );

    const setIsKeyFiltered = useCallback(
        (rowKey: keyof TRow & string, isFiltered: boolean) => {
            setRow((row) => ({
                ...row,
                ["FILTER_" + rowKey]: isFiltered,
            }));
        },
        []
    );

    const renderInput = useCallback(
        (rowKey: keyof TRow & string) => {
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
                    isLocked={
                        isFilterRow &&
                        inputProps.isFilterable &&
                        !isKeyFiltered(rowKey)
                    }
                    onLockClicked={() => setIsKeyFiltered(rowKey, true)}
                    {...inputProps}
                />
            );
        },
        [
            handleInputFocusOut,
            inputsProps,
            isContentEditable,
            row,
            isKeyFiltered,
            isFilterRow,
            setIsKeyFiltered,
        ]
    );

    const renderFilterToggle = useCallback(
        (rowKey: keyof TRow & string) => {
            // TODO
            return (
                isFilterRow && (
                    // <Checkbox
                    //     size="xs"
                    //     checked={isKeyFiltered(rowKey)}
                    //     onCheckedChange={(e) =>
                    //         setIsKeyFiltered(rowKey, !!e.checked)
                    //     }
                    // />
                    <MyInputCheckbox
                        size="xs"
                        checked={isKeyFiltered(rowKey)}
                        onCheckedChange={(e) =>
                            setIsKeyFiltered(rowKey, !!e.checked)
                        }
                    />
                )
            );
        },
        [isFilterRow, setIsKeyFiltered, isKeyFiltered]
    );

    let content: ReactNode = "";
    if (ContentComponent) {
        const inputs: TableEditRowContentComponentProps<TRow>["inputs"] = {};
        const ftoggles: TableEditRowContentComponentProps<TRow>["ftoggles"] =
            {};
        inputsProps.forEach((inputProps) => {
            inputs[inputProps.rowKey] = renderInput(inputProps.rowKey);
            ftoggles[inputProps.rowKey] = renderFilterToggle(inputProps.rowKey);
        });
        content = (
            <ContentComponent
                inputs={inputs}
                ftoggles={ftoggles}
                row={row}
                setRow={setRow}
                editable={isContentEditable}
                onInputFocusOut={handleInputFocusOut}
                eventTarget={eventTarget}
            />
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

    const actionAddButton = (() => {
        const button = (
            <IconButton
                onClick={handleActionAddClicked}
                size="2xs"
                variant="plain"
                color="fg.success"
                disabled={isActionAddButtonDisabled}
            >
                <LuPlus />
            </IconButton>
        );
        if (isActionAddButtonDisabled) {
            return (
                <Tooltip content="Aby dodać ten wpis, dodaj pierw wpis powyżej">
                    {button}
                </Tooltip>
            );
        }
        return button;
    })();

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
            {editable && !disableActions && (
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
