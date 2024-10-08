import { Textarea } from "@mui/joy";
import InfoBoard from "./InfoBoard";

export default function GlownaStrona() {
    return (
        <div className="flex flex-row w-full h-full items-stretch justify-stretch text-center">
            <div className="flex-1">Strona Główna</div>
            <InfoBoard />
        </div>
    );
}
