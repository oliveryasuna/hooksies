import type {ActionFn} from '../utils';
import {useStableFn} from '../useStableFn';
import {useCallback, useEffect, useRef} from 'react';
import type {UseIntervalOptions} from './useInterval.options';
import {noop} from 'lodash-es';

const useInterval = ((callback: ActionFn, delay?: number, options: UseIntervalOptions = {}): ActionFn => {
  const timerCallback = useStableFn(callback);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const clear = useCallback(
      ((): void => {
        if(timerRef.current === undefined) {
          return;
        }

        clearInterval(timerRef.current);
      }),
      []
  );

  useEffect(
      ((): (() => void) => {
        if((delay === undefined) || (delay <= 0)) {
          return noop;
        }

        if(options.immediate) {
          timerCallback();
        }

        timerRef.current = setInterval(timerCallback, delay);

        return clear;
      }),
      [delay]
  );

  return clear;
});

export {
  useInterval
};
