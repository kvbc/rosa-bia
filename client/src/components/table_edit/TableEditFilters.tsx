// import { useMemo, useState } from "react";
// import { FaFilter, FaRepeat } from "react-icons/fa6";
// import {
//     AccordionItem,
//     AccordionItemContent,
//     AccordionItemTrigger,
//     AccordionRoot,
// } from "../ui/accordion";
// import { Box } from "@chakra-ui/react";
// import { TableEdit, TableEditHeader, TableEditRowType } from "./TableEdit";
// import { TableEditRowInputsProps } from "./row/TableEditRow";
// import { MySelectOption } from "../my_input/MyInputSelect";
// import { Range } from "@/utils/types";

// type FilterRow<TRow extends TableEditRowType> = TableEditRowType & {
//     key: keyof TRow & string;
//     value: unknown;
// };

// export function TableEditFilters<TRow extends TableEditRowType>({
//     rowInputsProps,
//     defaultRow,
// }: {
//     rowInputsProps: TableEditRowInputsProps<TRow>;
//     defaultRow: TRow;
// }) {
//     const [filterRows] = useState<FilterRow<TRow>[]>([]);

//     const filterHeaders = useMemo<TableEditHeader[]>(
//         () => ["Pozycja", "Filtr"],
//         []
//     );

//     const filterRowInputsProps = useMemo<
//         TableEditRowInputsProps<FilterRow<TRow>>
//     >(
//         () => [
//             {
//                 rowKey: "key",
//                 type: "select",
//                 placeholder: "Pozycja",
//                 getSelectOptions: () =>
//                     rowInputsProps.map<MySelectOption>((inputProps) => ({
//                         label: inputProps.displayName ?? inputProps.rowKey,
//                         value: inputProps.rowKey,
//                     })),
//             },
//             {
//                 rowKey: "value",
//                 placeholder: "Filtr",
//                 getType: (row) =>
//                     rowInputsProps.find(
//                         (inputProps) => inputProps.rowKey === row.key
//                     )!.type!, // FIXME yuck
//             },
//         ],
//         [rowInputsProps]
//     );

//     // FIXME something wrong when expanding registers filter, maybe thees?
//     const filterDefaultRow = useMemo<FilterRow<TRow>>(() => {
//         const key = rowInputsProps[0].rowKey;
//         const type = rowInputsProps[0].type;
//         let value: unknown = defaultRow[key];
//         if (type === "number" || type === "date") {
//             value = { from: value, to: value } satisfies Range;
//         }
//         return {
//             id: 1,
//             key,
//             value,
//         };
//     }, [rowInputsProps, defaultRow]);

//     return (
//         <AccordionRoot collapsible variant="plain">
//             <AccordionItem value="1">
//                 <AccordionItemTrigger fontSize="inherit" padding="0">
//                     <FaFilter />
//                     <Box>Filtry</Box>
//                     <FaRepeat />
//                 </AccordionItemTrigger>
//                 <AccordionItemContent>
//                     <TableEdit<FilterRow<TRow>>
//                         rows={filterRows}
//                         headers={filterHeaders}
//                         totalRowCount={filterRows.length}
//                         rowInputsProps={filterRowInputsProps}
//                         hidePagination
//                         defaultRow={filterDefaultRow}
//                     />
//                 </AccordionItemContent>
//             </AccordionItem>
//         </AccordionRoot>
//     );
// }
