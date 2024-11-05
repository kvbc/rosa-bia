import { useCallback, useEffect, useMemo, useState } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import React from "react";
import { Group, Heading, IconButton, Stack, Textarea } from "@chakra-ui/react";
import { LuPencil, LuSave, LuX } from "react-icons/lu";

export type InfoBoardState = "editing" | "viewing";

export default function InfoBoard() {
    const [state, setState] = useState<InfoBoardState>("viewing");
    const infoBoardDBTable = useDBTable<DB.Rows.InfoBoard>("info_boards");
    const infoBoard = useMemo<DB.Rows.InfoBoard | undefined>(
        () => infoBoardDBTable.rows[0],
        [infoBoardDBTable.rows]
    );
    const [oldContents, setOldContents] = useState<string>("");
    const [contents, setContents] = useState<string>("");

    useEffect(() => {
        if (infoBoard) {
            setContents(infoBoard.contents);
        }
    }, [infoBoard, infoBoard?.contents]);

    const handleEditClicked = useCallback(() => {
        setState("editing");
        setOldContents(contents);
    }, [contents]);

    const handleSaveClicked = useCallback(() => {
        setState("viewing");
        if (infoBoard) {
            infoBoardDBTable.updateRowMutation.mutate({
                ...infoBoard,
                contents,
            });
        }
    }, [infoBoard, contents, infoBoardDBTable]);

    const handleCancelClicked = useCallback(() => {
        setState("viewing");
        setContents(oldContents);
    }, [oldContents]);

    const handleTextareaClicked = useCallback(() => {
        if (state === "viewing") {
            handleEditClicked();
        }
    }, [state, handleEditClicked]);

    return (
        <Stack width="3/12">
            <Heading>Tablica Informacyjna</Heading>
            {state === "viewing" && (
                <IconButton
                    onClick={handleEditClicked}
                    size="sm"
                    variant="outline"
                    color="fg.info"
                >
                    <LuPencil />
                </IconButton>
            )}
            {state === "editing" && (
                <Group attached grow>
                    <IconButton
                        onClick={handleSaveClicked}
                        size="sm"
                        variant="outline"
                        color="fg.success"
                    >
                        <LuSave />
                    </IconButton>
                    <IconButton
                        onClick={handleCancelClicked}
                        size="sm"
                        variant="outline"
                        color="fg.error"
                    >
                        <LuX />
                    </IconButton>
                </Group>
            )}
            <Textarea
                justifySelf="stretch"
                flexGrow="1"
                readOnly={state === "viewing"}
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                onClick={handleTextareaClicked}
            />
        </Stack>
    );
}
