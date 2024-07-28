import {useEffect, useState} from 'react';
import {useDebounceFn} from '../useDebounceFn/useDebounceFn';
import type {DebounceSettings} from 'lodash-es';

const useDebounce = (<T>(value: T, wait?: number, options?: DebounceSettings): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedFn = useDebounceFn(
      ((): void => {
        setDebouncedValue(value);
      }),
      wait,
      options
  );

  useEffect(
      ((): void => {
        debouncedFn();
      }),
      [value]
  );

  return debouncedValue;
});

export {
  useDebounce
};
