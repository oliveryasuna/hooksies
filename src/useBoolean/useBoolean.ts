import {useToggle} from '../useToggle';
import type {UseBooleanResult} from './useBoolean.result';
import {useCallback} from 'react';

/**
 * Manages a boolean state.
 *
 * @param defaultValue - The initial value of the boolean.
 * @returns Extend version of `useToggleResult`.
 *
 * @example
 * const {value, toggle, set} = useToggle(false);
 *
 * return (
 *   <div>
 *     <p>Value: {value}</p>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={(): void => set(true)}>Set True</button>
 *     <button onClick={(): void => set(false)}>Set False</button>
 *   </div>
 * );
 */
const useBoolean = ((defaultValue: boolean = false): UseBooleanResult => {
  const {value, toggle, set} = useToggle(defaultValue);

  const setTrue = useCallback(
      ((): void => {
        set(true);
      }),
      [set]
  );
  const setFalse = useCallback(
      ((): void => {
        set(false);
      }),
      [set]
  );

  return {
    value: value,
    toggle: toggle,
    set: set,
    setTrue: setTrue,
    setFalse: setFalse
  };
});

export {
  useBoolean
};
