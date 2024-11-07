import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Divider,
    Option,
    Select,
    Skeleton,
    Stack,
    Table,
    Typography,
} from "@mui/joy";
import ErrorIcon from "@mui/icons-material/Error";
import React, { useCallback, useMemo, useState } from "react";
import useDBTable from "../../hooks/useDBTable";
import { DB } from "../../../../server/src/db/types";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export default function PageStatsB05() {
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
                    size: 12,
                    font,
                });

                // Województwo
                pages[0].drawText("POMORSKIE", {
                    x: 115,
                    y: 335,
                    size: 12,
                    font,
                });
                // Powiat
                pages[0].drawText("CZŁUCHOWSKI", {
                    x: 340,
                    y: 335,
                    size: 12,
                    font,
                });
                // Gmina
                pages[0].drawText(communeName.toUpperCase(), {
                    x: 660,
                    y: 335,
                    size: 12,
                    font,
                });

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
    }, [year, communeName, quarter]);

    const submittionTableHeaderStyles: React.CSSProperties = {
        width: "30%",
    };

    return (
        <Stack
            direction="row"
            sx={{
                height: "100%",
            }}
            spacing={2}
            divider={<Divider orientation="vertical" />}
        >
            <Stack
                spacing={2}
                alignItems="stretch"
                sx={{
                    width: "25%",
                }}
            >
                <Typography level="title-lg">Formularz B-05</Typography>
                <Table size="sm">
                    <tbody>
                        <tr>
                            <th scope="row" style={submittionTableHeaderStyles}>
                                Rok
                            </th>
                            <td>
                                <Select
                                    className="w-full"
                                    placeholder="Rok"
                                    value={year}
                                    onChange={(_, value) =>
                                        setYear(value ?? maxYear)
                                    }
                                    required
                                >
                                    {years.map(({ year, works }) => (
                                        <Option key={year} value={year}>
                                            {year}
                                            {!works && (
                                                <ErrorIcon
                                                    fontSize="small"
                                                    color="error"
                                                />
                                            )}
                                        </Option>
                                    ))}
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style={submittionTableHeaderStyles}>
                                Kwartał
                            </th>
                            <td>
                                <Select
                                    placeholder="Kwartał"
                                    value={quarter}
                                    onChange={(_, value) =>
                                        setQuarter(value ?? 1)
                                    }
                                    required
                                >
                                    {quarters.map((quarter) => {
                                        const monthIndices = [
                                            (quarter - 1) * 3,
                                            (quarter - 1) * 3 + 1,
                                            (quarter - 1) * 3 + 2,
                                        ];
                                        return (
                                            <Option
                                                key={quarter}
                                                value={quarter}
                                                label={quarter.toString()}
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
                                                    <Typography>
                                                        {quarter}
                                                    </Typography>

                                                    {monthIndices.map(
                                                        (monthIndex) => (
                                                            <Chip
                                                                key={monthIndex}
                                                                size="sm"
                                                                color="primary"
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
                                                            </Chip>
                                                        )
                                                    )}
                                                </Stack>
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" style={submittionTableHeaderStyles}>
                                Gmina
                            </th>
                            <td>
                                <Select
                                    placeholder="Gmina"
                                    value={communeID}
                                    onChange={(_, value) =>
                                        setCommuneID(value ?? 0)
                                    }
                                    required
                                >
                                    {communesDBTable.rows.map((communeRow) => (
                                        <Option
                                            key={communeRow.name}
                                            value={communeRow.id}
                                        >
                                            {communeRow.name}
                                        </Option>
                                    ))}
                                </Select>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button
                    onClick={handleGenerateClicked}
                    startDecorator={
                        isGenerating && <CircularProgress value={25} />
                    }
                    disabled={isGenerating}
                >
                    {isGenerating ? "Generuję ..." : "Generuj"}
                </Button>
            </Stack>
            <Box
                sx={{
                    width: "75%",
                    position: "relative",
                }}
            >
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
                            <CircularProgress
                                value={25}
                                sx={{
                                    position: "absolute",
                                    zIndex: 10,
                                    top: "50%",
                                    left: "50%",
                                }}
                                color="neutral"
                                variant="solid"
                            />
                        )}
                        <Skeleton animation="wave" />
                    </>
                )}
            </Box>
        </Stack>
    );
}
