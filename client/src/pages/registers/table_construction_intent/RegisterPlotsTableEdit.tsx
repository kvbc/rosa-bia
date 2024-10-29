import { DB } from "../../../../../server/src/db/types";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../../components/DBTableEdit";
import React, { useContext, useMemo } from "react";
import { TableEditRowContentComponentProps } from "../../../components/TableEditRowContentComponent";
import { PageRegistersContext } from "../../../contexts/PageRegistersContext";
import { TableEditRowInputsProps } from "../../../components/TableEditRow";

export default function RegisterPlotsDataTableEdit({
    row,
    plotType,
}: TableEditRowContentComponentProps<DB.Rows.Register> & {
    plotType: DB.Rows.RegisterPlotType;
}) {
    const pageContext = useContext(PageRegistersContext);
    if (!pageContext) {
        throw "Error";
    }

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
            dbTable={pageContext.registerPlotsDBTable}
            rows={pageContext.registerPlotsDBTable.rows.filter(
                (fRow) => fRow.register_id === row.id && fRow.type === plotType
            )}
            defaultRow={defaultRow}
            headers={[plotTypeHeaders[plotType]]}
            rowInputsProps={rowInputsProps}
        />
    );
}
