import type {AnyFn, NarrowFn} from '../utils';
import type {DebouncedFunc, DebounceSettings} from 'lodash-es';
import {debounce} from 'lodash-es';
import {useLatest} from '../useLatest';
import {useMemo} from 'react';
import {useUnmount} from '../useUnmount';

const useDebounceFn = (<Fn extends AnyFn>(fn: Fn, wait?: number, options?: DebounceSettings): DebouncedFunc<Fn> => {
  const fnRef = useLatest<Fn>(fn);

  const debounced = useMemo<DebouncedFunc<Fn>>(
      ((): DebouncedFunc<Fn> => debounce<NarrowFn<Fn>>(((...args: Parameters<Fn>): ReturnType<Fn> => fnRef.current(...args)), wait, options)),
      []
  );

  useUnmount((): void => {
    debounced.cancel();
  });

  return debounced;
});

export {
  useDebounceFn
};
