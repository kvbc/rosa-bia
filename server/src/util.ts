export const stringToInteger = (
    str: string | undefined
): number | undefined => {
    if (str === undefined) return undefined;
    const f = parseFloat(str.trim());
    if (Number.isNaN(f)) return undefined;
    if (Number.isInteger(f)) return f;
    return undefined;
};
