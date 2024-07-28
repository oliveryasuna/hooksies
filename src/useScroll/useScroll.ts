import type {EqualFn, Target, TargetElement} from '../utils';
import {getTargetElement, isDocument} from '../utils';
import {useRafState} from '../useRafState';
import type {ScrollPosition} from './scroll-position';
import {useLatest} from '../useLatest';
import {useMount} from '../useMount';
import {isNil, noop} from 'lodash-es';
import {useStableFn} from '../useStableFn';
import {usePrevious} from '../usePrevious';

const __DEFAULT_EQUAL_FN: EqualFn<ScrollPosition> = ((_a?: ScrollPosition, _b?: ScrollPosition): boolean => false);

const useScroll = ((target?: Target<Element | Document>, equalFn: EqualFn<ScrollPosition> = __DEFAULT_EQUAL_FN): (ScrollPosition | undefined) => {
  const [position, setPosition] = useRafState<ScrollPosition>();
  const previousPosition = usePrevious<ScrollPosition>(position);

  const equalFnRef = useLatest<EqualFn<ScrollPosition>>(equalFn);

  const getPosition = useStableFn((targetElement: NonNullable<TargetElement<Element | Document>>): ScrollPosition => {
    if(isDocument(targetElement)) {
      if(document.scrollingElement !== null) {
        return {
          top: document.scrollingElement.scrollTop,
          left: document.scrollingElement.scrollLeft
        };
      } else {
        // Quirks mode.
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scrollingElement
        // https://stackoverflow.com/questions/28633221/document-body-scrolltop-firefox-returns-0-only-js
        return {
          top: Math.max(window.pageXOffset, document.documentElement.scrollTop, document.body.scrollTop),
          left: Math.max(window.pageYOffset, document.documentElement.scrollLeft, document.body.scrollLeft)
        };
      }
    } else {
      return {
        top: targetElement.scrollTop,
        left: targetElement.scrollLeft
      };
    }
  });

  useMount((): (() => void) => {
    const el: TargetElement<Element | Document> = getTargetElement(target);

    if(isNil(el)) {
      return noop;
    }

    const updatePosition = ((): void => {
      const newPosition: ScrollPosition = getPosition(el);

      if(!equalFnRef.current(previousPosition, newPosition)) {
        setPosition(newPosition);
      }
    });

    updatePosition();

    el.addEventListener('scroll', updatePosition);

    return ((): void => {
      el.removeEventListener('scroll', updatePosition);
    });
  });

  return position;
});

export {
  useScroll
};
