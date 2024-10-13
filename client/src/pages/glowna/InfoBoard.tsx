import { ButtonGroup, IconButton, Textarea } from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";
import useDBEntriesStore from "../../hooks/useDBTableStore";
import { DB } from "../../../../server/src/dbTypes";

export enum InfoBoardState {
    Editing,
    Viewing,
}

export default function InfoBoard() {
    const [state, setState] = useState<InfoBoardState>(InfoBoardState.Viewing);
    const infoBoardDBEntries = useDBEntriesStore<DB.InfoBoard>('info_boards')(); // prettier-ignore
    const infoBoard = useMemo<DB.InfoBoard | undefined>(
        () => infoBoardDBEntries.rows[0],
        [infoBoardDBEntries.rows]
    );
    const [contents, setContents] = useState<string>("");

    useEffect(() => {
        if (infoBoard) setContents(infoBoard.contents);
    }, [infoBoard?.contents]);

    const handleEditClicked = () => {
        setState(InfoBoardState.Editing);
    };

    const handleSaveClicked = () => {
        setState(InfoBoardState.Viewing);
        if (infoBoard) {
            infoBoardDBEntries.saveRow({
                ...infoBoard,
                contents,
            });
        }
    };

    const handleCancelClicked = () => {
        setState(InfoBoardState.Viewing);
    };

    return (
        <div className="flex flex-col justify-stetch flex-1">
            <h1>Tablica Informacyjna</h1>
            <Textarea
                sx={{ flex: "1" }}
                readOnly={state === InfoBoardState.Viewing}
                value={contents}
                onChange={(e) => setContents(e.target.value)}
            />
            {state === InfoBoardState.Viewing && (
                <IconButton
                    onClick={handleEditClicked}
                    size="sm"
                    variant="plain"
                    color="primary"
                >
                    <MdEdit />
                </IconButton>
            )}
            {state === InfoBoardState.Editing && (
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
