import { memoize } from "../src/memoize";

describe("memoize", () => {
  test("memoizes sync function", () => {
    const fn = jest.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("memoizes async function", async () => {
    const fn = jest.fn(async (x: number) => {
      await new Promise((r) => setTimeout(r, 20));
      return x + 1;
    });

    const memoized = memoize(fn);

    const a = await memoized(1);
    const b = await memoized(1);

    expect(a).toBe(2);
    expect(b).toBe(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("LRU eviction works", () => {
    const fn = jest.fn((x: number) => x);
    const memoized = memoize(fn, { maxSize: 2 });

    memoized(1);
    memoized(2);
    memoized(3); // evicts 1
    memoized(1); // recompute

    expect(fn).toHaveBeenCalledTimes(4);
  });

  test("failed async results are not cached", async () => {
    let fail = true;

    const fn = jest.fn(async () => {
      if (fail) throw new Error("fail");
      return "ok";
    });

    const memoized = memoize(fn);

    await expect(memoized()).rejects.toThrow();
    fail = false;
    expect(await memoized()).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
