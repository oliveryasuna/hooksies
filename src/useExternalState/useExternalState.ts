import type {DependencyList} from 'react';
import {useCallback, useEffect, useState} from 'react';

// TODO: Return object.
const useExternalState = (<T>(providerFn: (() => (T | undefined | Promise<T | undefined>)), deps: DependencyList = []): [...ReturnType<typeof useState<T>>, (() => Promise<void>)] => {
  const [state, setState] = useState<T>();

  const refresh = useCallback(
      (async(): Promise<void> => {
        try {
          const result: (T | undefined) = (await providerFn());

          if(result !== undefined) {
            setState(result);
          }
        } catch(err) {
          console.error(`Failed to execute provider: ${JSON.stringify(err)}`);
        }
      }),
      [providerFn, ...deps]
  );

  useEffect(
      ((): (() => void) => {
        let isMounted: boolean = true;

        const doProviderFn = (async(): Promise<void> => {
          try {
            const result: (T | undefined) = (await providerFn());

            if(isMounted && (result !== undefined)) {
              setState(result);
            }
          } catch(err: unknown) {
            console.error('Failed to execute provider:', err);
          }
        });

        void doProviderFn();

        return ((): void => {
          isMounted = false;
        });
      }),
      deps
  );

  return [
    state,
    setState,
    refresh
  ];
});

export {
  useExternalState
};
