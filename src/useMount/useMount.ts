import type {EffectCallback} from 'react';
import {useEffect} from 'react';

/**
 * Runs an effect only once when the component mounts.
 *
 * @param effect - The effect callback to run on mount.
 *
 * @example
 * useMountEffect(() => {
 *   console.log('Mounted.');
 *   return () => {
 *     console.log('Unmounted.');
 *   };
 * });
 *
 * @remarks
 * This hook is useful for running side effects that should only occur when the
 * component mounts, such as adding event listeners or fetching initial data.
 */
const useMount = ((effect: EffectCallback): void => {
  useEffect(effect, []);
});

export {
  useMount
};
