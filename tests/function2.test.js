import { describe, it, expect, vi } from "vitest";
import { toRoman } from "../src/function2.js";
describe("toRoman", () => {
    it("converts basic numbers", () => {
        expect(toRoman(1)).toBe("I");
        expect(toRoman(2)).toBe("II");
        expect(toRoman(3)).toBe("III");
    });
    it("handles subtractive notation", () => {
        expect(toRoman(4)).toBe("IV");
        expect(toRoman(9)).toBe("IX");
        expect(toRoman(40)).toBe("XL");
        expect(toRoman(90)).toBe("XC");
        expect(toRoman(400)).toBe("CD");
        expect(toRoman(900)).toBe("CM");
    });
    it("converts typical values", () => {
        expect(toRoman(58)).toBe("LVIII");
        expect(toRoman(1994)).toBe("MCMXCIV");
        expect(toRoman(2024)).toBe("MMXXIV");
    });
    it("converts large valid numbers", () => {
        expect(toRoman(3999)).toBe("MMMCMXCIX");
    });
    it("throws an error for zero or negative numbers", () => {
        expect(() => toRoman(0)).toThrow();
        expect(() => toRoman(-1)).toThrow();
    });
    it("throws an error for non-integer values", () => {
        expect(() => toRoman(1.5)).toThrow();
        expect(() => toRoman(NaN)).toThrow();
    });
});
//# sourceMappingURL=function2.test.js.map