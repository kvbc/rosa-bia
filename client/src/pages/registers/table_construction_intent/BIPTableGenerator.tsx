import { useEffect, useState } from "react";
import { ClientRegister } from "../PageRegisters";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { font } from "./NotoSerif-Regular-normal";
import useDBTable from "@/hooks/useDBTable";
import * as DB from "@shared/db";

export const BIPTableGenerator: React.FC<{ row: ClientRegister }> = ({
    row,
}) => {
    const investorsDBTable = useDBTable<DB.Rows.Investor>("investors");
    const communesDBTable = useDBTable<DB.Rows.Commune>("communes");
    const placesDBTable = useDBTable<DB.Rows.Place>("places");
    const streetsDBTable = useDBTable<DB.Rows.Street>("streets");
    const constructionLawIntentsDBTable = useDBTable<DB.Rows.ConstructionLawIntent>("construction_law_intents"); // prettier-ignore
    const constructionLawCategoriesDBTable = useDBTable<DB.Rows.ConstructionLawCategory>("construction_law_categories"); // prettier-ignore
    const [pdfDataURL, setPDFDataURL] = useState<string | undefined>();

    // Create new PDF Document if not exists
    useEffect(() => {
        const doc = new jsPDF();

        //
        // font creation
        //
        doc.addFileToVFS("NotoSerif-Regular-normal.ttf", font);
        doc.addFont(
            "NotoSerif-Regular-normal.ttf",
            "NotoSerif-Regular",
            "normal"
        );

        //
        // first cell content
        //
        const investor = investorsDBTable.rows.find(
            (investor) => investor.id === row.app_investor_id
        );
        const constructionLawIntent = constructionLawIntentsDBTable.rows.find(
            (intent) => intent.id === row.object_construction_law_intent_id
        );
        const constructionLawCategory =
            constructionLawCategoriesDBTable.rows.find(
                (category) => category.id === constructionLawIntent?.category_id
            );
        const street = streetsDBTable.rows.find(
            (street) => street.id === row.object_street_id
        );
        const place = placesDBTable.rows.find(
            (place) => place.id === street?.place_id
        );
        const commune = communesDBTable.rows.find(
            (commune) => commune.id === place?.commune_id
        );
        const investorName: string = investor ? investor.name + " " : "";
        const constructionLawCategoryName: string = constructionLawCategory ? constructionLawCategory.name + " " : "" // prettier-ignore
        const constructionLawIntentName: string = constructionLawIntent ? constructionLawIntent.intent + ". " : ""; // prettier-ignore
        const communeName: string = commune ? "Gmina " + commune.name + ", " : ""; // prettier-ignore
        const placeName: string = place ? place.name + " " : "";
        const streetName: string = street ? "ul. " + street.name + " " : "";
        const plotsContent: string = "na terenie działek ...";
        const firstCellContent: string =
            investorName +
            constructionLawCategoryName +
            constructionLawIntentName +
            communeName +
            placeName +
            streetName +
            plotsContent;

        //
        // table generation
        //
        autoTable(doc, {
            head: [["Dane", "Opis"]],
            body: [
                [
                    "Imie i nazwisko albo nazwa inwestora adres i opis projektowanego obiektu",
                    // "Energa Operator S.A. Oddział w Koszalinie. Budowa linii kablowej 0,4kV do zasilania obiektu handlowego na działce nr 19/1 w m. Człuchów na terenie działek nr 21, 19/12, 19/31.",
                    firstCellContent,
                ],
                ["Informacja o dacie wniesienia sprzeciwu", ""],
                ["Informacja o braku wniesienia sprzeciwu - data", ""],
                ["Uwagi", ""],
            ],
            styles: {
                font: "NotoSerif-Regular", // font used in the table
            },
        });

        setPDFDataURL(doc.output("datauristring"));
    }, [
        investorsDBTable.rows,
        row.app_investor_id,
        constructionLawIntentsDBTable.rows,
        row.object_construction_law_intent_id,
        communesDBTable.rows,
        constructionLawCategoriesDBTable.rows,
        placesDBTable.rows,
        row.object_street_id,
        streetsDBTable.rows,
    ]);

    return (
        <object
            data={pdfDataURL + "#zoom=100"}
            type="application/pdf"
            width="100%"
            height="100%"
        >
            Funkcja nieobsługiwana
        </object>
    );
};
