import type {AnyFn, NarrowFn} from '../utils';
import {useMemo} from 'react';
import type {DebouncedFunc, ThrottleSettings} from 'lodash-es';
import {throttle} from 'lodash-es';
import {useLatest} from '../useLatest';
import {useUnmount} from '../useUnmount';

const useThrottleFn = (<Fn extends AnyFn>(fn: Fn, wait?: number, options?: ThrottleSettings): DebouncedFunc<Fn> => {
  const fnRef = useLatest<Fn>(fn);

  const throttled = useMemo<DebouncedFunc<Fn>>(
      ((): DebouncedFunc<Fn> => throttle<NarrowFn<Fn>>(((...args: Parameters<Fn>): ReturnType<Fn> => fnRef.current(...args)), wait, options)),
      []
  );

  useUnmount((): void => {
    throttled.cancel();
  });

  return throttled;
});

export {
  useThrottleFn
};
