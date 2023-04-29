export default function mergeTwoArrays(
    array1: string[] | undefined,
    array2: string[] | undefined,
): string[] {
    if (!array1) return array2 || [];
    if (!array2) return array1;
    return [...new Set([...array1, ...array2])];
}
