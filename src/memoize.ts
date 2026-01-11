import { AnyFunction } from "./function1";

interface MemoizeOptions {
  maxSize?: number;
}

export function memoize<F extends AnyFunction>(
  fn: F,
  { maxSize = 100 }: MemoizeOptions = {}
): F {
  const cache = new Map<string, ReturnType<F>>();

  return function (...args: Parameters<F>): ReturnType<F> {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const value = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);
      return value;
    }

    const result = fn(...args);
    cache.set(key, result);

    if (cache.size > maxSize) {
      const iterator = cache.keys().next();

      if (!iterator.done) {
        cache.delete(iterator.value);
      }
    }

    if (result instanceof Promise) {
      result.catch(() => cache.delete(key));
    }

    return result;
  } as F;
}
