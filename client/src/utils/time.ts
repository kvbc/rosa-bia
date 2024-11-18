export function getDaysPassed(
    date1: Date | number | string,
    date2: Date | number | string
): number {
    const time1 = new Date(date1).getTime();
    const time2 = new Date(date2).getTime();
    return Math.floor(Math.abs(time1 - time2) / (24 * 60 * 60 * 1000));
}
