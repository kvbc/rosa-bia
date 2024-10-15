import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Stack } from "@mui/joy";
import DBTableEdit from "../../components/DBTableEdit";
import { GiVillage } from "react-icons/gi";
import Table from "@mui/joy/Table";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { DBRows } from "../../../../server/src/dbTypes";
import React, { useContext, useMemo } from "react";
import { PageGeodesyContext } from "../../contexts/PageGeodesyContext";

export default function PlacesTableEditRowContent({
    inputs,
    row,
}: TableEditRowContentComponentProps<DBRows.Place>) {
    const pageGeodesyContext = useContext(PageGeodesyContext);
    if (!pageGeodesyContext) {
        throw "Error";
    }

    const streetsDefaultRow = useMemo<Omit<DBRows.Street, "id">>(
        () => ({
            place_id: row.id,
            name: "",
        }),
        [row.id]
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
                            headers={["Ulice"]}
                            defaultRow={streetsDefaultRow}
                            rowInputsProps={[
                                {
                                    type: "text",
                                    rowKey: "name",
                                },
                            ]}
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
