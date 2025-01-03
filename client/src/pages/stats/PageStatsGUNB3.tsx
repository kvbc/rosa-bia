import React, { useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import {
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
import { MyInputSelect } from "@/components/my_input/MyInputSelect";
import {
    ProgressCircleRing,
    ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { Skeleton } from "@/components/ui/skeleton";
import { getDateNow } from "@/utils/time";
import MyInput from "@/components/my_input/MyInput";
import { useStats } from "@/hooks/useStats";

export default function PageStatsGUNB3() {
    const [year, setYear] = useState<number>(getDateNow().getFullYear());
    const [semester, setSemester] = useState<1 | 2>(1);
    const [pdfObjectURL, setPDFObjectURL] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const stats = useStats();

    const getStatRows = useCallback(
        (pkobs: number | number[], flipPKOBs: boolean = false) =>
            stats.getRows(
                pkobs,
                year,
                (semester - 1) * 6,
                semester * 6 - 1,
                flipPKOBs
            ),
        [semester, year, stats]
    );

    const handleGenerateClicked = useCallback(() => {
        // const pdfFetchUrl = `https://form.stat.gov.pl/formularze/${year}/passive/B-05.pdf`;
        // console.log(pdfFetchUrl);
        // fetch(pdfFetchUrl)
        //     .then((res) => {
        //         console.log(res);
        //         return res.arrayBuffer();
        //     })
        setIsGenerating(true);
        setPDFObjectURL(null);
        fetch(`/forms/gunb3/gunb3.pdf`)
            .then((res) => res.arrayBuffer())
            .then((loadedPDFBytes) => PDFDocument.load(loadedPDFBytes))
            .then(async (pdfDoc) => {
                pdfDoc.setTitle("Formularz GUNB-3");
                pdfDoc.setAuthor("Starostwo Powiatowe Człuchów");
                pdfDoc.setSubject("Formularz GUNB-3");
                pdfDoc.setKeywords(["formularz", "gunb-3"]);
                pdfDoc.setProducer("Strona");
                pdfDoc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)') // prettier-ignore
                pdfDoc.setCreationDate(new Date());
                pdfDoc.setModificationDate(new Date());

                pdfDoc.registerFontkit(fontkit);

                // only first page
                // for (
                //     let pageIndex = pdfDoc.getPageCount() - 1;
                //     pageIndex > 0;
                //     pageIndex--
                // ) {
                //     pdfDoc.removePage(pageIndex);
                // }

                const fontBytes = await fetch(
                    "/fonts/NotoSerif/NotoSerif-Regular.ttf"
                ).then((res) => res.arrayBuffer());
                const font = await pdfDoc.embedFont(fontBytes);
                const pages = pdfDoc.getPages();

                // okres
                pages[0].drawText(
                    `${semester === 1 ? "I" : "II"} PÓŁROCZE ${year}r.`,
                    {
                        x: 435,
                        y: 611,
                        size: 8,
                        font,
                    }
                );

                const table: number[] = [];
                const specifiedPKOBs: (number | number[])[] = [
                    // 1
                    1110,
                    [1121, 1122],
                    [1130, 1211, 1212],
                    [
                        1220, 1230, 1241, 1242, 1261, 1262, 1263, 1264, 1265,
                        1272, 1273, 1274,
                    ],
                    1271,
                    [1251, 1252],
                    [2111, 2112, 2121, 2122, 2130, 2141, 2142],
                    [2151, 2152, 2153],
                    [2211, 2212, 2213, 2214, 2221, 2222, 2223, 2224],
                    // 2
                    [2111, 2112, 2141, 2142],
                    [2151, 2152, 2420],
                ];
                specifiedPKOBs.forEach((pkobs) => {
                    // prettier-ignore
                    table.push(
                        getStatRows(pkobs).length,
                        stats.reduceBuildingCount(getStatRows(pkobs))
                    );
                });
                const specPKOBsMerged = specifiedPKOBs.reduce<number[]>(
                    (acc, pkobs) =>
                        typeof pkobs === "number"
                            ? [...acc, pkobs]
                            : [...acc, ...pkobs],
                    []
                );
                table.push(
                    getStatRows(specPKOBsMerged, true).length,
                    stats.reduceBuildingCount(
                        getStatRows(specPKOBsMerged, true)
                    )
                );
                table.push(
                    table.reduce<number>(
                        (acc, v, i) => (i % 2 === 0 ? acc + v : acc),
                        0
                    ),
                    table.reduce<number>(
                        (acc, v, i) => (i % 2 === 1 ? acc + v : acc),
                        0
                    )
                );
                for (let ix = 0; ix < 2; ix++) {
                    for (let iy = 0; iy < 11; iy++) {
                        const index = iy * 2 + ix;
                        const value = table[index];
                        pages[0].drawText(String(value), {
                            x: 347 + 81 * ix,
                            y: pages[0].getHeight() - (340 + iy * 34.5),
                            size: 10,
                            font,
                        });
                    }
                }
                for (let ix = 0; ix < 2; ix++) {
                    for (let iy = 11; iy < 13; iy++) {
                        const index = iy * 2 + ix;
                        const value = table[index];
                        pages[1].drawText(String(value), {
                            x: 362 + 105 * ix,
                            y: pages[1].getHeight() - (257 + (iy - 11) * 43),
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
    }, [year, semester, getStatRows, stats]);

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
                <Text fontSize="lg">Formularz GUNB-3</Text>
                <Tb size="sm">
                    <Tr>
                        <ThRow style={submittionTableHeaderStyles}>Rok</ThRow>
                        <Tc>
                            <MyInput
                                placeholder="Rok"
                                value={String(year)}
                                onValueChanged={(value) => {
                                    if (value.length <= 4) {
                                        setYear(Number(value));
                                    }
                                }}
                                required
                            />
                        </Tc>
                    </Tr>
                    <Tr>
                        <ThRow style={submittionTableHeaderStyles}>
                            Półrocze
                        </ThRow>
                        <Tc>
                            <MyInputSelect
                                placeholder="Miesiąc"
                                value={semester}
                                options={[1, 2].map((semester) => ({
                                    label: String(semester),
                                    value: semester,
                                }))}
                                onValueChanged={(value) =>
                                    setSemester(
                                        Number(value) as typeof semester
                                    )
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
                        data={pdfObjectURL + "#zoom=100"}
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
