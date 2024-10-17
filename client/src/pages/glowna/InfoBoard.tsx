import { ButtonGroup, IconButton, Textarea } from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";
import useDBTable from "../../hooks/useDBTable";
import { DBRows } from "../../../../server/src/dbTypes";
import React from "react";

export type InfoBoardState = "editing" | "viewing";

export default function InfoBoard() {
    const [state, setState] = useState<InfoBoardState>("viewing");
    const infoBoardDBTable = useDBTable<DBRows.InfoBoard>("info_boards");
    const infoBoard = useMemo<DBRows.InfoBoard | undefined>(
        () => infoBoardDBTable.rows[0],
        [infoBoardDBTable.rows]
    );
    const [contents, setContents] = useState<string>("");

    useEffect(() => {
        if (infoBoard) {
            setContents(infoBoard.contents);
        }
    }, [infoBoard, infoBoard?.contents]);

    const handleEditClicked = () => {
        setState("editing");
    };

    const handleSaveClicked = useCallback(() => {
        setState("viewing");
        if (infoBoard) {
            infoBoardDBTable.requestUpdateRow({ ...infoBoard, contents });
        }
    }, [infoBoard, contents, infoBoardDBTable]);

    const handleCancelClicked = () => {
        setState("viewing");
    };

    return (
        <div className="flex flex-col justify-stetch flex-1">
            <h1>Tablica Informacyjna</h1>
            <Textarea
                sx={{ flex: "1" }}
                readOnly={state === "viewing"}
                value={contents}
                onChange={(e) => setContents(e.target.value)}
            />
            {state === "viewing" && (
                <IconButton
                    onClick={handleEditClicked}
                    size="sm"
                    variant="plain"
                    color="primary"
                >
                    <MdEdit />
                </IconButton>
            )}
            {state === "editing" && (
                <ButtonGroup
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "stretch",
                    }}
                >
                    <IconButton
                        onClick={handleSaveClicked}
                        size="sm"
                        variant="plain"
                        color="success"
                        sx={{ flex: "1" }}
                    >
                        <MdSave />
                    </IconButton>
                    <IconButton
                        onClick={handleCancelClicked}
                        size="sm"
                        variant="plain"
                        color="danger"
                        sx={{ flex: "1" }}
                    >
                        <MdCancel />
                    </IconButton>
                </ButtonGroup>
            )}
        </div>
    );
}
