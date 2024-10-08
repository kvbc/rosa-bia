import { Textarea } from "@mui/joy";
import InfoBoard from "./InfoBoard";
import RejestryStrona from "../rejestry/RejestryStrona";

export default function GlownaStrona() {
    return (
        <div className="flex flex-row w-full h-full text-center gap-2">
            <div className="w-8/12">
                <RejestryStrona />
            </div>
            <InfoBoard />
        </div>
    );
}
