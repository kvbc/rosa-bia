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
import { useStats } from "@/hooks/useStats";

export default function PageStatsB05() {
    const stats = useStats();
    const communesDBTable = useDBTable<DB.Rows.Commune>("communes");

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

                const getRowsA = (
                    pkobs: number | number[],
                    constructionCategoryName: string = "Budowa"
                ) =>
                    stats.getRows(
                        pkobs,
                        year,
                        (quarter - 1) * 3,
                        quarter * 3 - 1,
                        false,
                        communeName,
                        constructionCategoryName
                    );

                const getRowsB = (
                    pkobs: number | number[],
                    constructionCategoryName: string = "Budowa"
                ) =>
                    stats.filterIndividual(
                        getRowsA(pkobs, constructionCategoryName)
                    );

                //
                // Dział 1: PnB i Zg. Zwykle (tylko "Budowa")
                //
                // prettier-ignore
                const tableSection1: (string | number)[] = [];
                [1110, 1121, 1122].forEach((pkob) => {
                    tableSection1.push(
                        // row a
                        getRowsA(pkob).length,
                        stats.filterMPZP(getRowsA(pkob)).length,
                        stats.reduceBuildingCount(getRowsA(pkob)),
                        stats.reduceBuildingCount(
                            stats.filterMPZP(getRowsA(pkob))
                        ),
                        stats.reducePremisesCount(getRowsA(pkob)),
                        stats.reduceUsableArea(getRowsA(pkob), pkob),

                        // row b
                        getRowsB(pkob).length,
                        stats.filterMPZP(getRowsB(pkob)).length,
                        stats.reduceBuildingCount(getRowsB(pkob)),
                        stats.reduceBuildingCount(
                            stats.filterMPZP(getRowsB(pkob))
                        ),
                        stats.reducePremisesCount(getRowsB(pkob)),
                        stats.reduceUsableArea(getRowsB(pkob), pkob)
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

                //
                // Dział 2
                //
                const tableSection2: (number | string)[] = [
                    // rozbudowa

                    getRowsA([11, 12], "Rozbudowa").length,
                    "-",
                    "-",

                    getRowsB([11, 12], "Rozbudowa").length,
                    "-",
                    "-",

                    // przebudowa

                    getRowsA([11, 12], "Przebudowa").length,
                    "-",
                    "-",

                    getRowsB([11, 12], "Przebudowa").length,
                    "-",
                    "-",

                    // nowe

                    "",
                    "-",
                    "-",

                    "",
                    "-",
                    "-",
                ];
                for (let ix = 0; ix < 3; ix++) {
                    for (let iy = 0; iy < 6; iy++) {
                        const index = iy * 3 + ix;
                        const value = tableSection2[index];
                        const xOffset = [0, 138, 290][ix];
                        const x = 441 + xOffset;
                        pages[1].drawText(String(value), {
                            x,
                            y: pages[1].getHeight() - (120 + iy * 12.75),
                            size: 10,
                            font,
                        });
                    }
                }

                //
                // Dział 3
                //
                // prettier-ignore
                const tableSection3: (string | number)[] = [];
                [113, 121, 122, 123, 124, 125, 126, 127, 2].forEach((pkob) => {
                    // prettier-ignore
                    tableSection3.push(
                        // row a
                        getRowsA(pkob).length,
                        stats.filterMPZP(getRowsA(pkob)).length,
                        pkob === 2 ? "" : stats.reduceBuildingCount(getRowsA(pkob)),
                        pkob === 2 ? "" : stats.reduceBuildingCount(stats.filterMPZP(getRowsA(pkob))),
                        pkob === 2 ? "" : stats.reduceUsableArea(getRowsA(pkob), pkob),
                    );
                });
                for (let ix = 0; ix < 5; ix++) {
                    for (let iy = 0; iy < 9; iy++) {
                        const index = iy * 5 + ix;
                        const value = tableSection3[index];
                        const xOffset = [0, 65, 128, 192, 273][ix];
                        let y = 333 + iy * 14.75;
                        const x = 486.5 + xOffset;
                        if (iy === 6) {
                            y += 5;
                        } else if (iy === 7) {
                            y = 443;
                        } else if (iy === 8) {
                            y = 458;
                        }
                        pages[1].drawText(String(value), {
                            x,
                            y: pages[1].getHeight() - y,
                            size: 10,
                            font,
                        });
                    }
                }

                // end

                pages[1].drawText("30", {
                    x: 740,
                    y: 115,
                    size: 10,
                    font,
                });
                pages[1].drawText("30", {
                    x: 740,
                    y: 102,
                    size: 10,
                    font,
                });
                pages[1].drawText(
                    `Człuchów, ${new Date().toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}`,
                    {
                        x: 470,
                        y: 55,
                        size: 10,
                        font,
                    }
                );

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
    }, [year, communeName, quarter, stats]);

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
