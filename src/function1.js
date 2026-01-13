export function memoize(fn, { maxSize = 100 } = {}) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            const value = cache.get(key);
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
    };
}
//# sourceMappingURL=function1.js.map