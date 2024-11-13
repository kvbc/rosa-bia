import * as DB from "@shared/db";
import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import React, { useContext, useMemo } from "react";
import { PageRegistersContext } from "@/contexts/pages/PageRegistersContext";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { ClientRegister } from "../PageRegisters";

export default function RegisterPlotsDataTableEdit({
    row,
    plotType,
}: TableEditRowContentComponentProps<ClientRegister> & {
    plotType: DB.Rows.RegisterPlotType;
}) {
    const pageContext = useContext(PageRegistersContext)!;

    const defaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.RegisterPlot>>(
        () => ({
            register_id: row.id,
            plot: "",
            type: plotType,
        }),
        [row.id, plotType]
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.RegisterPlot>
    >(
        () => [
            {
                type: "text",
                rowKey: "plot",
                placeholder: "Działka",
            },
        ],
        []
    );

    const plotTypeHeaders: Record<DB.Rows.RegisterPlotType, string> = {
        app: "Działki objęte wnioskiem",
        invest: "Działki objęte inwestycją",
        road: "Działki w pasie drogi",
        limited: "Działki z ograniczonym korzystaniem",
    };

    return (
        <DBTableEdit
            hidePagination
            dbTable={pageContext.registerPlotsDBTable}
            rows={pageContext.registerPlotsDBTable.rows.filter(
                (fRow) => fRow.register_id === row.id && fRow.type === plotType
            )}
            defaultRow={defaultRow}
            headers={[plotTypeHeaders[plotType]]}
            rowInputsProps={rowInputsProps}
            isCollapsible
        />
    );
}
