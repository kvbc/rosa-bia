import * as DB from "@shared/db";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { ClientRegister } from "../PageRegisters";
import { DBTableEdit } from "@/components/DBTableEdit";
import { PageRegistersContext } from "@/contexts/pages/PageRegistersContext";
import { TableEditHeader } from "@/components/table_edit/TableEdit";
import { TableEditRowInputsProps } from "@/components/table_edit/row/TableEditRow";
import RegisterAdminProcedureActionsDBTableEditRowContent from "./RegisterAdminProcedureActionsDBTableEditRowContent";

const registerTypeActionTypes: Record<
    DB.Rows.RegisterType,
    DB.Rows.RegisterAdminActionType[]
> = {
    "PnB (6740)": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Konserwator",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
        "Publiczna informacja",
    ],
    "PnRozb. (6741)": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Konserwator",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
    ],
    "Zg. Rozb. (6743.1)": ["Postanowienie", "Przedłużenie terminu"],
    "Zg. Zwykłe (6743.2)": ["Postanowienie", "Przedłużenie terminu"],
    "Zm. Sp. Użytk. (6743.3)": ["Postanowienie", "Przedłużenie terminu"],
    "BiP (6743.4)": ["Postanowienie", "Przedłużenie terminu"],
    "ZRiD (7012)": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
        "Publiczna informacja",
    ],
    "Pisma różne (670)": ["Wezwanie"],
    "Samodz. Lokali (705)": ["Wezwanie"],
    "Dz. bud": [],
    "Tymczasowe (6743.5)": [
        // administracyjne
        "Postanowienie",
        "Przedłużenie terminu",
        "Zawiadomienie o kontroli",
        "Zgłoszenie rozbiórki",
        "Kontrola",
        "Wynik kontroli",
        // egzaminacyjne
        "Wezwanie",
        "Upomnienie",
        "Zawiadomienie o ponownej kontroli",
    ],
    Uzupełniający: [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
        "Publiczna informacja",
    ],
    "Wejście na dz. sąsiednią": [
        "Wezwanie",
        "Zawiadomienie",
        "Postanowienie",
        "Konserwator",
        "Zawieszenie postępowania",
        "Przedłużenie terminu",
    ],
    "Konserwator (Inne)": [],
    "PiNB (Inne)": [],
    "Lokalizacja inwestycji (Inne)": [],
} as const;

export default function RegisterAdminProcedureActionsDBTableEdit(
    props: TableEditRowContentComponentProps<ClientRegister>
) {
    const pageContext = useContext(PageRegistersContext)!;
    // const queryClient = useQueryClient();
    const { row, editable } = props;

    const [actionTypesBeingAdded, setActionTypesBeingAdded] = useState<
        DB.Rows.RegisterAdminActionType[]
    >([]);

    const actionTypes = useMemo(
        () => registerTypeActionTypes[row.type],
        [row.type]
    );

    const headers = useMemo<TableEditHeader[]>(
        () => [
            "Czynność",
            "Wybór",
            "Termin (dni)",
            "Data pisma",
            "Data odebrania",
            "Data odpowiedzi",
        ],
        []
    );

    const rowInputsProps = useMemo<
        TableEditRowInputsProps<DB.Rows.RegisterAdminAction>
    >(
        () => [
            {
                rowKey: "select",
                type: "checkbox",
            },
            {
                rowKey: "deadline",
                type: "number",
            },
            {
                rowKey: "letter_date",
                type: "date",
            },
            {
                rowKey: "receipt_date",
                type: "date",
            },
            {
                rowKey: "reply_date",
                type: "date",
            },
        ],
        []
    );

    useEffect(() => {
        console.log(
            ">Rows:",
            pageContext.registerAdminActionsDBTable.rows.filter(
                (fRow) => fRow.register_id === row.id
            )
        );
    }, [pageContext.registerAdminActionsDBTable.rows, row.id]);

    useEffect(() => {
        console.log(">Init");
    }, []);

    useEffect(() => {
        console.log(">Type is", row.type);
        setActionTypesBeingAdded([]);
    }, [row.type]);

    useEffect(() => {
        console.log(">>", actionTypes);

        const offs = actionTypes.map(
            (actionType: DB.Rows.RegisterAdminActionType, actionTypeIndex) => {
                console.log(
                    actionType,
                    actionTypesBeingAdded.includes(actionType)
                );
                if (
                    !actionTypesBeingAdded.includes(actionType) &&
                    pageContext.registerAdminActionsDBTable.rows.find(
                        (actionRow) =>
                            actionRow.type === actionType &&
                            actionRow.register_id === row.id
                    ) === undefined
                ) {
                    console.log("adding");
                    const id =
                        pageContext.registerAdminActionsDBTable.topRowID +
                        1 +
                        actionTypeIndex;
                    setActionTypesBeingAdded((actionTypesBeingAdded) => [
                        ...actionTypesBeingAdded,
                        actionType,
                    ]);
                    // if (
                    //     pageContext.registerAdminActionsDBTable.rows.find(
                    //         (fRow) => fRow.id === id
                    //     ) === undefined
                    // ) {
                    pageContext.registerAdminActionsDBTable.addRowMutation.mutate(
                        {
                            id,
                            deadline: 0,
                            letter_date: "",
                            receipt_date: "",
                            register_id: row.id,
                            reply_date: "",
                            select: 0,
                            type: actionType,
                        }
                    );
                    // }
                    return () => {
                        // setActionTypesBeingAdded((actionTypesBeingAdded) =>
                        //     actionTypesBeingAdded.filter(
                        //         (type) => type !== actionType
                        //     )
                        // );
                        // pageContext.registerAdminActionsDBTable.abortAddRowMutation();
                        // pageContext.registerAdminActionsDBTable.deleteRowMutation.mutate(
                        //     id
                        // );
                    };
                    // return () => {
                    //     pageContext.registerAdminActionsDBTable.deleteRowMutation.mutate(
                    //         id
                    //     );
                    // };
                    // return pageContext.registerAdminActionsDBTable
                    //     .abortAddRowMutation;
                    // return () => {
                    //     pageContext.registerAdminActionsDBTable.addRowMutation.reset();
                    // queryClient.invalidateQueries({
                    //     queryKey: [
                    //         "table_rows",
                    //         "registers_admin_actions" satisfies DB.TableName,
                    //     ],
                    // });
                    // };
                }
            }
        );

        // let abort = false;
        // for (const actionType of actionTypes) {
        //     if (abort) {
        //         break;
        //     }
        //     addActionRow(actionType);
        // }
        // return () => {
        //     abort = true;
        // };

        // const offs = actionTypes.map(addActionRow);
        return () => {
            offs.forEach((off) => off?.());
        };
    }, [
        actionTypes,
        actionTypesBeingAdded,
        // pageContext.registerAdminActionsDBTable,
        pageContext.registerAdminActionsDBTable.rows,
        pageContext.registerAdminActionsDBTable.addRowMutation,
        // pageContext.registerAdminActionsDBTable.deleteRowMutation,
        pageContext.registerAdminActionsDBTable.topRowID,
        row.id,
    ]);

    const rows = useMemo(
        () =>
            pageContext.registerAdminActionsDBTable.rows.filter(
                (fRow, fRowIndex) =>
                    fRow.register_id === row.id &&
                    actionTypes.includes(fRow.type) &&
                    pageContext.registerAdminActionsDBTable.rows.findIndex(
                        (fRow2) =>
                            fRow2.register_id === row.id &&
                            fRow2.type === fRow.type
                    ) === fRowIndex
            ),
        [pageContext.registerAdminActionsDBTable.rows, row.id, actionTypes]
    );

    return (
        <DBTableEdit
            hidePagination
            editable={editable}
            dbTable={pageContext.registerAdminActionsDBTable}
            headers={headers}
            rows={rows}
            rowInputsProps={rowInputsProps}
            RowContentComponent={
                RegisterAdminProcedureActionsDBTableEditRowContent
            }
        />
    );

    // return (
    //     <Tb
    //         isCollapsible
    //         myHeaders={
    //             <>
    //                 <Th>Czynności</Th>
    //                 <Th>Wybór</Th>
    //                 <Th>Termin (dni)</Th>
    //                 <Th>Data pisma</Th>
    //                 <Th>Data odebrania</Th>
    //                 <Th>Data odpowiedzi</Th>
    //             </>
    //         }
    //     >
    //         {actionTypes.map((actionType) => (
    //             <RegisterAdminProcedureActionsTableRow
    //                 key={actionType}
    //                 actionType={actionType}
    //                 {...props}
    //             />
    //         ))}
    //     </Tb>
    // );
}
