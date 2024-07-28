import {useMount} from '../useMount';

/**
 * Runs a destructor function only once when the component unmounts.
 *
 * @param destructor - The function to run when the component unmounts.
 *
 * @example
 * useUnmountEffect(() => {
 *   console.log('Component will unmount.');
 * });
 *
 * @remarks
 * This hook is useful for performing cleanup operations that should only occur
 * when the component unmounts, such as removing event listeners or canceling
 * network requests.
 */
const useUnmount = ((destructor: (() => void)): void => {
  useMount((): (() => void) => ((): void => {
    destructor();
  }));
});

export {
  useUnmount
};
