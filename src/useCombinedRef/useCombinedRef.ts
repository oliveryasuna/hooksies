import type React from 'react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {DependencyList, useCallback, useState} from 'react';
import type {UseCombinedRefResult} from './useCombinedRef.result';

/**
 * Combines a local ref with an external ref, synchronizing the two.
 *
 * @typeParam T - The type of the DOM node or component instance.
 * @param outerRef - The external ref to synchronize with the local ref.
 * @param deps - The dependencies to include in the memoization of the callback.
 * @returns An object containing the local ref callback and the current node.
 *
 * @example
 * const MyComponent = () => {
 *   const {ref, node} = useCombinedRef<HTMLDivElement>();
 *
 *   useEffect(() => {
 *     if(node) {
 *       console.log('Node mounted:', node);
 *     }
 *   }, [node]);
 *
 *   return <div ref={ref}>Hello, World!</div>;
 * };
 *
 * @example
 * const MyComponent = forwardRef(_, outerRef) => {
 *   // Similar result to `useImperativeHandle`, but with a local ref.
 *   const {ref, node} = useCombinedRef<HTMLDivElement>(outerRef);
 *
 *   useEffect(() => {
 *     if(node) {
 *       console.log('Node mounted:', node);
 *     }
 *   }, [node]);
 *
 *   return <div ref={ref}>Hello, World!</div>;
 * };
 *
 * @remarks
 * This hook is useful for creating a ref callback that sets a local state and
 * optionally synchronizes it with an external ref.
 * Thus, this hook could simply be used as a replacement for `useRef` in most
 * cases.
 * However, it is particularly useful when the ref is passed to a child
 * component that needs to access the parent's ref.
 * In such cases, the parent component can pass its ref to the child component
 * and synchronize the two refs using this hook.
 */
const useCombinedRef = (<T>(outerRef: React.Ref<T> = null, deps: DependencyList = []): UseCombinedRefResult<T> => {
  const [node, setNode] = useState<T | null>(null);

  const ref: React.RefCallback<T> = useCallback(
      ((node: (T | null)): void => {
        setNode(node);

        if(typeof outerRef === 'function') {
          outerRef(node);
        } else if(outerRef !== null) {
          (outerRef as React.MutableRefObject<T | null>).current = node;
        }
      }),
      [outerRef, ...deps]
  );

  return {
    ref: ref,
    node: node
  };
});

export {
  useCombinedRef
};
