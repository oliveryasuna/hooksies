import type {UseToggleResult} from '../useToggle';
import type {ActionFn} from '../utils';

interface UseBooleanResult extends UseToggleResult<boolean> {
  setTrue: ActionFn;
  setFalse: ActionFn;
}

export type {
  UseBooleanResult
};
