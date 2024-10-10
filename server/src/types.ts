//
// types.ts
// HTTP and WebSocket server types
//

import { DBRow, DBTableName } from "./dbTypes";

export type WSMessage<TRow extends DBRow = DBRow> = {
    type: "entry added" | "entry updated" | "entry deleted";
    entry: TRow;
    endpoint: string;
};

export type HTTPResponseFetchTableRows<TRow extends DBRow> = {
    totalCount: number;
    rows: TRow[];
};

export type HTTPResponseError = {
    message: string;
};

export const DB_TABLES_WITH_ADMIN_ACCESS: readonly DBTableName[] = [
    "construction_sections",
    "construction_divisions",
    "construction_groups",
    "construction_classes",
    "construction_specs",
    "employees",
    "info_boards",
];
