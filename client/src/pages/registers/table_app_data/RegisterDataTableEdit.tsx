/*
 *
 * Tabela danych wniosku
 *
 */

import * as DB from "@shared/db";
import { ComponentProps, useMemo } from "react";
import { TableEditRowContentComponentProps } from "@/components/table_edit/row/TableEditRowContentComponent";
import { MyTable, MyTable as Tb } from "@/components/my_table/MyTable";
import { MyTableHeader as Th } from "@/components/my_table/MyTableHeader";
import { MyTableRow as Tr } from "@/components/my_table/MyTableRow";
import { MyTableCell as Tc } from "@/components/my_table/MyTableCell";
import { topRowHeight } from "../RegisterTableEditRowContent";
import { FeatureUnfinishedIcon } from "@/components/FeatureUnfinishedIcon";
import { ClientRegister } from "../PageRegisters";
import { HStack, IconButton } from "@chakra-ui/react";
import { FaFileSignature, FaUserTie } from "react-icons/fa6";
import useDBTable from "@/hooks/useDBTable";
import { isRegisterType } from "@/utils/array";
import { LuPlus } from "react-icons/lu";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import PageInvestors from "@/pages/investors/PageInvestors";
import { MyTableContext } from "@/contexts/components/MyTableContext";
import TableEditContext from "@/contexts/components/TableEditContext";
import { TableEditMentionButton } from "@/components/table_edit/TableEditMentionButton";
import RegisterTableEdit from "../RegisterTableEdit";

export default function RegisterDataTableEdit({
    inputs,
    ftoggles,
    row,
    showMore,
    children,
    ...myTableProps
}: ComponentProps<typeof MyTable> &
    TableEditRowContentComponentProps<ClientRegister> & {
        showMore: boolean;
    }) {
    // const pageContext = useContext(PageRegistersContext)!;
    const investorsDBTable = useDBTable<DB.Rows.Investor>("investors"); // prettier-ignore

    const investor = useMemo(
        () =>
            investorsDBTable.rows.find(
                (investor) => investor.id === row.app_investor_id
            ),
        [investorsDBTable.rows, row.app_investor_id]
    );

    const showConstructionJournal = isRegisterType(
        row.type,
        "PnB (6740)",
        "PnRozb. (6741)",
        "BiP (6743.4)",
        "ZRiD (7012)"
    );

    const decisionTitle = useMemo(() => {
        switch (row.type) {
            case "PnB (6740)":
            case "PnRozb. (6741)":
            case "ZRiD (7012)":
            case "Uzupełniający":
            case "Wejście na dz. sąsiednią":
                return "Decyzja Starosty Człuchowskiego";
            case "Zg. Rozb. (6743.1)":
            case "Zg. Zwykłe (6743.2)":
            case "Zm. Sp. Użytk. (6743.3)":
            case "BiP (6743.4)":
            case "Samodz. Lokali (705)":
            case "Tymczasowe (6743.5)":
                return "Zaświadczenie / Decyzja";
            case "Pisma różne (670)":
                return "Odpowiedź";
            case "Dz. bud":
            case "Konserwator (Inne)":
            case "Lokalizacja inwestycji (Inne)":
            case "PiNB (Inne)":
                return <FeatureUnfinishedIcon />;
        }
    }, [row.type]);

    const MentionButton: React.FC<
        ComponentProps<typeof TableEditMentionButton> & {
            rowKey: keyof ClientRegister & string;
        }
    > = ({ rowKey, ...restProps }) => {
        return (
            <TableEditMentionButton
                color="green"
                opacity="20%"
                offset={true}
                {...restProps}
            >
                <RegisterTableEdit
                    disableRowAdding={true}
                    initialRegistersFilters={[
                        {
                            key: rowKey,
                            operator: "like",
                            value: `%${row[rowKey]}%`, // includes
                        },
                    ]}
                />
            </TableEditMentionButton>
        );
    };

    return (
        <Tb overflow="visible" {...myTableProps}>
            <Th colSpan={2}>
                {/* <HStack gap="1">
                    <FaFileAlt />
                    Dane wniosku
                </HStack> */}
                Dane wniosku
            </Th>
            ,
            {row.type === "Dz. bud" && (
                <>
                    <Tr>
                        <Tc>Złożony w dniu</Tc>
                        <Tc>{inputs.app_submission_date}</Tc>
                    </Tr>
                    <Tr>
                        <Tc>Nr decyzji / zaświadczenia</Tc>
                        <Tc>{inputs.app_number}</Tc>
                    </Tr>
                    <Tr>
                        <Tc>Typ dziennika</Tc>
                        <Tc>{inputs.app_construction_journal_type}</Tc>
                    </Tr>
                </>
            )}
            {row.type !== "Dz. bud" && (
                <>
                    <Tr height={topRowHeight}>
                        <Tc>
                            <HStack gap="1">
                                {ftoggles.app_number}
                                Numer wniosku
                                <MentionButton
                                    rowKey="app_number"
                                    subtitle={`Numer wniosku: ${row.app_number}`}
                                />
                            </HStack>
                        </Tc>
                        <Tc>{inputs.app_number}</Tc>
                    </Tr>
                    <Tr height={topRowHeight}>
                        <Tc position="relative">
                            <HStack gap="1">
                                {ftoggles.app_submission_date}
                                Data złożenia
                                <MentionButton
                                    rowKey="app_submission_date"
                                    subtitle={`Data złożenia: ${row.app_submission_date}`}
                                />
                            </HStack>
                            {/* show more button */}
                            {children}
                        </Tc>
                        <Tc>{inputs.app_submission_date}</Tc>
                    </Tr>
                    {showMore && (
                        <>
                            <Tr>
                                <Tc colSpan={2}>
                                    <Tb isCollapsible>
                                        <Th>
                                            <HStack gap="1">
                                                {ftoggles.app_investor_id}
                                                <FaUserTie />
                                                Inwestor
                                                {/* <Button
                                                    size="2xs"
                                                    variant="subtle"
                                                    fontSize="md"
                                                    borderRadius="full"
                                                    // fontSize="inherit"
                                                    colorPalette="green"
                                                >
                                                    +
                                                </Button> */}
                                                <DialogRoot size="xl">
                                                    <DialogTrigger asChild>
                                                        <IconButton
                                                            size="2xs"
                                                            colorPalette="green"
                                                            variant="plain"
                                                        >
                                                            <LuPlus />
                                                        </IconButton>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogCloseTrigger />
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Inwestorzy
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <DialogBody>
                                                            <MyTableContext.Provider
                                                                value={0}
                                                            >
                                                                <TableEditContext.Provider
                                                                    value={null}
                                                                >
                                                                    <PageInvestors />
                                                                </TableEditContext.Provider>
                                                            </MyTableContext.Provider>
                                                        </DialogBody>
                                                    </DialogContent>
                                                </DialogRoot>
                                                <MentionButton
                                                    rowKey="app_investor_id"
                                                    subtitle="Inwestor"
                                                    opacity="100%"
                                                    offset={false}
                                                />
                                            </HStack>
                                        </Th>
                                        <Tr>
                                            <Tc>{inputs.app_investor_id}</Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>{investor?.address ?? "-"}</Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            <Tr>
                                <Tc colSpan={2}>
                                    <Tb isCollapsible>
                                        <Th colSpan={2}>
                                            <HStack gap="1">
                                                {ftoggles.app_decision_type}
                                                <FaFileSignature />
                                                {decisionTitle}
                                            </HStack>
                                        </Th>
                                        <Tr>
                                            <Tc colSpan={2}>
                                                {inputs.app_decision_type}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>
                                                <HStack gap="1">
                                                    {
                                                        ftoggles.app_decision_number
                                                    }
                                                    Numer decyzji
                                                </HStack>
                                            </Tc>

                                            <Tc>
                                                {inputs.app_decision_number}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>
                                                <HStack gap="1">
                                                    {
                                                        ftoggles.app_decision_issue_date
                                                    }
                                                    Data wydania
                                                </HStack>
                                            </Tc>
                                            <Tc>
                                                {inputs.app_decision_issue_date}
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            <Tr height="full">
                                <Tc colSpan={2} height="full">
                                    <Tb isCollapsible>
                                        <Th colSpan={2}>
                                            <HStack gap="1">
                                                {ftoggles.app_resolution_type}
                                                <FaFileSignature />
                                                Inne rozstrzygnięcie
                                            </HStack>
                                        </Th>
                                        <Tr>
                                            <Tc colSpan={2}>
                                                {inputs.app_resolution_type}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>
                                                <HStack gap="1">
                                                    {
                                                        ftoggles.app_resolution_number
                                                    }
                                                    Numer pisma
                                                </HStack>
                                            </Tc>
                                            <Tc>
                                                {inputs.app_resolution_number}
                                            </Tc>
                                        </Tr>
                                        <Tr>
                                            <Tc>
                                                <HStack gap="1">
                                                    {
                                                        ftoggles.app_resolution_issue_date
                                                    }
                                                    Data wydania
                                                </HStack>
                                            </Tc>
                                            <Tc>
                                                {
                                                    inputs.app_resolution_issue_date
                                                }
                                            </Tc>
                                        </Tr>
                                    </Tb>
                                </Tc>
                            </Tr>
                            {showConstructionJournal && (
                                <Tr>
                                    <Tc colSpan={2}>
                                        <Tb isCollapsible>
                                            <Th colSpan={2}>Dziennik budowy</Th>
                                            <Tr>
                                                <Tc>Numer</Tc>
                                                <Tc>
                                                    {
                                                        inputs.admin_construction_journal_number
                                                    }
                                                </Tc>
                                            </Tr>
                                            <Tr>
                                                <Tc>Z dnia</Tc>
                                                <Tc>
                                                    {
                                                        inputs.admin_construction_journal_date
                                                    }
                                                </Tc>
                                            </Tr>
                                        </Tb>
                                    </Tc>
                                </Tr>
                            )}
                        </>
                    )}
                </>
            )}
        </Tb>
    );
}
