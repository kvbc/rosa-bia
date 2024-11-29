import useDBTable from "@/hooks/useDBTable";
import { ClientRegister } from "../pages/registers/PageRegisters";
import * as DB from "@shared/db";

export const useStats = () => {
    const communesDBTable = useDBTable<DB.Rows.Commune>("communes");
    const placesDBTable = useDBTable<DB.Rows.Place>("places");
    const constructionLawCategoriesDBTable = useDBTable<DB.Rows.ConstructionLawCategory>("construction_law_categories"); // prettier-ignore
    const constructionLawIntentsDBTable = useDBTable<DB.Rows.ConstructionLawIntent>("construction_law_intents"); // prettier-ignore
    const streetsDBTable = useDBTable<DB.Rows.Street>("streets");
    const constructionSpecsDBTable = useDBTable<DB.Rows.ConstructionSpec>("construction_specs"); // prettier-ignore
    const constructionClassesDBTable = useDBTable<DB.Rows.ConstructionClass>("construction_classes"); // prettier-ignore
    const registersDBTable = useDBTable<DB.Rows.Register>("registers");

    const isPKOBEqual = (pkob: number, pkobs: number | number[]): boolean => {
        const isEqual = (pkob1: number, pkob2: number): boolean => {
            return (
                String(pkob1).startsWith(String(pkob2)) ||
                String(pkob2).startsWith(String(pkob1))
            );
        };
        if (Array.isArray(pkobs)) {
            return pkobs.some((pkob2) => isEqual(pkob, pkob2));
        }
        return isEqual(pkob, pkobs);
    };

    const getRows = (
        pkobs: number | number[],
        year: number,
        fromMonthIndex: number,
        toMonthIndex: number,
        flipPKOBs: boolean = false,
        communeName: string | null = null,
        constructionCategoryName: string = "Budowa"
    ) => {
        return registersDBTable.rows.filter(
            (rRow) =>
                (rRow.type === "PnB (6740)" ||
                    (rRow.type === "Zg. Zwykłe (6743.2)" &&
                        constructionLawCategoriesDBTable.rows.find(
                            (clcRow) =>
                                clcRow.id ===
                                constructionLawIntentsDBTable.rows.find(
                                    (cliRow) =>
                                        cliRow.id ===
                                        rRow.object_construction_law_intent_id
                                )?.category_id
                        )?.name === constructionCategoryName)) &&
                (() => {
                    const date = new Date(rRow.app_submission_date);
                    return (
                        date.getFullYear() === year &&
                        date.getMonth() >= fromMonthIndex &&
                        date.getMonth() <= toMonthIndex
                        // date.getMonth() >= (quarter - 1) * 3 &&
                        // date.getMonth() < quarter * 3
                    );
                })() &&
                (communeName === null ||
                    communesDBTable.rows.find(
                        (cRow) =>
                            cRow.id ===
                            placesDBTable.rows.find(
                                (pRow) =>
                                    pRow.id ===
                                    streetsDBTable.rows.find(
                                        (sRow) =>
                                            sRow.id === rRow.object_street_id
                                    )?.place_id
                            )?.commune_id
                    )?.name === communeName) &&
                isPKOBEqual(
                    constructionClassesDBTable.rows.find(
                        (ccRow) =>
                            ccRow.id ===
                            constructionSpecsDBTable.rows.find(
                                (csRow) =>
                                    csRow.id ===
                                    rRow.object_construction_spec_id
                            )?.class_id
                    )?.pkob ?? 0,
                    pkobs
                ) !== flipPKOBs
        );
    };

    const filterIndividual = (arr: ClientRegister[]) =>
        arr.filter(
            (rRow) => rRow.object_construction_form_type === "Indywidualne"
        );

    const filterMPZP = (arr: ClientRegister[]) =>
        arr.filter((rRow) => rRow.object_spatial_plan_type === "MPZP");

    const reduceBuildingCount = (arr: ClientRegister[]) =>
        arr.reduce((total, rRow) => total + rRow.object_demo_building_count, 0);

    const reduceUsableArea = (arr: ClientRegister[], _pkob: number) =>
        arr.reduce((total, rRow) => {
            //
            // "W przypadku domków wypoczynkowych, domów letnich i rezydencji wiejskich, zaklasyfikowanych według PKOB jako budynki jednorodzinne, w których nie ma lokali (mieszkań) przeznaczonych na stały pobyt ludzi, należy
            // wykazać jedynie liczbę pozwoleń i zgłoszeń z projektem budowlanym oraz liczbę budynków; nie należy wykazywać liczby i powierzchni użytkowej mieszkań."
            //
            // if (pkob === 1110) {
            //     const constructionSpec =
            //         constructionSpecsDBTable.rows.find(
            //             (csRow) =>
            //                 csRow.id ===
            //                 rRow.object_construction_spec_id
            //         );
            //     if (
            //         constructionSpec?.name &&
            //         [
            //             "domki wypoczynkowe",
            //             "domy letnie",
            //             "rezydencje wiejskie",
            //         ].includes(constructionSpec.name)
            //     ) {
            //         return total;
            //     }
            // }
            return total + rRow.object_demo_usable_area;
        }, 0);

    return {
        getRows,
        filterIndividual,
        filterMPZP,
        reduceBuildingCount,
        reduceUsableArea,
        isPKOBEqual,
    };
};
