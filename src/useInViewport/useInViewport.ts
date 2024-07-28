import 'intersection-observer';
import type {TargetElement} from '../utils';
import {getTargetElement} from '../utils';
import type {UseInViewportOptions} from './useInViewport.options';
import {useEffect, useState} from 'react';
import {isNil, noop} from 'lodash-es';
import type {UseInViewportResult} from './useInViewport.result';

const useInViewport = ((target: (HTMLElement | Element | (HTMLElement | Element)[]), options: UseInViewportOptions = {}): UseInViewportResult => {
  const {callback, ...init} = options;

  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();

  useEffect(
      ((): (() => void) => {
        const els: NonNullable<TargetElement<Element>>[] = ([target]
            .flat()
            .map((target: Element): TargetElement<Element> => getTargetElement(target))
            .filter((el: TargetElement<Element>): boolean => !isNil(el)) as NonNullable<TargetElement<Element>>[]);

        if(els.length === 0) {
          return noop;
        }

        const observer = (new IntersectionObserver(
            ((entries: IntersectionObserverEntry[]): void => {
              for(const entry of entries) {
                setRatio(entry.intersectionRatio);
                setState(entry.isIntersecting);

                callback?.(entry);
              }
            }),
            {
              ...init,
              ...(((): Partial<IntersectionObserverInit> => {
                const rootEl: TargetElement<Element | Document> = getTargetElement(init.root);

                if(isNil(rootEl)) {
                  return {};
                }

                return {root: rootEl};
              })())
            }
        ));

        for(const el of els) {
          observer.observe(el);
        }

        return ((): void => {
          observer.disconnect();
        });
      }),
      [options.root, options.rootMargin, options.threshold, callback]
  );

  return ({
    state: state,
    ratio: ratio
  } as const);
});

export {
  useInViewport
};
