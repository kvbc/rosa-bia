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

export default function PageStatsGUNB3() {
    const [year, setYear] = useState<number>(getDateNow().getFullYear());
    const [semester, setSemester] = useState<1 | 2>(1);
    const [pdfObjectURL, setPDFObjectURL] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

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
    }, [year, semester]);

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
