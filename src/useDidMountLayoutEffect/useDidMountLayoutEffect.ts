import type React from 'react';
import {useLayoutEffect, useRef} from 'react';
import {noop} from 'lodash-es';

/**
 * This is the same as {@link useDidMountEffect}, but uses `useLayoutEffect`
 * instead of `useEffect`.
 *
 * @param effect - The effect callback to run after the component has mounted.
 * @param deps - The dependencies to watch for changes.
 */
const useDidMountLayoutEffect = ((effect: React.EffectCallback, deps: React.DependencyList = []): void => {
  const didMount = useRef<boolean>(false);

  useLayoutEffect(
      ((): (() => void) => {
        if(didMount.current) {
          const cleanupFn: (ReturnType<React.EffectCallback>) = effect();

          if(typeof cleanupFn === 'function') {
            return cleanupFn;
          }
        } else {
          didMount.current = true;
        }

        return noop;
      }),
      deps
  );
});

export {
  useDidMountLayoutEffect
};
