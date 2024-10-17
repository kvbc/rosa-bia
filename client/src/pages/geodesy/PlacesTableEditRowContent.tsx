import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Stack } from "@mui/joy";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { GiVillage } from "react-icons/gi";
import Table from "@mui/joy/Table";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { DBRows } from "../../../../server/src/dbTypes";
import React, { useContext, useMemo } from "react";
import { PageGeodesyContext } from "../../contexts/PageGeodesyContext";
import { TableEditRowInputsProps } from "../../components/TableEditRow";

export default function PlacesTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DBRows.Place>) {
    const pageGeodesyContext = useContext(PageGeodesyContext);
    if (!pageGeodesyContext) {
        throw "Error";
    }

    const streetsDefaultRow = useMemo<DBTableEditDefaultRow<DBRows.Street>>(
        () => ({
            place_id: row.id,
            name: "",
        }),
        [row.id]
    );

    const streetsRowInputsProps = useMemo<
        TableEditRowInputsProps<DBRows.Street>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
        ],
        []
    );

    return (
        <>
            <td>
                <Accordion className="shadow-none">
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <GiVillage />
                            {inputs.name}
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th>Jedn. ewid.</th>
                                    <th>Obręb</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{inputs.cad_unit}</td>
                                    <td>{inputs.area_place_id}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br />
                        <DBTableEdit
                            dbTable={pageGeodesyContext.streetsDBTable}
                            rows={pageGeodesyContext.streetsDBTable.rows.filter(
                                (fRow) => fRow.place_id === row.id
                            )}
                            editable={editable}
                            headers={["Ulice"]}
                            rowActionButtonOrientation="vertical"
                            defaultRow={streetsDefaultRow}
                            rowInputsProps={streetsRowInputsProps}
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
