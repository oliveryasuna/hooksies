import type React from 'react';
import {useCallback, useRef, useState} from 'react';
import {useUnmount} from '../useUnmount';

function useRafState<T>(initialState: (T | (() => T))): [T, React.Dispatch<React.SetStateAction<T>>];
function useRafState<T = undefined>(): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];
/**
 * Updates a state in a `requestAnimationFrame` callback.
 *
 * @typeParam T - The state type.
 * @param initialState - The initial state or a function that returns the
 * initial state.
 * @returns A tuple containing the current state and a function to update the
 * state.
 *
 * @example
 * const MyComponent = () => {
 *   const [count, setCount] = useRafState(0);
 *
 *   return (
 *     <button onClick={() => setCount((prev) => prev + 1)}>
 *       {count}
 *       {' '}
 *       Click me
 *       {' '}
 *       {count === 1 ? 'time' : 'times'}
 *       .
 *       {' '}
 *       {count > 10 && 'Stop clicking!'}
 *       {count > 15 && 'Seriously!'}
 *       {count > 20 && 'I\'m begging you!'}
 *       {count > 25 && 'Please!'}
 *       {count > 30 && 'I\'m on my knees!'}
 *       {count > 35 && 'I\'m dying!'}
 *       {count > 40 && 'I\'m dead!'}
 *       {count > 45 && 'I\'m a ghost!'}
 *       {count > 50 && 'I\'m haunting you!'}
 *       {count > 55 && 'I\'m haunting your family!'}
 *       {count > 60 && 'I\'m haunting your friends!'}
 *       {count > 65 && 'I\'m haunting your pets!'}
 *       {count > 70 && 'I\'m haunting your plants!'}
 *       {count > 75 && 'I\'m haunting your electronics!'}
 *       {count > 80 && 'I\'m haunting your fridge!'}
 *       {count > 85 && 'I\'m haunting your car!'}
 *       {count > 90 && 'I\'m haunting your house!'}
 *       {count > 95 && 'I\'m haunting your dreams!'}
 *       {count > 100 && 'I\'m haunting your nightmares!'}
 *       {count > 105 && 'I\'m haunting your reality!'}
 *       {count > 110 && 'I\'m haunting your soul!'}
 *       {count > 115 && 'I\'m haunting your mind!'}
 *       {count > 120 && 'I\'m haunting your body!'}
 *       {count > 125 && 'I\'m haunting your spirit!'}
 *       {count > 130 && 'I\'m haunting your essence!'}
 *       {count > 135 && 'I\'m haunting your existence!'}
 *       {count > 140 && 'I\'m haunting your past!'}
 *       {count > 145 && 'I\'m haunting your present!'}
 *       {count > 150 && 'I\'m haunting your future!'}
 *       {count > 155 && 'I\'m haunting your time!'}
 *       {count > 160 && 'I\'m haunting your space!'}
 *       {count > 165 && 'I\'m haunting your universe!'}
 *       {count > 170 && 'I\'m haunting your multiverse!'}
 *       {count > 175 && 'I\'m haunting your omniverse!'}
 *       {count > 180 && 'I\'m haunting your megaverse!'}
 *       {count > 185 && 'I\'m haunting your gigaverse!'}
 *       {count > 190 && 'I\'m haunting your teraverse!'}
 *       {count > 195 && 'I\'m haunting your petaverse!'}
 *       {count > 200 && 'I\'m haunting your exaverse!'}
 *       {count > 205 && 'I\'m haunting your enneaverse!'}
 *       {count > 210 && 'I\'m haunting your decaverse!'}
 *       {count > 215 && 'I\'m haunting your undecaverse!'}
 *       {count > 220 && 'I\'m haunting your duodecaverse!'}
 *       {count > 225 && 'I\'m haunting your tredecaverse!'}
 *       {count > 230 && 'I\'m haunting your quattuordecaverse!'}
 *       {count > 235 && 'I\'m haunting your quindecaverse!'}
 *     </button>
 *   );
 * };
 *
 * @remarks
 * This hook is useful for performance optimization.
 */
// eslint-disable-next-line func-style
function useRafState<T>(initialState?: (T | (() => T))) {
  const id = useRef<number>(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback(
      ((value: (T | (() => T))): void => {
        cancelAnimationFrame(id.current);

        id.current = requestAnimationFrame((): void => {
          setState(value);
        });
      }),
      []
  );

  useUnmount((): void => {
    cancelAnimationFrame(id.current);
  });

  return ([state, setRafState] as const);
}

export {
  useRafState
};
