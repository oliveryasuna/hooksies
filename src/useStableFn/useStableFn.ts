import type {AnyFn, NarrowFn} from '../utils';
import {useMemo, useRef} from 'react';

/**
 * Memoizes a function while preserving its `this` context and ensuring that the
 * function reference remains stable across renders.
 *
 * Unlike `useCallback`, which re-creates the memoized function when
 * dependencies change, this hook ensures that the function reference itself
 * does not change, providing a stable function reference that always calls the
 * latest version of the function.
 *
 * @typeParam Fn - The function type.
 * @param fn - The function to memoize.
 * @returns The memoized function.
 *
 * @example
 * const MyComponent = () => {
 *   const obj = {
 *     value: 42,
 *     logValue() {
 *       console.log(this.value);
 *     }
 *   };
 *
 *   const memoizedLogValue = useStableFn(obj.logValue);
 *
 *   // Even if the component re-renders, `this` context will be preserved.
 *   return <button onClick={() => memoizedLogValue.call(obj)}>Log Value</button>;
 * };
 *
 * @remarks
 * This hook is particularly useful when you need to pass a stable function
 * reference to child components or dependencies, and you want to ensure that
 * the latest version of the function is always called without causing
 * unnecessary re-renders.
 */
const useStableFn = (<Fn extends AnyFn>(fn: Fn): Fn => {
  const fnRef = useRef<Fn>(fn);

  fnRef.current = useMemo<Fn>(((): Fn => fn), [fn]);

  const memoizedFn = useRef<NarrowFn<Fn>>();

  memoizedFn.current ??= function(this: any, ...args: any[]): any {
    return fnRef.current.apply(this, args);
  };

  return (memoizedFn.current as Fn);
});

export {
  useStableFn
};
