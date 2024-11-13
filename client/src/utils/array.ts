import * as DB from "@shared/db";

// for nice and concise syntax
export function isOneOf<T>(value: T, ...values: T[]): boolean {
    return values.includes(value);
}

export function isRegisterType(
    registerType: DB.Rows.RegisterType,
    ...registerTypes: DB.Rows.RegisterType[]
): boolean {
    return isOneOf(registerType, ...registerTypes);
}
