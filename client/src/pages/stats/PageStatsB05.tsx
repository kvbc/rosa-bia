import ErrorIcon from "@mui/icons-material/Error";
import React, { useCallback, useMemo, useState } from "react";
import useDBTable from "@/hooks/useDBTable";
import * as DB from "@shared/db";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
    Badge,
    Box,
    Button,
    HStack,
    StackSeparator,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import { MyTableHeaderRow as ThRow } from "@/components/my_table/MyTableHeaderRow";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import {
    MyInputSelect,
    MySelectOption,
} from "@/components/my_input/MyInputSelect";
import {
    ProgressCircleRing,
    ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientRegister } from "../registers/PageRegisters";

export default function PageStatsB05() {
    const communesDBTable = useDBTable<DB.Rows.Commune>("communes");
    const placesDBTable = useDBTable<DB.Rows.Place>("places");
    const constructionLawCategoriesDBTable = useDBTable<DB.Rows.ConstructionLawCategory>("construction_law_categories"); // prettier-ignore
    const constructionLawIntentsDBTable = useDBTable<DB.Rows.ConstructionLawIntent>("construction_law_intents"); // prettier-ignore
    const streetsDBTable = useDBTable<DB.Rows.Street>("streets");
    const constructionSpecsDBTable = useDBTable<DB.Rows.ConstructionSpec>("construction_specs"); // prettier-ignore
    const constructionClassesDBTable = useDBTable<DB.Rows.ConstructionClass>("construction_classes"); // prettier-ignore
    const registersDBTable = useDBTable<DB.Rows.Register>("registers");

    const minYear = 2019;
    const maxYear = new Date().getFullYear();
    const years: { year: number; works: boolean }[] = [];
    for (let year = minYear; year <= maxYear; year++) {
        const works = ![2020, 2021].includes(year);
        years.push({ year, works });
    }
    const quarters = [1, 2, 3, 4] as const;

    const [year, setYear] = useState<number>(maxYear);
    const [quarter, setQuarter] = useState<(typeof quarters)[number]>(1);
    const [communeID, setCommuneID] = useState<number>(1);
    const [pdfObjectURL, setPDFObjectURL] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const communeName = useMemo(
        () => communesDBTable.rows.find((row) => row.id === communeID)?.name,
        [communeID, communesDBTable.rows]
    );

    const handleGenerateClicked = useCallback(() => {
        // const pdfFetchUrl = `https://form.stat.gov.pl/formularze/${year}/passive/B-05.pdf`;
        // console.log(pdfFetchUrl);
        // fetch(pdfFetchUrl)
        //     .then((res) => {
        //         console.log(res);
        //         return res.arrayBuffer();
        //     })
        if (!communeName) {
            throw "Error";
        }
        setIsGenerating(true);
        setPDFObjectURL(null);
        fetch(`/forms/b05/${year}.pdf`)
            .then((res) => res.arrayBuffer())
            .then((loadedPDFBytes) => PDFDocument.load(loadedPDFBytes))
            .then(async (pdfDoc) => {
                pdfDoc.setTitle("Formularz B-05");
                pdfDoc.setAuthor("Starostwo Powiatowe Człuchów");
                pdfDoc.setSubject("Formularz B-05");
                pdfDoc.setKeywords(["formularz", "b-05"]);
                pdfDoc.setProducer("Strona");
                pdfDoc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)') // prettier-ignore
                pdfDoc.setCreationDate(new Date());
                pdfDoc.setModificationDate(new Date());

                pdfDoc.registerFontkit(fontkit);

                // only two first pages
                for (
                    let pageIndex = pdfDoc.getPageCount() - 1;
                    pageIndex >= 2;
                    pageIndex--
                ) {
                    pdfDoc.removePage(pageIndex);
                }

                const fontBytes = await fetch(
                    "/fonts/NotoSerif/NotoSerif-Regular.ttf"
                ).then((res) => res.arrayBuffer());
                const font = await pdfDoc.embedFont(fontBytes);
                const pages = pdfDoc.getPages();

                // Kwartał
                pages[0].drawText(quarter.toString(), {
                    x: 410,
                    y: 425,
                    size: 10,
                    font,
                });

                // Województwo
                pages[0].drawText("POMORSKIE", {
                    x: 115,
                    y: 335,
                    size: 10,
                    font,
                });
                // Powiat
                pages[0].drawText("CZŁUCHOWSKI", {
                    x: 340,
                    y: 335,
                    size: 10,
                    font,
                });
                // Gmina
                pages[0].drawText(communeName.toUpperCase(), {
                    x: 660,
                    y: 335,
                    size: 10,
                    font,
                });

                const getColumn1a = (pkob: number) => {
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
                                    )?.name === "Budowa")) &&
                            (() => {
                                const date = new Date(rRow.app_submission_date);
                                return (
                                    date.getFullYear() === year &&
                                    date.getMonth() >= (quarter - 1) * 3 &&
                                    date.getMonth() < quarter * 3
                                );
                            })() &&
                            communesDBTable.rows.find(
                                (cRow) =>
                                    cRow.id ===
                                    placesDBTable.rows.find(
                                        (pRow) =>
                                            pRow.id ===
                                            streetsDBTable.rows.find(
                                                (sRow) =>
                                                    sRow.id ===
                                                    rRow.object_street_id
                                            )?.place_id
                                    )?.commune_id
                            )?.name === communeName &&
                            constructionClassesDBTable.rows.find(
                                (ccRow) =>
                                    ccRow.id ===
                                    constructionSpecsDBTable.rows.find(
                                        (csRow) =>
                                            csRow.id ===
                                            rRow.object_construction_spec_id
                                    )?.class_id
                            )?.pkob === pkob
                    );
                };

                const getColumn1b = (pkob: number) => {
                    return getColumn1a(pkob).filter(
                        (rRow) =>
                            rRow.object_construction_form_type ===
                            "Indywidualne"
                    );
                };

                const filterMPZP = (arr: ClientRegister[]) =>
                    arr.filter(
                        (rRow) => rRow.object_spatial_plan_type === "MPZP"
                    );

                const reduceBuildingCount = (arr: ClientRegister[]) =>
                    arr.reduce(
                        (total, rRow) =>
                            total + rRow.object_demo_building_count,
                        0
                    );

                const reduceUsableArea = (
                    arr: ClientRegister[],
                    _pkob: number
                ) =>
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

                //
                // Dział 1: PnB i Zg. Zwykle (tylko "Budowa")
                //
                // prettier-ignore
                const tableSection1: (string | number)[] = [];
                [1110, 1121, 1122].forEach((pkob, index) => {
                    const apartmentCount = [1, 2, "-"][index];
                    tableSection1.push(
                        // row a
                        getColumn1a(pkob).length,
                        filterMPZP(getColumn1a(pkob)).length,
                        reduceBuildingCount(getColumn1a(pkob)),
                        reduceBuildingCount(filterMPZP(getColumn1a(pkob))),
                        apartmentCount,
                        pkob === 1122
                            ? "-"
                            : reduceUsableArea(getColumn1a(pkob), pkob),

                        // row b
                        getColumn1b(pkob).length,
                        filterMPZP(getColumn1b(pkob)).length,
                        reduceBuildingCount(getColumn1b(pkob)),
                        reduceBuildingCount(filterMPZP(getColumn1b(pkob))),
                        apartmentCount,
                        pkob === 1122
                            ? "-"
                            : reduceUsableArea(getColumn1b(pkob), pkob)
                    );
                });
                for (let ix = 0; ix < 6; ix++) {
                    for (let iy = 0; iy < 6; iy++) {
                        const index = iy * 6 + ix;
                        const value = tableSection1[index];
                        let x = 352 + ix * 71;
                        if (ix === 4) {
                            x = 650;
                        } else if (ix === 5) {
                            x = 755;
                        }
                        pages[0].drawText(String(value), {
                            x,
                            y: pages[0].getHeight() - (430 + iy * 17.5),
                            size: 10,
                            font,
                        });
                    }
                }

                return pdfDoc.save();
            })
            .then((savedPDFBytes) => {
                const blob = new Blob([savedPDFBytes], {
                    type: "application/pdf",
                });
                const objectURL = URL.createObjectURL(blob);
                setPDFObjectURL(objectURL);
                setIsGenerating(false);
            });
    }, [
        year,
        communeName,
        quarter,
        communesDBTable.rows,
        constructionClassesDBTable.rows,
        constructionLawCategoriesDBTable.rows,
        constructionLawIntentsDBTable.rows,
        constructionSpecsDBTable.rows,
        placesDBTable.rows,
        registersDBTable.rows,
        streetsDBTable.rows,
    ]);

    const submittionTableHeaderStyles: React.CSSProperties = {
        width: "30%",
    };

    return (
        <HStack
            height="full"
            gap="2"
            alignItems="stretch"
            separator={<StackSeparator />}
        >
            <VStack gap="2" alignItems="stretch" width="1/4">
                <Text fontSize="lg">Formularz B-05</Text>
                <Tb size="sm">
                    <Tr>
                        <ThRow style={submittionTableHeaderStyles}>Rok</ThRow>
                        <Tc>
                            <MyInputSelect
                                className="w-full"
                                placeholder="Rok"
                                value={year}
                                options={years.map<MySelectOption>((year) => ({
                                    label: String(year.year),
                                    value: year.year,
                                    postLabelNode: !year.works && (
                                        <ErrorIcon
                                            fontSize="small"
                                            color="error"
                                        />
                                    ),
                                }))}
                                onValueChanged={(value) =>
                                    setYear(Number(value))
                                }
                                required
                            />
                        </Tc>
                    </Tr>
                    <Tr>
                        <ThRow style={submittionTableHeaderStyles}>
                            Kwartał
                        </ThRow>
                        <Tc>
                            <MyInputSelect
                                placeholder="Kwartał"
                                value={quarter}
                                options={quarters.map((quarter) => {
                                    const monthIndices = [
                                        (quarter - 1) * 3,
                                        (quarter - 1) * 3 + 1,
                                        (quarter - 1) * 3 + 2,
                                    ];

                                    return {
                                        label: String(quarter),
                                        value: quarter,
                                        postLabelNode: monthIndices.map(
                                            (monthIndex) => (
                                                <Badge
                                                    key={monthIndex}
                                                    size="xs"
                                                    // colorPalette=""
                                                >
                                                    {new Date(
                                                        0,
                                                        monthIndex
                                                    ).toLocaleString(
                                                        "default",
                                                        {
                                                            month: "long",
                                                        }
                                                    )}
                                                </Badge>
                                            )
                                        ),
                                    };
                                })}
                                onValueChanged={(value) =>
                                    setQuarter(Number(value) as typeof quarter)
                                }
                                required
                            />
                        </Tc>
                    </Tr>
                    <Tr>
                        <ThRow style={submittionTableHeaderStyles}>Gmina</ThRow>
                        <Tc>
                            <MyInputSelect
                                placeholder="Gmina"
                                value={communeID}
                                options={communesDBTable.rows.map<MySelectOption>(
                                    (row) => ({
                                        label: row.name,
                                        value: row.id,
                                    })
                                )}
                                onValueChanged={(value) =>
                                    setCommuneID(Number(value))
                                }
                                required
                            />
                        </Tc>
                    </Tr>
                </Tb>
                <Button
                    onClick={handleGenerateClicked}
                    disabled={isGenerating}
                    colorPalette="blue"
                >
                    {isGenerating && (
                        <ProgressCircleRoot
                            value={null}
                            size="xs"
                            colorPalette="black"
                        >
                            <ProgressCircleRing
                                cap="round"
                                colorPalette="black"
                            />
                        </ProgressCircleRoot>
                    )}
                    {isGenerating ? "Generuję ..." : "Generuj"}
                </Button>
            </VStack>
            <Box width="3/4" position="relative">
                {pdfObjectURL ? (
                    <object
                        data={pdfObjectURL}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    >
                        Nie działa
                    </object>
                ) : (
                    <>
                        {isGenerating && (
                            <ProgressCircleRoot
                                value={null}
                                position="absolute"
                                zIndex={10}
                                top="50%"
                                left="50%"
                                color="neutral"
                                // variant="solid"
                            >
                                <ProgressCircleRing cap="round" />
                            </ProgressCircleRoot>
                        )}
                        <Skeleton width="full" height="full" variant="shine" />
                    </>
                )}
            </Box>
        </HStack>
    );
}
