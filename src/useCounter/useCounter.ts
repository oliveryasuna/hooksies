import type {UseCounterResult} from './useCounter.result';
import {useState} from 'react';
import {useStableFn} from '../useStableFn';

const useCounter = ((initialValue: number = 0): UseCounterResult => {
  const [value, setValue] = useState<number>(initialValue);

  const increment = useStableFn((): void => {
    setValue((value: number): number => value + 1);
  });
  const decrement = useStableFn((): void => {
    setValue((value: number): number => value - 1);
  });
  const set = useStableFn((value: number): void => {
    setValue(value);
  });
  const reset = useStableFn((): void => {
    setValue(initialValue);
  });

  return {
    value: value,
    increment: increment,
    decrement: decrement,
    set: set,
    reset: reset
  };
});

export {
  useCounter
};
