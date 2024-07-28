import {ActionFn} from '../utils';

interface UseHoverOptions {
  onEnter?: ActionFn;
  onLeave?: ActionFn;
  onChange?: (isEnter: boolean) => void;
}

export type {
  UseHoverOptions
};
