import type React from 'react';
import type {ActionFn} from '../utils';

interface UseToggleResult<T> {
  value: T;
  toggle: ActionFn;
  set: React.Dispatch<React.SetStateAction<T>>;
}

export type {
  UseToggleResult
};
