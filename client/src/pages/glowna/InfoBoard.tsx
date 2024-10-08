import { ButtonGroup, IconButton, Textarea } from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";
import useDBEntriesStore from "../../hooks/useDBEntriesStore";
import { DBInfoBoard } from "../../../../server/src/types";

export enum InfoBoardState {
    Editing,
    Viewing,
}

export default function InfoBoard() {
    const [state, setState] = useState<InfoBoardState>(InfoBoardState.Viewing);
    const infoBoardDBEntries = useDBEntriesStore<DBInfoBoard>('tablice_informacyjne')(); // prettier-ignore
    const infoBoard = useMemo<DBInfoBoard | undefined>(
        () => infoBoardDBEntries.entries[0],
        [infoBoardDBEntries.entries]
    );
    const [contents, setContents] = useState<string>("");

    useEffect(() => {
        if (infoBoard) setContents(infoBoard.zawartosc);
    }, [infoBoard?.zawartosc]);

    const handleEditClicked = () => {
        setState(InfoBoardState.Editing);
    };

    const handleSaveClicked = () => {
        setState(InfoBoardState.Viewing);
        if (infoBoard) {
            infoBoardDBEntries.saveEntry({
                ...infoBoard,
                zawartosc: contents,
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