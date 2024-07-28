import {useEffect, useState} from 'react';
import {useThrottleFn} from '../useThrottleFn';
import type {ThrottleSettings} from 'lodash-es';

const useThrottle = (<T>(value: T, wait?: number, options?: ThrottleSettings): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const throttledFn = useThrottleFn(
      ((): void => {
        setThrottledValue(value);
      }),
      wait,
      options
  );

  useEffect(
      ((): void => {
        throttledFn();
      }),
      [value]
  );

  return throttledValue;
});

export {
  useThrottle
};
