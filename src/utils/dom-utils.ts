import type React from 'react';
import {has} from './fn-utils';
import {isNil} from 'lodash-es';

type TargetNode = (HTMLElement | Element | Document | Window);

type TargetElement<T = TargetNode> = (T | null | undefined);

type Target<T extends TargetNode = TargetNode> = (TargetElement<T> | (() => TargetElement<T>) | React.MutableRefObject<TargetElement<T>>);

const getTargetElement = (<T extends TargetNode>(target: Target<T>, defaultElement?: T): TargetElement<T> => {
  if(isNil(target)) {
    return defaultElement;
  }

  if(typeof target === 'function') {
    return target();
  } else if(has(target, 'current')) {
    return target.current;
  } else {
    return target;
  }
});

const isSsr = (() => (typeof window === 'undefined'));

const isDocument = ((value: unknown): value is Document => (value === document));

export type {
  TargetElement,
  Target,
  TargetNode
};
export {
  getTargetElement,
  isSsr,
  isDocument
};
