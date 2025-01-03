import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import useDBTable from "@/hooks/useDBTable";
import * as DB from "@shared/db";
import autoTable from "jspdf-autotable";
import { font } from "../registers/table_construction_intent/NotoSerif-Regular-normal";

export function PageStatsEmployees() {
    const [pdfDataURL, setPDFDataURL] = useState<string | undefined>();
    const employeesDBTable = useDBTable<DB.Rows.Employee>("employees");
    const registersDBTable = useDBTable<DB.Rows.Register>("registers");

    useEffect(() => {
        const doc = new jsPDF();

        doc.addFileToVFS("NotoSerif-Regular-normal.ttf", font);
        doc.addFont(
            "NotoSerif-Regular-normal.ttf",
            "NotoSerif-Regular",
            "normal"
        );

        const body: [string, number][] = employeesDBTable.rows.map(
            (employee) => [
                employee.name,
                registersDBTable.rows.filter(
                    (register) => register.assigned_employee_id === employee.id
                ).length,
            ]
        );

        // sort by count of assigned registers
        body.sort((a, b) =>
            a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1]
        );

        autoTable(doc, {
            head: [["Użytkownik", "Suma wniosków"]],
            body,
            styles: {
                font: "NotoSerif-Regular", // font used in the table
            },
        });

        setPDFDataURL(doc.output("datauristring"));
    }, [employeesDBTable.rows, registersDBTable.rows]);

    return (
        <>
            <Heading>Przydział</Heading>
            <br />
            <object
                data={pdfDataURL + "#zoom=100"}
                type="application/pdf"
                width="100%"
                height="100%"
            >
                Funkcja nieobsługiwana
            </object>
        </>
    );
}
