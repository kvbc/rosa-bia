//
// database table typings
//

import { ZodType } from "zod";
import * as Rows from "./rows";
export * as Rows from "./rows";

/*
 *
 * Table
 *
 */

export const TABLE_NAMES = [
    ...Rows.INVESTORS_TABLE_NAMES,
    ...Rows.GEODESY_TABLE_NAMES,
    ...Rows.PKOB_TABLE_NAMES,
    ...Rows.REGISTERS_TABLE_NAMES,
    ...Rows.EMPLOYEES_TABLE_NAMES,
    ...Rows.INFO_BOARDS_TABLE_NAMES,
    ...Rows.CONSTRUCTION_LAW_TABLE_NAMES,
    ...Rows.CALENDAR_EVENTS_TABLE_NAMES,
] as const;
export type TableName = (typeof TABLE_NAMES)[number];

// tables that can only be modified by admin employees
export const TABLE_NAMES_MODIFY_ADMIN_ONLY: readonly TableName[] = [
    ...Rows.PKOB_TABLE_NAMES,
    ...Rows.EMPLOYEES_TABLE_NAMES,
    ...Rows.INFO_BOARDS_TABLE_NAMES,
    ...Rows.CONSTRUCTION_LAW_TABLE_NAMES,
] as const;

/*
 *
 * Row
 *
 */

export type Row = Record<string, any> & {
    id: number;
};

// which key references what table
export type RowKeyTableRelations<TRow extends Row> = Partial<
    Record<keyof TRow, TableName>
>;

// keys that are only readable and modifiable by admin employees
export type RowAdminKeys<TRow extends Row> = Set<keyof TRow>;

export type RowMeta = {
    shape: ZodType;
    keyTableRelations?: RowKeyTableRelations<Row>;
    adminKeys?: RowAdminKeys<Row>;
    keys?: readonly string[];
};
export type RowMetas = Partial<Record<TableName, RowMeta>>;

export const ROW_METAS: Record<TableName, RowMeta> = {
    ...Rows.INVESTORS_ROW_METAS,
    ...Rows.GEODESY_ROW_METAS,
    ...Rows.PKOB_ROW_METAS,
    ...Rows.REGISTERS_ROW_METAS,
    ...Rows.EMPLOYEES_ROW_METAS,
    ...Rows.INFO_BOARDS_ROW_METAS,
    ...Rows.CONSTRUCTION_LAW_ROW_METAS,
    ...Rows.CALENDAR_EVENT_ROW_METAS,
};

export function getRowMeta(tableName: TableName) {
    const meta = ROW_METAS[tableName];
    if (meta.keys !== undefined) {
        return { ...meta, keys: meta.keys };
    }
    if ("keyof" in meta.shape && typeof meta.shape.keyof === "function") {
        return {
            ...meta,
            keys: meta.shape.keyof().options as readonly string[],
        };
    }
    throw new Error("Fatal error");
    return { ...meta, keys: [] };
}
