export type AnyFunction = (...args: any[]) => any;
interface MemoizeOptions {
    maxSize?: number;
}
export declare function memoize<F extends AnyFunction>(fn: F, { maxSize }?: MemoizeOptions): F;
export {};
//# sourceMappingURL=function1.d.ts.map