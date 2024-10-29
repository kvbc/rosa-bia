import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Stack } from "@mui/joy";
import { FaCity } from "react-icons/fa6";
import DBTableEdit, {
    DBTableEditDefaultRow,
} from "../../components/DBTableEdit";
import { TableEditRowInputSelectOption } from "../../components/TableEditRowInput";
import { TableEditRowContentComponentProps } from "../../components/TableEditRowContentComponent";
import { DB } from "../../../../server/src/db/types";
import React, { useContext, useMemo } from "react";
import PlacesTableEditRowContent from "./PlacesTableEditRowContent";
import { PageGeodesyContext } from "../../contexts/PageGeodesyContext";
import { TableEditRowInputsProps } from "../../components/TableEditRow";

export default function CommunesDBTableEditRowContent({
    inputs,
    row,
    editable,
}: TableEditRowContentComponentProps<DB.Rows.Commune>) {
    const pageGeodesyContext = useContext(PageGeodesyContext);
    if (!pageGeodesyContext) {
        throw "Error";
    }

    const placesDefaultRow = useMemo<DBTableEditDefaultRow<DB.Rows.Place>>(
        () => ({
            commune_id: row.id,
            cad_unit: "",
            name: "",
            area_place_id: 0,
        }),
        [row.id]
    );

    const placesRowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.Place>
    >(
        () => [
            {
                type: "text",
                rowKey: "name",
            },
            {
                type: "select",
                rowKey: "area_place_id",
                selectOptions:
                    pageGeodesyContext.placesDBTable.rows.map<TableEditRowInputSelectOption>(
                        (row) => ({
                            value: row.id,
                            name: row.name,
                        })
                    ),
            },
            {
                type: "text",
                rowKey: "cad_unit",
            },
        ],
        [pageGeodesyContext.placesDBTable.rows]
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
                            <FaCity />
                            {inputs.name}
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DBTableEdit
                            dbTable={pageGeodesyContext.placesDBTable}
                            rows={pageGeodesyContext.placesDBTable.rows.filter(
                                (fRow) => fRow.commune_id === row.id
                            )}
                            rowActionButtonOrientation="vertical"
                            editable={editable}
                            headers={["Miejscowości"]}
                            defaultRow={placesDefaultRow}
                            rowInputsProps={placesRowInputsProps}
                            RowContentComponent={PlacesTableEditRowContent}
                        />
                    </AccordionDetails>
                </Accordion>
            </td>
        </>
    );
}
