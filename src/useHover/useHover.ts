import type {TargetNode} from '../utils';
import type {UseHoverOptions} from './useHover.options';
import {useBoolean} from '../useBoolean';
import {useEventListener} from '../useEventListener';

const useHover = ((target: TargetNode, options: UseHoverOptions = {}): boolean => {
  const {onEnter, onLeave, onChange} = options;

  const {value, setTrue, setFalse} = useBoolean(false);

  useEventListener(
      target,
      'mouseenter',
      ((): void => {
        onEnter?.();
        setTrue();
        onChange?.(true);
      })
  );
  useEventListener(
      target,
      'mouseleave',
      ((): void => {
        onLeave?.();
        setFalse();
        onChange?.(false);
      })
  );

  return value;
});

export {
  useHover
};
