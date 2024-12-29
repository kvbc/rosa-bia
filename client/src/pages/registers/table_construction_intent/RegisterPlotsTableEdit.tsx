import * as DB from "@shared/db";
import { DBTableEdit, DBTableEditDefaultRow } from "@/components/DBTableEdit";
import { useMemo } from "react";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import { ClientRegister } from "../PageRegisters";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { MyTableHeader } from "@/components/my_table/MyTableHeader";
import { FaMap } from "react-icons/fa6";
import { HStack } from "@chakra-ui/react";
import useDBTable from "@/hooks/useDBTable";
import { RegisterPlotsMentionButton } from "./RegisterPlotsMentionButton";

export default function RegisterPlotsDataTableEdit({
    row,
    plotType,
    editable,
}: TableEditRowContentComponentProps<ClientRegister> & {
    plotType: DB.Rows.RegisterPlotType;
}) {
    // const pageContext = useContext(PageRegistersContext)!;
    const registerPlotsDBTable = useDBTable<DB.Rows.RegisterPlot>("registers_plots"); // prettier-ignore

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

    const plotTypeHeaders: Record<DB.Rows.RegisterPlotType, string> = useMemo(
        () => ({
            app: "Działki objęte wnioskiem",
            invest: "Działki objęte inwestycją",
            road: "Działki w pasie drogi",
            limited: "Działki z ograniczonym korzystaniem",
        }),
        []
    );

    const headers = useMemo<TableEditHeader[]>(
        () => [
            <MyTableHeader key="1">
                <HStack gap="1">
                    <FaMap />
                    {plotTypeHeaders[plotType]}
                    <RegisterPlotsMentionButton
                        subtitle={plotTypeHeaders[plotType]}
                        plotType={plotType}
                        registerRowID={row.id}
                    />
                </HStack>
            </MyTableHeader>,
        ],
        [row.id, plotType, plotTypeHeaders]
    );

    return (
        <DBTableEdit
            hidePagination
            dbTable={registerPlotsDBTable}
            rows={registerPlotsDBTable.rows.filter(
                (fRow) => fRow.register_id === row.id && fRow.type === plotType
            )}
            editable={editable}
            defaultRow={defaultRow}
            showEmptyState={false}
            headers={headers}
            rowInputsProps={rowInputsProps}
            isCollapsible
        />
    );
}
