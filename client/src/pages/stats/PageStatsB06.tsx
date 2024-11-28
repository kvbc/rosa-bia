import ErrorIcon from "@mui/icons-material/Error";
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
import {
    MyInputSelect,
    MySelectOption,
} from "@/components/my_input/MyInputSelect";
import {
    ProgressCircleRing,
    ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageStatsB06() {
    const minYear = 2019;
    const maxYear = new Date().getFullYear();
    const years: { year: number; works: boolean }[] = [];
    for (let year = minYear; year <= maxYear; year++) {
        const works = ![2020, 2021].includes(year);
        years.push({ year, works });
    }

    const [year, setYear] = useState<number>(maxYear);
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const [pdfObjectURL, setPDFObjectURL] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const getMonthName = useCallback((monthIndex: number) => {
        return [
            "styczeń",
            "luty",
            "marzec",
            "kwiecień",
            "maj",
            "czerwiec",
            "lipiec",
            "sierpień",
            "wrzesień",
            "październik",
            "listopad",
            "grudzień",
        ][monthIndex];
    }, []);

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
        fetch(`/forms/b06/${year}.pdf`)
            .then((res) => res.arrayBuffer())
            .then((loadedPDFBytes) => PDFDocument.load(loadedPDFBytes))
            .then(async (pdfDoc) => {
                pdfDoc.setTitle("Formularz B-06");
                pdfDoc.setAuthor("Starostwo Powiatowe Człuchów");
                pdfDoc.setSubject("Formularz B-06");
                pdfDoc.setKeywords(["formularz", "b-06"]);
                pdfDoc.setProducer("Strona");
                pdfDoc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)') // prettier-ignore
                pdfDoc.setCreationDate(new Date());
                pdfDoc.setModificationDate(new Date());

                pdfDoc.registerFontkit(fontkit);

                // only first page
                for (
                    let pageIndex = pdfDoc.getPageCount() - 1;
                    pageIndex > 0;
                    pageIndex--
                ) {
                    pdfDoc.removePage(pageIndex);
                }

                const fontBytes = await fetch(
                    "/fonts/NotoSerif/NotoSerif-Regular.ttf"
                ).then((res) => res.arrayBuffer());
                const font = await pdfDoc.embedFont(fontBytes);
                const pages = pdfDoc.getPages();

                // Miesiąc
                pages[0].drawText(getMonthName(monthIndex), {
                    x: 410,
                    y: 463,
                    size: 10,
                    font,
                });

                // Województwo
                pages[0].drawText("POMORSKIE", {
                    x: 200,
                    y: 394,
                    size: 10,
                    font,
                });
                // Powiat
                pages[0].drawText("CZŁUCHOWSKI", {
                    x: 570,
                    y: 394,
                    size: 10,
                    font,
                });

                // prettier-ignore
                const table: (number | string)[] = [
                    "-","-","-","-",
                    "-","-","-","-",
                    "-","-","-","-",
                    "-","-","-","-",
                    "","-","-","-",
                    "-","-","-","-",
                    "-","-","-","-",
                    "-","-","-","-"
                ]
                for (let ix = 0; ix < 4; ix++) {
                    for (let iy = 0; iy < 8; iy++) {
                        const index = iy * 4 + ix;
                        const value = table[index];
                        pages[0].drawText(String(value), {
                            x: 359 + 129 * ix,
                            y: pages[1].getHeight() - (338 + iy * 15),
                            size: 10,
                            font,
                        });
                    }
                }

                //
                // end
                //

                pages[0].drawText("30", {
                    x: 740,
                    y: 106,
                    size: 10,
                    font,
                });
                pages[0].drawText("30", {
                    x: 740,
                    y: 94,
                    size: 10,
                    font,
                });
                pages[0].drawText(
                    `Człuchów, ${new Date().toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}`,
                    {
                        x: 450,
                        y: 47,
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
    }, [year, monthIndex, getMonthName]);

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
                <Text fontSize="lg">Formularz B-06</Text>
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
                            Miesiąc
                        </ThRow>
                        <Tc>
                            <MyInputSelect
                                placeholder="Miesiąc"
                                value={monthIndex}
                                options={[
                                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                                ].map((monthIndex) => ({
                                    label: getMonthName(monthIndex),
                                    value: monthIndex,
                                }))}
                                onValueChanged={(value) =>
                                    setMonthIndex(Number(value))
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
