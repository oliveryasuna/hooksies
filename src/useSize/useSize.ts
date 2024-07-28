import type {Target, TargetElement} from '../utils';
import {getTargetElement} from '../utils';
import type {Size} from './size';
import {useRafState} from '../useRafState';
import {isNil, noop} from 'lodash-es';
import {useLayoutEffect} from 'react';

const useSize = ((target: Target<Element>): (Size | undefined) => {
  const [state, setState] = useRafState<Size | undefined>((): (Size | undefined) => {
    const el: TargetElement<Element> = getTargetElement(target);

    if(isNil(el)) {
      return undefined;
    }

    return {
      width: el.clientWidth,
      height: el.clientHeight
    };
  });

  useLayoutEffect(
      ((): (() => void) => {
        const el: TargetElement<HTMLElement | Element> = getTargetElement(target);

        if(isNil(el)) {
          return noop;
        }

        const observer = (new ResizeObserver((entries: ResizeObserverEntry[]): void => {
          for(const entry of entries) {
            const {clientWidth, clientHeight} = entry.target;

            setState({
              width: clientWidth,
              height: clientHeight
            });
          }
        }));

        observer.observe(el);

        return ((): void => {
          observer.disconnect();
        });
      }),
      [target]
  );

  return state;
});

export {
  useSize
};
