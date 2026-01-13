import { describe, it, expect, vi } from "vitest";
import { memoize } from "../src/function1.js";
describe("memoize", () => {
    it("caches results for the same arguments (sync)", () => {
        const fn = vi.fn((a, b) => a + b);
        const memoized = memoize(fn);
        expect(memoized(1, 2)).toBe(3);
        expect(memoized(1, 2)).toBe(3);
        // original function should only be called once
        expect(fn).toHaveBeenCalledTimes(1);
    });
    it("returns different results for different arguments", () => {
        const fn = vi.fn((n) => n * 2);
        const memoized = memoize(fn);
        expect(memoized(2)).toBe(4);
        expect(memoized(3)).toBe(6);
        expect(fn).toHaveBeenCalledTimes(2);
    });
    it("evicts least recently used entry when maxSize is exceeded", () => {
        const fn = vi.fn((n) => n);
        const memoized = memoize(fn, { maxSize: 2 });
        memoized(1); // cache: [1]
        memoized(2); // cache: [1, 2]
        memoized(3); // cache exceeds → evict 1
        memoized(2); // cache hit
        memoized(1); // recomputed (was evicted)
        expect(fn).toHaveBeenCalledTimes(4);
    });
    it("updates recency when a cached value is accessed", () => {
        const fn = vi.fn((n) => n);
        const memoized = memoize(fn, { maxSize: 2 });
        memoized(1); // [1]
        memoized(2); // [1, 2]
        memoized(1); // [2, 1] (1 becomes most recent)
        memoized(3); // evicts 2
        memoized(2); // recomputed
        expect(fn).toHaveBeenCalledTimes(4);
    });
    it("caches resolved promises", async () => {
        const fn = vi.fn(async (n) => n * 2);
        const memoized = memoize(fn);
        const a = await memoized(2);
        const b = await memoized(2);
        expect(a).toBe(4);
        expect(b).toBe(4);
        expect(fn).toHaveBeenCalledTimes(1);
    });
    it("removes cache entry if promise rejects", async () => {
        const fn = vi.fn(async (n) => {
            throw new Error("fail");
        });
        const memoized = memoize(fn);
        await expect(memoized(1)).rejects.toThrow("fail");
        await expect(memoized(1)).rejects.toThrow("fail");
        // called twice because failed promise is not cached
        expect(fn).toHaveBeenCalledTimes(2);
    });
});
//# sourceMappingURL=function1.test.js.map