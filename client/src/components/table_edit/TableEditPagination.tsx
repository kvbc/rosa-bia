import { Fieldset, HStack } from "@chakra-ui/react";
import React, {
    ComponentProps,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Field } from "@/components/ui/field";
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "@/components/ui/pagination";
import { TableEdit, TableEditRowType } from "./TableEdit";
import {
    createMySelectOptions,
    MyInputSelect,
} from "@/components/my_input/MyInputSelect";
import { ColorContext } from "@/contexts/ColorContext";

export function TableEditPagination<TRow extends TableEditRowType>({
    totalRowCount,
    onRowsRangeChanged,
}: ComponentProps<typeof TableEdit<TRow>>) {
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const [page, setPage] = useState<number>(1);
    const colorContext = useContext(ColorContext);

    const rowsPerPageOptions = useMemo(
        () => createMySelectOptions(["25", "50", "100", "250", "500"]),
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
                    <Field
                        label="Wyniki na stronę"
                        orientation="horizontal"
                        color="gray.600"
                        textWrap="balance"
                        // fontSize="inherit !important"
                    >
                        <ColorContext.Provider
                            value={{
                                bg1: "gray.200",
                                bg2: "gray.300",
                                border: "gray.400",
                                palette: "gray",
                            }}
                        >
                            <MyInputSelect
                                // color="black"
                                options={rowsPerPageOptions}
                                value={String(rowsPerPage)}
                                onValueChanged={(value) =>
                                    setRowsPerPage(Number(value))
                                }
                            />
                        </ColorContext.Provider>
                    </Field>
                </Fieldset.Content>
            </Fieldset.Root>
            <PaginationRoot
                colorPalette={colorContext.palette}
                count={totalRowCount}
                variant="solid"
                pageSize={rowsPerPage}
                page={page}
                size="2xs"
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
