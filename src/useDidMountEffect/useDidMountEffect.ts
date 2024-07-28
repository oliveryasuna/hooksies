import type React from 'react';
import {useEffect, useRef} from 'react';
import {noop} from 'lodash-es';

/**
 * Runs an effect only after the component has mounted, skipping the first
 * render.
 *
 * @param effect - The effect callback to run after the component has mounted.
 * @param deps - The dependencies to watch for changes.
 *
 * @example
 * useDidMountEffect(() => {
 *   console.log('Component has mounted or updated.');
 *
 *   return () => {
 *     console.log('Cleanup on unmount or update.');
 *   };
 * }, [someDependency]);
 *
 * @remarks
 * This hook is useful when you want to run an effect only after the component
 * has been mounted, and not on the initial render.
 * It behaves similarly to `useEffect`, but skips the first render.
 * Be wary of using this hook if it makes more sense to run the effect on the
 * initial render.
 * For example, fetching initial data or setting up event listeners should
 * probably be done in `useEffect` instead.
 * This hook makes more sense for logic such as triggering animations or logging
 * changes after the component has mounted.
 */
const useDidMountEffect = ((effect: React.EffectCallback, deps: React.DependencyList = []): void => {
  const didMount = useRef<boolean>(false);

  useEffect(
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
  useDidMountEffect
};
