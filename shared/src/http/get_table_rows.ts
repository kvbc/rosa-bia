export const FILTER_OPERATORS = [
    "=",
    ">",
    ">=",
    "<",
    "<=",
    "<>",
    "like",
] as const;
export type FilterOperator = (typeof FILTER_OPERATORS)[number];

// example "id" ">=" "10"
// export type Filter = NonNullable<NonNullable<RequestBody>["filters"]>[number];
export type Filter = {
    key: string;
    operator?: FilterOperator;
    value?: string;
    filters?: Filter[];
};
