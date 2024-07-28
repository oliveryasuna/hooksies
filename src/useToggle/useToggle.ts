import type {UseToggleResult} from './useToggle.result';
import {useCallback, useState} from 'react';

function useToggle<T = boolean>(defaultValue?: T): UseToggleResult<T>;
function useToggle<T, U>(defaultValue: T, reverseValue: U): UseToggleResult<T | U>;
/**
 * Manages a toggle state.
 *
 * @param defaultValue - The initial value of the toggle.
 * If not provided, the default value is `false`, and it is assumed that the
 * toggle state is a `boolean`.
 * @param reverseValue - The value to set when toggling from the default value.
 * If not provided, the default value is the negation of the default value.
 * If the default value is not a `boolean`, this parameter is required.
 * @returns An object containing the current value of the toggle, a function to
 * toggle the value, and a function to set the value.
 *
 * @example
 * const {value, toggle, set} = useToggle(false);
 *
 * return (
 *   <div>
 *     <p>Value: {value}</p>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={(): void => set(true)}>Set True</button>
 *   </div>
 * );
 *
 * @example
 * const {value, toggle, set} = useToggle('off', 'on');
 *
 * return (
 *   <div>
 *     <p>Value: {value}</p>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={(): void => set('on')}>Set On</button>
 *   </div>
 * );
 */
// eslint-disable-next-line func-style
function useToggle<T, U>(defaultValue: T, reverseValue?: U): UseToggleResult<T | U> {
  const [value, setValue] = useState<T | U>(defaultValue);

  const toggle = useCallback(
      ((): void => {
        setValue((prevValue: (T | U)): (T | U) => {
          if(prevValue === defaultValue) {
            if(reverseValue !== undefined) {
              return reverseValue;
            } else {
              // Boolean.
              return (!defaultValue as (T | U));
            }
          } else {
            return defaultValue;
          }
        });
      }),
      []
  );

  return {
    value: value,
    toggle: toggle,
    set: setValue
  };
}

export {
  useToggle
};
