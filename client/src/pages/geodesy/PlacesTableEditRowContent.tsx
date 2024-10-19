import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Stack } from "@mui/joy";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { GiVillage } from "react-icons/gi";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { DBRows } from "../../../../server/src/dbTypes";
import React, { useContext, useMemo } from "react";
import { PageGeodesyContext } from "../../contexts/PageGeodesyContext";
import { TableEditRowInputsProps } from "../../components/TableEditRow";
import MyTableTR from "../../components/MyTableTR";
import MyTableTH from "../../components/MyTableth";
import MyTableTD from "../../components/MyTableTD";
import MyTable from "../../components/MyTable";

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
            <MyTableTD>
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
                        <MyTable size="sm">
                            <thead>
                                <MyTableTR>
                                    <MyTableTH>Jedn. ewid.</MyTableTH>
                                    <MyTableTH>Obręb</MyTableTH>
                                </MyTableTR>
                            </thead>
                            <tbody>
                                <MyTableTR>
                                    <MyTableTD>{inputs.cad_unit}</MyTableTD>
                                    <MyTableTD>
                                        {inputs.area_place_id}
                                    </MyTableTD>
                                </MyTableTR>
                            </tbody>
                        </MyTable>
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
            </MyTableTD>
        </>
    );
}
