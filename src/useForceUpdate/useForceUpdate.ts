import type {ActionFn} from '../utils';
import {useCallback, useState} from 'react';

/**
 * Returns a function that can be called to force a re-render.
 *
 * @returns A function that can be called to force a re-render.
 *
 * @remarks
 * This is useful when you need to force a re-render but don't have access to
 * the component's state or props.
 * However, it's generally better to use state or props to trigger re-renders
 * when possible.
 */
const useForceUpdate = ((): ActionFn => {
  const [, setState] = useState<Record<string, never>>({});

  return useCallback(
      ((): void => {
        setState({});
      }),
      []
  );
});

export {
  useForceUpdate
};
