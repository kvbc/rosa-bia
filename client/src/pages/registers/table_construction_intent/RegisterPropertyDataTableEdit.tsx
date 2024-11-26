import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import { ClientRegister } from "../PageRegisters";
import { PageRegistersContext } from "@/contexts/pages/PageRegistersContext";
import {
    MyInputSelect,
    MySelectOption,
} from "@/components/my_input/MyInputSelect";

export default function RegisterPropertyDataTableEdit({
    row,
    setRow,
    editable,
    onInputFocusOut,
    inputs,
}: TableEditRowContentComponentProps<ClientRegister>) {
    const pageContext = useContext(PageRegistersContext)!;

    const [communeID, setCommuneID] = useState<number>(0);
    const [placeID, setPlaceID] = useState<number>(0);

    //
    //
    //

    const street = useMemo(
        () =>
            pageContext.streetsDBTable.rows.find(
                (fEntry) => fEntry.id === row.object_street_id
            ),
        [row.object_street_id, pageContext.streetsDBTable.rows]
    );
    const place = useMemo(
        () =>
            pageContext.placesDBTable.rows.find(
                (fEntry) => fEntry.id === placeID
            ),
        [pageContext.placesDBTable.rows, placeID]
    );
    // const commune = useMemo(
    //     () =>
    //         pageContext.communesDBTable.rows.find(
    //             (fEntry) => fEntry.id === communeID
    //         ),
    //     [pageContext.communesDBTable.rows, communeID]
    // );
    const area = useMemo(
        () =>
            pageContext.placesDBTable.rows.find(
                (fEntry) => fEntry.id === place?.area_place_id
            ),
        [place, pageContext.placesDBTable.rows]
    );

    //
    //
    //

    useEffect(() => {
        if (street?.place_id) {
            setPlaceID(street.place_id);
        }
    }, [street?.place_id]);
    useEffect(() => {
        if (place?.commune_id) {
            setCommuneID(place.commune_id);
        }
    }, [place?.commune_id]);

    //
    //
    //

    const usersetFrom = useCallback(
        (from: "commune" | "place", id: number) => {
            /* eslint-disable no-fallthrough */
            switch (from) {
                case "commune": {
                    setCommuneID(id);
                    id =
                        pageContext.placesDBTable.rows.find(
                            (row) => row.commune_id === id
                        )?.id ?? 0;
                }
                case "place": {
                    setPlaceID(id);
                    setRow((row) => ({
                        ...row,
                        object_street_id:
                            pageContext.streetsDBTable.rows.find(
                                (fRow) => fRow.place_id === id
                            )?.id ?? 0,
                    }));
                }
            }
            /* eslint-enable no-fallthrough */
        },
        [
            setRow,
            pageContext.placesDBTable.rows,
            pageContext.streetsDBTable.rows,
        ]
    );

    //
    //
    //

    const handleCommuneIDChanged = useCallback(
        (communeID: number) => {
            usersetFrom("commune", communeID);
        },
        [usersetFrom]
    );

    const handlePlaceIDChanged = useCallback(
        (placeID: number) => {
            usersetFrom("place", placeID);
        },
        [usersetFrom]
    );

    const handleStreetIDChanged = useCallback(
        (streetID: number) => {
            setRow((row) => ({
                ...row,
                object_street_id: streetID,
            }));
        },
        [setRow]
    );

    //
    //
    //

    const communesSelectOptions = useMemo(
        () =>
            pageContext.communesDBTable.rows.map<MySelectOption>((row) => ({
                label: row.name,
                value: row.id,
            })),
        [pageContext.communesDBTable.rows]
    );
    const placesSelectOptions = useMemo(
        () =>
            pageContext.placesDBTable.rows
                .filter((row) => row.commune_id === communeID)
                .map<MySelectOption>((row) => ({
                    label: row.name,
                    value: row.id,
                })),
        [pageContext.placesDBTable.rows, communeID]
    );
    const streetsSelectOptions = useMemo(
        () =>
            pageContext.streetsDBTable.rows
                .filter((row) => row.place_id === placeID)
                .map<MySelectOption>((row) => ({
                    label: row.name,
                    value: row.id,
                })),
        [pageContext.streetsDBTable.rows, placeID]
    );

    //
    //
    //

    return (
        <Tb
            isCollapsible
            myHeaders={
                <>
                    <Th colSpan={4}>Dane nieruchomości</Th>
                </>
            }
        >
            <Tr>
                <Tc>Gmina</Tc>
                <Tc>
                    <MyInputSelect
                        options={communesSelectOptions}
                        value={String(communeID)}
                        onValueChanged={(value) =>
                            handleCommuneIDChanged(Number(value))
                        }
                        isDisabled={!editable}
                        onBlur={onInputFocusOut}
                    />
                </Tc>
                <Tc>Jedn. ewid.</Tc>
                <Tc>{place?.cad_unit ?? "-"}</Tc>
            </Tr>
            <Tr>
                <Tc>Miejscowość</Tc>
                <Tc>
                    <MyInputSelect
                        options={placesSelectOptions}
                        value={String(placeID)}
                        onValueChanged={(value) =>
                            handlePlaceIDChanged(Number(value))
                        }
                        isDisabled={!editable}
                        onBlur={onInputFocusOut}
                    />
                </Tc>
                <Tc>Obręb</Tc>
                <Tc>{area?.name ?? "-"}</Tc>
            </Tr>
            <Tr>
                <Tc>Ulica</Tc>
                <Tc>
                    <MyInputSelect
                        options={streetsSelectOptions}
                        value={String(row.object_street_id)}
                        onValueChanged={(value) =>
                            handleStreetIDChanged(Number(value))
                        }
                        isDisabled={!editable}
                        onBlur={onInputFocusOut}
                    />
                </Tc>
                <Tc>Nr</Tc>
                <Tc>{inputs.object_number}</Tc>
            </Tr>
        </Tb>
    );
}
