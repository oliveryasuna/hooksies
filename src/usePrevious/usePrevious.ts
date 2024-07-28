import type {EqualFn} from '../utils';
import {useEffect, useRef} from 'react';

const __DEFAULT_EQUAL_FN: EqualFn<unknown> = ((a?: unknown, b?: unknown): boolean => Object.is(a, b));

/**
 * Keeps track of the previous value of a state or prop.
 *
 * @typeParam T - The type of the value.
 * @param value - The current value.
 * @param equalFn - The function used to compare the current and previous values.
 * @returns The previous value.
 *
 * @example
 * const prevValue = usePrevious(currValue);
 *
 * @remarks
 * This hook is useful for tracking the previous value of a state or prop, and
 * can be customized with an equality check function.
 */
const usePrevious = (<T>(value?: T, equalFn: EqualFn<T> = __DEFAULT_EQUAL_FN): (T | undefined) => {
  const previousRef = useRef<T>();
  const currentRef = useRef<T>();

  useEffect(
      ((): void => {
        if(!equalFn(currentRef.current, value)) {
          previousRef.current = currentRef.current;
          currentRef.current = value;
        }
      }),
      [value, equalFn]
  );

  return previousRef.current;
});

export {
  usePrevious
};
