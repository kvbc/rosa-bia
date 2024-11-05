import {
    createListCollection,
    Fieldset,
    HStack,
    Tokens,
} from "@chakra-ui/react";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { Field } from "../ui/field";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "../ui/select";
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "../ui/pagination";
import TableEdit, { TableEditRowType } from "./TableEdit";

export function TableEditPagination<TRow extends TableEditRowType>({
    totalRowCount,
    onRowsRangeChanged,
    primaryBackgroundColor = "currentBg",
    secondaryBackgroundColor = "currentBg",
}: ComponentProps<typeof TableEdit<TRow>> & {
    primaryBackgroundColor?: Tokens["colors"] | "currentBg";
    secondaryBackgroundColor?: Tokens["colors"] | "currentBg";
}) {
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const [page, setPage] = useState<number>(1);

    const rowsPerPageCollection = useMemo(
        () =>
            createListCollection({
                items: ["25", "50", "100", "250", "500"],
            }),
        []
    );

    useEffect(() => {
        if (onRowsRangeChanged) {
            const startRowIndex = (page - 1) * rowsPerPage;
            const endRowIndex = page * rowsPerPage;
            onRowsRangeChanged(startRowIndex, endRowIndex);
        }
    }, [onRowsRangeChanged, page, rowsPerPage]);

    return (
        <HStack justify="end">
            <Fieldset.Root>
                <Fieldset.Content>
                    <Field label="Wyniki na stronę" orientation="horizontal">
                        <SelectRoot
                            collection={rowsPerPageCollection}
                            value={[String(rowsPerPage)]}
                            onValueChange={(e) =>
                                setRowsPerPage(Number(e.value))
                            }
                            bg={primaryBackgroundColor}
                            border="1px solid"
                            borderColor={secondaryBackgroundColor}
                        >
                            <SelectTrigger>
                                <SelectValueText />
                            </SelectTrigger>
                            <SelectContent bg={primaryBackgroundColor}>
                                {rowsPerPageCollection.items.map((item) => (
                                    <SelectItem
                                        key={item}
                                        item={item}
                                        _hover={{
                                            backgroundColor:
                                                secondaryBackgroundColor,
                                        }}
                                    >
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                    </Field>
                </Fieldset.Content>
            </Fieldset.Root>
            <PaginationRoot
                count={totalRowCount}
                pageSize={rowsPerPage}
                page={page}
                onPageChange={(e) => setPage(e.page)}
            >
                <HStack>
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                </HStack>
            </PaginationRoot>
        </HStack>
    );
}
