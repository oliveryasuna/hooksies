import type {ActionFn} from '../utils';

interface UseCounterResult {
  value: number;
  increment: ActionFn;
  decrement: ActionFn;
  set: ((value: number) => void);
  reset: ActionFn;
}

export type {
  UseCounterResult
};
