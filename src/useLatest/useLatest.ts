import type {MutableRefObject} from 'react';
import {useRef} from 'react';

/**
 * Returns a mutable ref object whose current property is always up-to-date with
 * the value passed to it.
 *
 * @typeParam T - The type of the value to be stored in the ref object.
 * @param value - The value to be stored in the ref object.
 * @returns A mutable ref object whose current property is always up-to-date
 * with the value passed to it.
 *
 * @remarks
 * This hook is useful when you want to store a value in a ref object and you
 * want to ensure that the ref object's current property is always up-to-date
 * with the value passed to it.
 * However, remember that this will update the ref on every render, so use it
 * with caution.
 */
const useLatest = (<T>(value: T): MutableRefObject<T> => {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref;
});

export {
  useLatest
};
