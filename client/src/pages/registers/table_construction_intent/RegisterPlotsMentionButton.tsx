import { TableEditMentionButton } from "@/components/table_edit/TableEditMentionButton";
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "@/components/ui/accordion";
import useDBTable from "@/hooks/useDBTable";
import * as DB from "@shared/db";
import { useMemo } from "react";
import { ClientRegister } from "../PageRegisters";
import RegisterTableEdit from "../RegisterTableEdit";

export const RegisterPlotsMentionButton: React.FC<{
    registerRowID: ClientRegister["id"];
    subtitle: string;
    plotType: DB.Rows.RegisterPlotType;
}> = ({ subtitle, plotType, registerRowID }) => {
    const registerPlotsDBTable = useDBTable<DB.Rows.RegisterPlot>("registers_plots"); // prettier-ignore

    const plots = useMemo(
        () =>
            registerPlotsDBTable.rows.filter(
                (plot) =>
                    plot.type === plotType && plot.register_id === registerRowID
            ),
        [plotType, registerRowID, registerPlotsDBTable.rows]
    );

    return (
        plots.length > 0 && (
            <TableEditMentionButton color="orange.600" subtitle={subtitle}>
                <AccordionRoot
                    lazyMount
                    collapsible
                    variant="enclosed"
                    colorPalette="gray"
                >
                    {plots.map((plot) => (
                        <AccordionItem key={plot.id} value={String(plot.id)}>
                            <AccordionItemTrigger>
                                {plot.plot}
                            </AccordionItemTrigger>
                            <AccordionItemContent>
                                <RegisterTableEdit
                                    editable={false}
                                    initialRegistersFilters={[]}
                                />
                                {/* TODO SHOW THE THINGS (PLOTS) filter by other plots in registers (big task) */}
                            </AccordionItemContent>
                        </AccordionItem>
                    ))}
                </AccordionRoot>
            </TableEditMentionButton>
        )
    );
};
