export function toRoman(num) {
    if (!Number.isInteger(num) || num < 1) {
        throw new Error("Input must be a positive whole number (N ≥ 1)");
    }
    const romanMap = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];
    let result = "";
    let remaining = num;
    for (const [value, symbol] of romanMap) {
        while (remaining >= value) {
            result += symbol;
            remaining -= value;
        }
    }
    return result;
}
//# sourceMappingURL=function2.js.map