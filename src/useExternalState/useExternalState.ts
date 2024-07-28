import type {DependencyList} from 'react';
import {useEffect, useState} from 'react';

const useExternalState = (<T>(providerFn: (() => (T | undefined | Promise<T | undefined>)), deps: DependencyList = []): ReturnType<typeof useState<T>> => {
  const [state, setState] = useState<T>();

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
            console.error(`Failed to execute provider: ${JSON.stringify(err)}`);
          }
        });

        void doProviderFn();

        return ((): void => {
          isMounted = false;
        });
      }),
      deps
  );

  return [state, setState];
});

export {
  useExternalState
};
