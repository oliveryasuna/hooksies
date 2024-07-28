import {useEffect} from 'react';
import type {Target, TargetElement} from '../utils';
import {getTargetElement} from '../utils';
import {useLatest} from '../useLatest';
import {isNil, noop} from 'lodash-es';

function useEventListener<Type extends (keyof HTMLElementEventMap)>(
    target: (HTMLElement | undefined),
    type: Type,
    listener: ((ev: HTMLElementEventMap[Type]) => void),
    options?: (boolean | AddEventListenerOptions)
): void;
function useEventListener<Type extends (keyof ElementEventMap)>(
    target: (Element | undefined),
    type: Type,
    listener: ((ev: ElementEventMap[Type]) => void),
    options?: (boolean | AddEventListenerOptions)
): void;
function useEventListener<Type extends (keyof DocumentEventMap)>(
    target: (Document | undefined),
    type: Type,
    listener: ((ev: DocumentEventMap[Type]) => void),
    options?: (boolean | AddEventListenerOptions)
): void;
function useEventListener<Type extends (keyof WindowEventMap)>(
    target: (Window | undefined),
    type: Type,
    listener: ((ev: WindowEventMap[Type]) => void),
    options?: (boolean | AddEventListenerOptions)
): void;
function useEventListener(target: (Target | undefined), type: string, listener: EventListener, options?: (boolean | AddEventListenerOptions)): void;
/**
 * Adds an event listener to a target node and removes it on cleanup.
 *
 * @typeParam Target - The target node type.
 * @typeParam Type - The event type.
 * @param target - The target node to which to add the event listener.
 * @param type - The event type to listen for.
 * @param listener - The event listener to add.
 * @param options - The event listener options.
 *
 * @example
 * useListener(window, 'resize', () => {
 *   console.log('Window resized.');
 * });
 *
 * @remarks
 * This hook abstracts the logic of adding and removing event listeners to
 * ensure they are correctly managed throughout the component lifecycle.
 */
// eslint-disable-next-line func-style
function useEventListener(target: (Target | undefined), type: string, listener: EventListener, options?: (boolean | AddEventListenerOptions)): void {
  const listenerRef = useLatest<EventListener>(listener);

  useEffect(
      ((): (() => void) => {
        const el: TargetElement = getTargetElement(target);

        if(isNil(el)) {
          return noop;
        }

        const listenerWrapper = ((ev: Event): void => {
          listenerRef.current(ev);
        });

        el.addEventListener(type, listenerWrapper, options);

        return ((): void => {
          el.removeEventListener(type, listenerWrapper, options);
        });
      }),
      [type, options]
  );
}

export {
  useEventListener
};
